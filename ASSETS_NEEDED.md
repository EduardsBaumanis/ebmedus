# Photo & video assets — do not AI-generate

This site makes factual claims about a real farm business (equipment, people,
products, pricing). Every photo/video used to illustrate those claims should
be a real, verifiable image of Lielvaicēni's own people, animals, equipment,
or products — **not** AI-generated. Stock or AI imagery of "a beekeeper" or
"a tractor" would misrepresent the business and undermine the B2B trust the
new site is trying to build. Use this file to track what's already usable
and what still needs to be shot.

## ⚠️ Temporary stock placeholders — replace with real photography

These four were added in the "less jumpy / more coherent" pass to get the
`Bišu mātes` / `Vaska šūnas` / `Vaska sveces` / `Bišu maizes pārstrāde` cards
off flat icons and onto photos, matching the rest of the catalog grid. They
are **stock photos of other people's bees and products, not Lielvaicēni's**
— they directly violate the "no stock" rule above and were a stopgap for
visual coherence, not a real fix. Swap each for real Lielvaicēni photography
as soon as it exists, then delete the file and this note.

- `scraped/images/bisu-mate-foto.jpg` — CC0 (rawpixel/Openverse) marked queen bee close-up. Used on `index.html`, `produkti.html`, `pakalpojumi.html` (Bišu mātes).
- `scraped/images/vaska-sunas-foto.jpg` — CC BY-SA 3.0, Wikimedia Commons (uploader "Artic"). Used on `index.html`, `produkti.html`, `pakalpojumi.html` (Vaska šūnas). Attribution credit is in the site footer (`site.js`) — remove that credit line too once this file is replaced.
- `scraped/images/vaska-sveces-foto.jpg` — CC0, WordPress Photo Directory. Used on `produkti.html` (Vaska sveces).
- `scraped/images/bisu-maize-foto.jpg` — CC BY-SA 3.0, Wikimedia Commons ("Pollen in Wabe 31b" by Waugsberg). Used on `pakalpojumi.html` (Bišu maizes pārstrāde). Attribution credit is in the site footer (`site.js`) — remove that credit line too once this file is replaced.

## Already available (in `scraped/images/`) and now in use

These came from the old lielvaiceni.lv scrape and are already wired into the
redesigned pages:

- `kombains-455bf5620e63.jpg` — John Deere S690 combine harvesting, dusk. Used on `pakalpojumi.html` (Lauksaimniecības tehnikas pakalpojumi) and `index.html`.
- `KEZU-76c19ed0023b.jpg` — CASE crawler excavator on a demolition/rubble pile. Used on `pakalpojumi.html` (Ekskavatora un buldozera pakalpojumi).
- `IMG_20220330_120617-e8abec9c744f.jpg` — Kubota KX080-4 excavator in the workshop (matches the model named on the old site). Not yet placed — good alternate/detail shot for the excavator card.
- `WhatsApp_Image_2021-01-20_at_15_33_27__1_-f4a20147b994.jpeg` — Valtra tractor + 12t forestry trailer + grapple crane loading logs in snow. Used on `pakalpojumi.html` (Meža tehnikas pakalpojumi).
- `11-8085b5d24945.jpg` / `12-0cc28267e5d3.jpg` — official Ambrosia Kandijs promo graphics with real prices (15 kg box €20,50; 12,5 kg / 5×2,5 kg €19,50). Used on `produkti.html`, `pakalpojumi.html`, `index.html`.
- `sirups-foto.jpg` — **real Lielvaicēni photo**, not stock: rows of syrup buckets with their own printed "Lielvaicēni" label, recovered from the old site's external gallery (`scraped/pages/invertsirups.md` links to `site-1037717.mozfiles.com/.../gallery2/151332582/...`, not from `scraped/images/`). Used on `index.html` (Bišu barība teaser card, replacing the jerry-can icon). Two more from that same gallery are downloaded-but-unused and worth placing on `invertsirups.html` itself: the IBC-tote yard shot (`Sirups_2023-b969bef3`, only a 600px thumbnail was reachable) and the official Ambrosia 28kg box product shot (`Karton-28kg-Sirup__1_-c7676030`, 2600×1960) — matches the "28kg kaste" pricing already on that page.
  - ⚠️ These are the German manufacturer's (Nordzucker/Ambrosia) own marketing artwork, not Lielvaicēni's photography. Fine to reuse as an authorized distributor (they were live on the old site), but don't crop/edit them as if they were original photos, and re-confirm the prices are still current before relying on them long-term.

