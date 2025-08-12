
# Empowered Living Solutions — Final Website

This is a finished, single-page website with a 6-item menu, animations, gallery, and a working (AJAX) contact form **stub**.

## Logo
- Full business name text logo at `assets/images/logo.svg`

## Images
- Real photographs are hotlinked from Picsum:
  - Hero: https://picsum.photos/id/1011/1400/900
  - Gallery: https://picsum.photos/id/1025/1400/900, https://picsum.photos/id/1005/1400/900, https://picsum.photos/id/1050/1400/900, https://picsum.photos/id/1035/1400/900, https://picsum.photos/id/1041/1400/900, https://picsum.photos/id/1051/1400/900
- To use **local images** instead (recommended):
  1. Save your JPG/PNG files into `assets/images/` (e.g., `hero.jpg`, `g1.jpg`, ...).
  2. Update the `src` attributes in `index.html` to those local files.
  3. Remove the hotlinked URLs.

## Contact Form
- Configure a real endpoint in `assets/script.js` by setting `FORM_ENDPOINT` (e.g., Formspree, your API).
- Works in **demo mode** if left blank.

## How to Run
Open `index.html` in a browser. For best results (and to avoid CORS with some setups), serve with a simple local server:
- Python: `python3 -m http.server 8080` then visit http://localhost:8080

