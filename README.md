# lielvaiceni.lv scraper

Scrapes the public pages listed in `http://www.lielvaiceni.lv/sitemap.xml`,
honors the site's `robots.txt` crawl delay, and exports:

- original, complete HTML in `scraped/html/`;
- cleaned Markdown page text;
- structured JSON and CSV;
- discovered page images.

Run:

```bash
python3 scrape_lielvaiceni.py
```

The generated export is written to `scraped/`.