## Already available but NOT used yet — needs a decision

- `KEZU2-ccfc442ad58b.jpg` — second angle of the same excavator/rubble job. Spare, could replace or rotate with `KEZU-...jpg`.
- `IMG_20201127_142217__1_-233d8cba8488.jpg` / `IMG_20201127_142304__1_-2a74fb789540.jpg` — yellow Hidromek wheeled backhoe loader. **Doesn't match** the "kāpurķēžu" (crawler/tracked) excavator or bulldozer described in the old site text — it's wheeled, not tracked. Don't caption it as either service until confirmed what job this machine is actually used for.
- `IMG-20220802-WA0000-350633cc50c4.jpg` — same Hidromek backhoe, different day. Same caveat.
- `IMG_20220330_120536-53c4f83b1984.jpg` — close-up of a grapple/"kniebējgalva" attachment in the workshop. Good detail shot for the forestry grapple service, currently unused.
- `WhatsApp_Image_2021-01-20_at_15_33_26-3feaef40c23c.jpeg` — same forestry job, wider shot. Spare/alternate to the one in use.
- `Foto_ReinisInkens-1277-9b95c9c91d64.jpg` — professional portrait, man in a hat by a lake. **Identity not confirmed** — do not caption as Artūrs/Toms/Pēteris without checking with the owner first.
- `unnamed-e670e8336a83.jpg` — professional headshot, woman in a blazer. **Identity not confirmed** — plausibly Iveta or Laura Grudovska, but don't publish a name/role under it until confirmed.
- `bio-3eadd8fd24e8.jpg` — official EU organic-farming leaf logo. The old site only ever mentions *"Bioloģiskā vaska pārstrāde šūnās"* (processing organic-certified wax for beekeepers who bring it), not that the whole farm is organic-certified. **Don't display this logo as a general certification badge** unless you can confirm a valid organic certificate — misusing the EU organic mark is a compliance risk, not just a copy problem.

## Not available — needs real photography

Nothing AI-generated here; these should be scheduled as an actual photo/video shoot:

- **Bišu mātes (queen bees):** rearing frames, queen cages, a marked queen, mating nucs. Currently represented only by a generic icon on `produkti.html`/`pakalpojumi.html` — a real photo would make this the strongest card on the site since it's the lead B2B product.
- **Vaska šūnas (wax foundation):** finished foundation sheets, the 5 kg pack as sold. Currently an icon only.
- **Own honey jars:** real product photography of the three bottled honey varieties (current images are label-mockup PNGs, not photographed jars).
- **Apiary / dravas:** hives in the field, ideally in a Zemgale nectar-crop field to back up the "500 ha nectaraugu" claim.
- **Team:** consistent, confirmed-identity headshots for Artūrs, Pēteris, Iveta and Laura Grudovska (only Toms currently has a usable, identified portrait).
- **Kandijs / invertsīrups in Lielvaicēni's own hands:** a photo of their own stock/pallets, distinct from the manufacturer's marketing graphic.
- **Field work in action:** tractor plowing/sowing/spraying, for the Lauksaimniecības tehnikas pakalpojumi card (currently using a combine-harvest photo only).
- **Video (none exist in the scrape at all):**
  - Short clip of excavator/bulldozer/Kubota operation on a job site.
  - Short clip of the forestry trailer + grapple loading logs.
  - Short clip of a combine or tractor doing field work.
  - Short walkthrough of the beeyard / queen-rearing process.

## Notes

- Source of truth for identifying what's real vs. assumed: `scraped/` (site.json, pages.csv, pages/*.md, images/) — the archived copy of the old lielvaiceni.lv.
- When new photos are shot, drop them in `scraped/images/` or a new `assets/photos/` folder and update this file.
