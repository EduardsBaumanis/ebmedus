# Lielvaicēni website scraper

A small crawler for the public pages of
[lielvaiceni.lv](http://www.lielvaiceni.lv/). It discovers pages from the
website's sitemap, follows its `robots.txt` rules, and saves the content in
several convenient formats.

The current export contains 14 pages and 19 images.

## Requirements

- Python 3.9 or newer
- Beautiful Soup 4

Install the Python dependency:

```bash
python3 -m pip install beautifulsoup4
```

## Run the scraper

From this directory, run:

```bash
python3 scrape_lielvaiceni.py
```

The website specifies a 10-second crawl delay, so a complete run takes several
minutes. Existing files with the same names are replaced.

Useful options:

```bash
# Write the export to another directory
python3 scrape_lielvaiceni.py --output my-export

# Scrape pages without downloading images
python3 scrape_lielvaiceni.py --skip-images

# Display every available option
python3 scrape_lielvaiceni.py --help
```

## Export structure

```text
scraped/
├── html/          Complete HTML source for each page
├── images/        Images discovered across the pages
├── pages/         Cleaned page content in Markdown
├── raw/           Compatibility copy of the complete HTML
├── pages.csv      Page titles, headings, URLs, and extracted text
├── site.json      Complete structured export, links, and image manifest
├── sitemap.xml    Sitemap used for the crawl
└── README.md      Summary of the latest scrape
```

Open [`scraped/html/index.html`](scraped/html/index.html) to inspect the saved
home page. These files preserve the website's original HTML and still reference
some external stylesheets and scripts; they are source snapshots rather than a
fully offline mirror.

Nested URL paths use double underscores in filenames. For example:

```text
/pakalpojumi/bisu-maize/
→ pakalpojumi__bisu-maize.html
```

## Data formats

- `site.json` is the most complete machine-readable export. It contains the
  source URL, canonical URL, title, headings, text, links, and images for every
  page.
- `pages.csv` is convenient for spreadsheets and data analysis.
- `pages/*.md` contains readable, cleaned text.
- `html/*.html` contains the full HTML returned by the server.

## Responsible crawling

The scraper only requests public sitemap pages. By default it reads and obeys
the crawl delay published in the website's `robots.txt`; for this site that is
10 seconds between requests.
