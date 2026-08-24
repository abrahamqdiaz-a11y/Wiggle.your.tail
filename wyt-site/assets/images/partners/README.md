# Partner logos

Drop partner logo files in this folder, then reference them from `/partners.html`.

## File requirements

| Item        | Guideline                                                        |
|-------------|------------------------------------------------------------------|
| Format      | `.svg` preferred · `.png` or `.webp` also fine                    |
| Background  | Transparent (the tile behind it is cream `#FDFAF5`)               |
| Size        | ~400–600px wide, under ~80KB                                      |
| Shape       | Any — logos are scaled to fit a 118px-tall tile, never cropped    |
| File name   | lowercase-with-dashes, e.g. `sarasota-animal-hospital.png`        |

## Adding a partner to the page

1. Save the logo here (e.g. `assets/images/partners/happy-paws-grooming.png`).
2. Open `/partners.html` and find the comment block marked
   **"COPY FROM HERE" / "TO HERE"** just above `<section id="our-partners">`.
3. Copy that card, paste it inside `<div class="partner-grid">`, and fill in
   the website URL, logo path, initials, category, name and blurb.

## No logo yet?

Add `class="logo-missing"` to the card's `.partner-logo` div and the initials
tile (`.partner-monogram`) shows instead, so the card still looks finished.
The same fallback kicks in automatically if a logo file is missing or fails to
load, so a broken image never appears on the live site.
