# Wiggle Your Tail Pet Care — Website

**Live site:** https://wiggleyourtail.com  
**Stack:** Pure HTML / CSS / JS · Hosted on Netlify · Auto-deploys from GitHub

---

## 📁 Repo Structure

```
/
├── index.html                    Homepage
├── dog-walking.html              Dog Walking
├── pet-sitting.html              Pet Sitting & Overnights
├── dog-training.html             Dog Training
├── wedding-pet-attendant.html    Wedding Pet Attendant
├── snowbird-services.html        Snowbird & House Sitting
├── services-rates.html           Services Overview
├── how-it-works.html             How It Works
├── about.html                    About Christa
├── contact.html                  Contact
├── sitemap.xml                   XML sitemap for SEO
├── robots.txt                    Search engine instructions
├── netlify.toml                  Netlify config (redirects, headers)
└── assets/
    ├── css/main.css              Shared stylesheet
    ├── js/main.js                Shared JavaScript
    └── images/                  ← DROP CLIENT PHOTOS HERE
```

---

## 🖼 Adding Client Photos (send them anytime!)

Photos go in `assets/images/`. Then replace Unsplash `src` URLs in each HTML file.

Search each HTML file for `images.unsplash.com` — every one of those needs to be swapped with your actual photo path.

**Example:**
```html
<!-- BEFORE -->
<img src="https://images.unsplash.com/photo-xxx" alt="Dog walker Sarasota"/>

<!-- AFTER -->
<img src="assets/images/dog-walker-sarasota.jpg" alt="Dog walker Sarasota"/>
```

**Recommended sizes:**
- Hero main: 1600 × 1200px minimum
- Hero secondary: 800 × 600px
- Section photos: 1200 × 900px
- Compress all to under 400KB (use squoosh.app — it's free)

---

## 🔗 Pages That Stay on WordPress

| Page | URL |
|------|-----|
| Blog (Doggy Bloggy) | `/doggybloggy/` |
| Shop | `/home-shop/` |
| FAQs | `/faqs/` |
| Barkimonials | `/?page_id=171` |
| Become a Walker | `/become-a-walker/` |
| Pet Boarding | `/pet-boarding/` |
| Privacy Policy | `/privacy-policy/` |
| Terms & Conditions | `/terms-and-conditions/` |
| Data Deletion | `/data-deletion/` |
| Pet Policy | `/pet-policy/` |

---

## 🚀 Deploying to Netlify (first time)

1. Push this repo to GitHub (see below)
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from GitHub**
3. Select this repository
4. Leave build settings blank (no build command, publish dir = `/`)
5. Click **Deploy site**
6. Go to **Domain settings** → Add `wiggleyourtail.com`
7. Update DNS at your domain registrar to point to Netlify
8. Netlify issues free SSL automatically ✅

**Every future update:** just push to GitHub → Netlify auto-deploys in ~30 seconds.

---

## 📤 Uploading to GitHub

```bash
# First time
git init
git add .
git commit -m "Initial WYT site build"
git remote add origin https://github.com/YOUR_USERNAME/wiggle-your-tail-website.git
git push -u origin main

# Future updates
git add .
git commit -m "Updated homepage photos"
git push
```

Or just drag-and-drop files into a new GitHub repo — no terminal needed.

---

## 📬 Making Contact Forms Work (Netlify Forms)

Add two things to each `<form>` tag:

```html
<form data-netlify="true" name="contact-form" method="POST">
  <input type="hidden" name="form-name" value="contact-form"/>
  ... rest of your form ...
</form>
```

Submissions go to your Netlify dashboard → Forms → and can email you automatically.

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Primary Purple | `#6B3FA0` |
| Deep Purple | `#3D1F6B` |
| Gold | `#D4960A` |
| Cream background | `#FDFAF5` |
| Heading font | Fraunces (Google Fonts) |
| Body font | Plus Jakarta Sans (Google Fonts) |

All in `assets/css/main.css` under `:root {}`.

---

## 📞 Business Info

- **Phone:** (941) 280-5156
- **Email:** contact@wiggleyourtail.com
- **Booking:** https://www.timetopet.com/portal/wiggleyourtail
- **Facebook:** @WiggleYourTailDogWalking
- **Instagram:** @wiggleyourtailpetcare

---

*Built for Wiggle Your Tail Pet Care · Sarasota, FL*
