#!/usr/bin/env python3
"""Crawl lielvaiceni.lv's public sitemap and export its page content."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import mimetypes
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

from bs4 import BeautifulSoup


DEFAULT_ROOT = "http://www.lielvaiceni.lv/"
USER_AGENT = "ebmedus-public-site-archiver/1.0"


class PoliteFetcher:
    def __init__(self, delay: float, timeout: float = 30.0) -> None:
        self.delay = delay
        self.timeout = timeout
        self._last_request_by_host: dict[str, float] = {}

    def fetch(self, url: str) -> tuple[bytes, str, str]:
        host = urllib.parse.urlsplit(url).netloc
        last_request = self._last_request_by_host.get(host)
        if last_request is not None:
            time.sleep(max(0.0, self.delay - (time.monotonic() - last_request)))

        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,"
                "image/avif,image/webp,image/*;q=0.8,*/*;q=0.7",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                body = response.read()
                final_url = response.geturl()
                content_type = response.headers.get_content_type()
        finally:
            self._last_request_by_host[host] = time.monotonic()
        return body, final_url, content_type


def slug_for_url(url: str) -> str:
    path = urllib.parse.urlsplit(url).path.strip("/")
    return path.replace("/", "__") or "index"


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def page_to_record(url: str, html: str) -> dict[str, object]:
    soup = BeautifulSoup(html, "html.parser")
    title = normalize_space(soup.title.get_text(" ", strip=True)) if soup.title else ""
    main = soup.find("main") or soup.body or soup

    for unwanted in main.select(
        "script, style, noscript, .mz_layout_overlay, .moze-overlay-zone"
    ):
        unwanted.decompose()

    headings = [
        normalize_space(node.get_text(" ", strip=True))
        for node in main.select("h1, h2, h3")
        if normalize_space(node.get_text(" ", strip=True))
    ]
    text = normalize_space(main.get_text(" ", strip=True))

    links: list[dict[str, str]] = []
    for node in main.select("a[href]"):
        absolute = urllib.parse.urljoin(url, node["href"])
        if urllib.parse.urlsplit(absolute).scheme in {"http", "https", "mailto", "tel"}:
            links.append(
                {
                    "text": normalize_space(node.get_text(" ", strip=True)),
                    "url": absolute,
                }
            )

    images: list[dict[str, str]] = []
    for node in soup.select("img[src]"):
        images.append(
            {
                "alt": normalize_space(node.get("alt", "")),
                "url": urllib.parse.urljoin(url, node["src"]),
            }
        )

    canonical_node = soup.select_one('link[rel~="canonical"][href]')
    canonical = (
        urllib.parse.urljoin(url, canonical_node["href"]) if canonical_node else url
    )
    return {
        "url": url,
        "canonical_url": canonical,
        "slug": slug_for_url(url),
        "title": title,
        "headings": headings,
        "text": text,
        "links": links,
        "images": images,
    }


def markdown_for_page(record: dict[str, object]) -> str:
    title = str(record["title"]) or str(record["url"])
    headings = record["headings"]
    heading_lines = "\n".join(f"- {heading}" for heading in headings) if headings else "- None"
    return (
        f"# {title}\n\n"
        f"Source: {record['url']}\n\n"
        f"## Headings\n\n{heading_lines}\n\n"
        f"## Content\n\n{record['text']}\n"
    )


def extension_for_image(url: str, content_type: str) -> str:
    suffix = Path(urllib.parse.urlsplit(url).path).suffix.lower()
    if suffix and len(suffix) <= 6:
        return suffix
    return mimetypes.guess_extension(content_type) or ".bin"


def parse_sitemap(xml_bytes: bytes, root_url: str) -> list[str]:
    document = ET.fromstring(xml_bytes)
    urls = [
        normalize_space(node.text or "")
        for node in document.findall(".//{*}loc")
        if normalize_space(node.text or "")
    ]
    root_host = urllib.parse.urlsplit(root_url).netloc
    return [
        url
        for url in urls
        if urllib.parse.urlsplit(url).netloc == root_host
        and urllib.parse.urlsplit(url).scheme in {"http", "https"}
    ]


def write_csv(records: list[dict[str, object]], destination: Path) -> None:
    with destination.open("w", encoding="utf-8", newline="") as output:
        writer = csv.DictWriter(
            output,
            fieldnames=["url", "canonical_url", "slug", "title", "headings", "text"],
        )
        writer.writeheader()
        for record in records:
            writer.writerow(
                {
                    **{key: record[key] for key in writer.fieldnames if key != "headings"},
                    "headings": " | ".join(record["headings"]),
                }
            )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default=DEFAULT_ROOT)
    parser.add_argument("--output", type=Path, default=Path("scraped"))
    parser.add_argument(
        "--delay",
        type=float,
        default=None,
        help="Seconds between requests to the source host (defaults to robots.txt).",
    )
    parser.add_argument(
        "--skip-images", action="store_true", help="Do not download discovered images."
    )
    args = parser.parse_args()

    root_url = args.root.rstrip("/") + "/"
    robots_url = urllib.parse.urljoin(root_url, "robots.txt")
    sitemap_url = urllib.parse.urljoin(root_url, "sitemap.xml")

    fetcher = PoliteFetcher(delay=0)
    robots_body, _, _ = fetcher.fetch(robots_url)
    robots = urllib.robotparser.RobotFileParser(robots_url)
    robots.parse(robots_body.decode("utf-8", errors="replace").splitlines())
    robots_delay = robots.crawl_delay("*") or 0
    delay = args.delay if args.delay is not None else float(robots_delay)
    fetcher.delay = delay
    if not robots.can_fetch(USER_AGENT, sitemap_url):
        raise SystemExit(f"robots.txt does not permit fetching {sitemap_url}")

    output = args.output
    raw_dir = output / "raw"
    html_dir = output / "html"
    pages_dir = output / "pages"
    images_dir = output / "images"
    raw_dir.mkdir(parents=True, exist_ok=True)
    html_dir.mkdir(parents=True, exist_ok=True)
    pages_dir.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)

    print(f"Using {delay:g}s crawl delay from robots.txt", flush=True)
    sitemap_body, _, _ = fetcher.fetch(sitemap_url)
    (output / "sitemap.xml").write_bytes(sitemap_body)
    urls = parse_sitemap(sitemap_body, root_url)
    print(f"Found {len(urls)} sitemap pages", flush=True)

    records: list[dict[str, object]] = []
    failures: list[dict[str, str]] = []
    for position, url in enumerate(urls, start=1):
        if not robots.can_fetch(USER_AGENT, url):
            failures.append({"url": url, "error": "Disallowed by robots.txt"})
            continue
        try:
            body, final_url, content_type = fetcher.fetch(url)
            if content_type not in {"text/html", "application/xhtml+xml"}:
                raise ValueError(f"Unexpected content type: {content_type}")
            html = body.decode("utf-8", errors="replace")
            record = page_to_record(final_url, html)
            slug = str(record["slug"])
            (raw_dir / f"{slug}.html").write_text(html, encoding="utf-8")
            (html_dir / f"{slug}.html").write_text(html, encoding="utf-8")
            (pages_dir / f"{slug}.md").write_text(
                markdown_for_page(record), encoding="utf-8"
            )
            records.append(record)
            print(f"[{position}/{len(urls)}] {url}", flush=True)
        except (OSError, ValueError, urllib.error.URLError) as error:
            failures.append({"url": url, "error": str(error)})
            print(f"[{position}/{len(urls)}] FAILED {url}: {error}", flush=True)

    image_urls = {
        image["url"]
        for record in records
        for image in record["images"]
        if urllib.parse.urlsplit(image["url"]).scheme in {"http", "https"}
    }
    downloaded_images: list[dict[str, str]] = []
    if not args.skip_images:
        for position, image_url in enumerate(sorted(image_urls), start=1):
            try:
                body, final_url, content_type = fetcher.fetch(image_url)
                digest = hashlib.sha256(image_url.encode("utf-8")).hexdigest()[:12]
                stem = Path(urllib.parse.urlsplit(final_url).path).stem or "image"
                safe_stem = re.sub(r"[^A-Za-z0-9._-]+", "-", stem).strip("-")
                filename = f"{safe_stem}-{digest}{extension_for_image(final_url, content_type)}"
                (images_dir / filename).write_bytes(body)
                downloaded_images.append(
                    {
                        "source_url": image_url,
                        "file": f"images/{filename}",
                        "content_type": content_type,
                    }
                )
                print(f"[image {position}/{len(image_urls)}] {image_url}", flush=True)
            except (OSError, ValueError, urllib.error.URLError) as error:
                failures.append({"url": image_url, "error": str(error)})

    scraped_at = datetime.now(timezone.utc).isoformat()
    export = {
        "source": root_url,
        "sitemap": sitemap_url,
        "scraped_at": scraped_at,
        "crawl_delay_seconds": delay,
        "page_count": len(records),
        "image_count": len(downloaded_images),
        "pages": records,
        "downloaded_images": downloaded_images,
        "failures": failures,
    }
    (output / "site.json").write_text(
        json.dumps(export, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    write_csv(records, output / "pages.csv")
    (output / "README.md").write_text(
        "# lielvaiceni.lv scrape\n\n"
        f"Scraped at: {scraped_at}\n\n"
        f"- Pages: {len(records)}\n"
        f"- Images: {len(downloaded_images)}\n"
        f"- Failures: {len(failures)}\n"
        f"- Crawl delay: {delay:g} seconds\n\n"
        "Use `site.json` for the complete structured export, `pages.csv` for "
        "tabular text, `pages/` for readable Markdown, and `html/` for the full "
        "original HTML of each page. `raw/` is retained for compatibility.\n",
        encoding="utf-8",
    )
    print(
        f"Done: {len(records)} pages, {len(downloaded_images)} images, "
        f"{len(failures)} failures",
        flush=True,
    )
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
