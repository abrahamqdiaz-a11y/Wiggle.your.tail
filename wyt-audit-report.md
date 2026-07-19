# Wiggle Your Tail — Full SEO & Technical Audit Report
**Date:** 2026-07-19  
**Auditor:** Automated SEO Audit (Claude Code)  
**Site:** https://wiggleyourtail.com  
**Local files audited:** /home/user/Wiggle.your.tail/wyt-site/  
**Note:** Live HTTP checks via curl were blocked by the audit environment proxy (403 from proxy for all external requests). All HTTP/redirect findings are derived from netlify.toml configuration and local file analysis. Live status codes should be independently verified.

---

## Executive Summary — Top 5 Critical Issues

| Priority | Issue | SEO Impact | Affected Pages |
|----------|-------|-----------|----------------|
| 🔴 P1 | **Internal links use relative .html paths that break at clean URLs** | All pages link to `/dog-walking.html` etc. instead of `/dog-walking/`. Google sees internal links pointing to .html variants, not to the canonical clean URLs. PageRank signals split across URL versions. | All .html-based pages (12 pages) |
| 🔴 P2 | **netlify.toml redirects canonical URLs to .html variants** | `/services-rates/` and `/how-it-works/` are in the sitemap with trailing slash, but netlify.toml 301-redirects them to `.html` versions. Google follows the redirect, lands on a URL that differs from the canonical declared on the page. Two redirect hops for every crawler visit. | /services-rates/, /how-it-works/ |
| 🔴 P3 | **22 images are massively oversized (up to 4.8 MB uncompressed)** | Core Web Vitals failure. LCP will be severely penalized. No WebP/AVIF conversion. Several filenames contain spaces and are WhatsApp exports. | Site-wide |
| 🟠 P4 | **5 important pages missing from sitemap.xml** | /faqs/, /pricing/, /best-sarasota-neighborhoods-for-dog-owners/, /snowbird-checklist-managing-your-home-and-pets/, /ultimate-sarasota-pet-sitter-guide/ not submitted for indexing | 5 pages |
| 🟠 P5 | **Homepage and 2 blog posts have near-empty meta descriptions (8 chars: "Sarasota")** | Google will auto-generate snippets, losing control of SERP presentation for the highest-traffic pages | /, /best-time-to-walk-your-dog-in-sarasota/, /sarasota-summers-keeping-your-furry-friend-cool-and-happy/ |

---

## Full Findings

---

### Area 1: URL Inventory & Crawl

#### Sitemap URLs (22 total)
All 22 sitemap URLs map to existing local files.

#### Local Pages Found (27 total)
5 local pages exist but are **not** in the sitemap:

| Missing from Sitemap | Notes |
|----------------------|-------|
| /faqs/ | High-value FAQ page; netlify.toml has a confusing proxy passthrough rule for `/faqs/*` pointing to the live domain, creating a loop risk |
| /pricing/ | Standalone pricing page; only linked from homepage |
| /best-sarasota-neighborhoods-for-dog-owners/ | Location SEO blog post |
| /snowbird-checklist-managing-your-home-and-pets/ | Snowbird content blog post |
| /ultimate-sarasota-pet-sitter-guide/ | High-intent guide; should be in sitemap |

#### URL Inventory Table

| URL | In Sitemap | Inbound Links | HTTP Status (live) | Notes |
|-----|-----------|--------------|---------------------|-------|
| / | YES | 2 | N/A (proxy blocked) | Homepage self-links only |
| /about/ | YES | 16 | N/A | |
| /blog/ | YES | 15 | N/A | |
| /contact/ | YES | 16 | N/A | |
| /dog-sitter-sarasota/ | YES | 1 | N/A | LOW inbound — only linked from /blog/ |
| /dog-trainer-sarasota/ | YES | 2 | N/A | |
| /dog-walking/ | YES | 16 | N/A | |
| /faqs/ | **NO** | 12 | N/A | Not in sitemap |
| /how-a-dog-attendant-can-help-you-include-your-pet-in-your-wedding/ | YES | 1 | N/A | LOW inbound |
| /how-it-works/ | YES | 16 | N/A | netlify redirect chain |
| /mastering-dog-training-from-puppies-to-adults/ | YES | 2 | N/A | |
| /paw-paradise-discover-why-sarasota-is-a-dog-lovers-dream/ | YES | 2 | N/A | |
| /pet-sitting/ | YES | 16 | N/A | |
| /pricing/ | **NO** | 1 | N/A | Not in sitemap; only linked from homepage |
| /privacy-policy/ | YES | 17 | N/A | |
| /are-you-a-pet-mom-heres-why-you-deserve-a-shoutout-this-mothers-day/ | YES | 1 | N/A | LOW inbound |
| /best-sarasota-neighborhoods-for-dog-owners/ | **NO** | 1 | N/A | Not in sitemap |
| /best-time-to-walk-your-dog-in-sarasota/ | YES | 7 | N/A | |
| /sarasota-summers-keeping-your-furry-friend-cool-and-happy/ | YES | 5 | N/A | |
| /services-rates/ | YES | 16 | N/A | netlify redirect chain |
| /snowbird-checklist-managing-your-home-and-pets/ | **NO** | 1 | N/A | Not in sitemap |
| /snowbird-services/ | YES | 16 | N/A | |
| /terms-and-conditions/ | YES | 16 | N/A | |
| /the-future-of-pet-care/ | YES | 1 | N/A | LOW inbound |
| /the-power-of-paws-how-dog-walking-benefits-your-furry-one/ | YES | 1 | N/A | LOW inbound |
| /ultimate-sarasota-pet-sitter-guide/ | **NO** | 1 | N/A | Not in sitemap |
| /wedding-pet-attendant/ | YES | 16 | N/A | |

#### Dead/Unknown URL Checks (from local redirects and references)
| URL | Source | Status |
|-----|--------|--------|
| /pet-taxi/ | netlify.toml | 301 → /wedding-pet-attendant.html |
| /data-deletion/ | privacy-policy.html link | Unknown — no local file found |
| /work-for-us/ | homepage, blog | File exists locally as work-for-us.html; not in sitemap |
| /doggybloggy/* | netlify.toml | Proxied to live domain — potential loop |
| /faqs/* | netlify.toml | Proxied to live domain — but /faqs/ also exists locally |

**Issue:** netlify.toml has a `[[redirects]]` passthrough proxy for `/faqs/*` pointing to `https://wiggleyourtail.com/faqs/:splat`. Since `/faqs/index.html` exists in the build, this proxy rule may be dead code or may conflict with direct file serving depending on Netlify's rule priority.

**Recommended fix:** Add /faqs/, /pricing/, /best-sarasota-neighborhoods-for-dog-owners/, /snowbird-checklist-managing-your-home-and-pets/, and /ultimate-sarasota-pet-sitter-guide/ to sitemap.xml. Remove the stale proxy passthrough rules for /faqs/* from netlify.toml.

---

### Area 2: Duplicate URL / .html Extension Audit

#### Critical Finding: Two Competing URL Architectures

The site uses a **hybrid architecture** that creates multiple URL versions:

**Architecture A — Root .html files** (12 pages):
Files like `about.html`, `dog-walking.html` are stored at the root. Netlify's Pretty URLs feature serves these at `/about`, `/dog-walking` (no trailing slash). All internal nav links inside these files use **relative .html paths** (e.g., `href="dog-walking.html"`), which when served at `/about` resolve back to root-level .html files — this works functionally but exposes `.html` URLs in navigation.

**Architecture B — Subdirectory index.html files** (15 pages):
Files like `dog-sitter-sarasota/index.html`, `blog/index.html` use `/../` relative links which resolve correctly to root-level paths.

#### netlify.toml Redirect Conflicts

Two pages in the sitemap have explicit 301 redirects in netlify.toml that create redirect chains:

| Sitemap URL (Canonical) | netlify.toml Redirect | Actual Served URL | Canonical on Page | Match? |
|------------------------|----------------------|-------------------|-------------------|--------|
| /services-rates/ | /services-rates/ → /services-rates.html (301) | /services-rates (Netlify pretty URL) | /services-rates/ | ❌ MISMATCH |
| /how-it-works/ | /how-it-works/ → /how-it-works.html (301) | /how-it-works (Netlify pretty URL) | /how-it-works/ | ❌ MISMATCH |

**Chain for /services-rates/:**
1. Google requests `/services-rates/` (from sitemap)
2. netlify.toml returns 301 → `/services-rates.html`
3. Netlify Pretty URLs serves `/services-rates.html` at canonical URL `/services-rates` (no trailing slash)
4. Page's `<link rel="canonical">` says `/services-rates/` (trailing slash)
5. → **Canonical declared ≠ URL delivered after redirect**

**Recommended fix:** Remove the explicit redirect rules for `/services-rates/` and `/how-it-works/` from netlify.toml. Netlify's Pretty URL feature will serve `services-rates.html` at `/services-rates` automatically. Then either: (a) update all canonicals to use no-trailing-slash form, or (b) add redirect rules from no-slash to slash form for consistency with the rest of the site.

#### Internal Link URL Pollution

All nav/footer links within .html-based pages reference `.html` URLs. Example from `about.html`:
```html
<a href="dog-walking.html">Dog Walking</a>       <!-- resolves to /dog-walking.html, not /dog-walking/ -->
<a href="services-rates.html">All Services</a>   <!-- resolves to /services-rates.html, not /services-rates/ -->
```

When Google crawls and follows these relative links from `/about`, it discovers `/dog-walking.html` as an internal link target — a different URL than the canonical `/dog-walking/`. While Netlify may return the same content, Google sees PageRank flowing to `.html` URLs that don't match the declared canonical.

**Recommended fix:** Convert all internal nav/footer links to **absolute paths with trailing slash** (e.g., `/dog-walking/`). Alternatively, use a base `<base href="/">` tag consistently, but absolute paths are more robust.

---

### Area 3: Canonical Tag Audit

| URL | Canonical | og:url | Self-Referencing? | Issues |
|-----|-----------|--------|-------------------|--------|
| / | https://wiggleyourtail.com/ | https://wiggleyourtail.com/ | ✅ | None |
| /about/ | https://wiggleyourtail.com/about/ | https://wiggleyourtail.com/about/ | ✅ | None |
| /are-you-a-pet-mom-.../ | (correct) | (correct) | ✅ | None |
| /best-sarasota-neighborhoods-.../ | https://wiggleyourtail.com/best-sarasota-neighborhoods-for-dog-owners/ | https://wiggleyourtail.com/best-sarasota-neighborhoods-for-dog-owners/ | ✅ | ⚠️ Canonical URL not in sitemap |
| /best-time-to-walk-your-dog-in-sarasota/ | https://wiggleyourtail.com/best-time-to-walk-your-dog-in-sarasota/ | **MISSING** | ✅ | ⚠️ og:url missing |
| /blog/ | (correct) | (correct) | ✅ | None |
| /contact/ | (correct) | (correct) | ✅ | None |
| /dog-sitter-sarasota/ | (correct) | (correct) | ✅ | None |
| /dog-trainer-sarasota/ | (correct) | (correct) | ✅ | None |
| /dog-walking/ | (correct) | (correct) | ✅ | None |
| /faqs/ | https://wiggleyourtail.com/faqs/ | https://wiggleyourtail.com/faqs/ | ✅ | ⚠️ Canonical URL not in sitemap |
| /how-a-dog-attendant-.../ | (correct) | (correct) | ✅ | None |
| /how-it-works/ | https://wiggleyourtail.com/how-it-works/ | https://wiggleyourtail.com/how-it-works/ | ✅ | ⚠️ netlify.toml redirects /how-it-works/ to .html — canonical URL does 301 before delivering page |
| /mastering-dog-training-.../ | (correct) | (correct) | ✅ | None |
| /paw-paradise-.../ | (correct) | (correct) | ✅ | None |
| /pet-sitting/ | (correct) | (correct) | ✅ | None |
| /pricing/ | https://wiggleyourtail.com/pricing/ | https://wiggleyourtail.com/pricing/ | ✅ | ⚠️ Canonical URL not in sitemap |
| /privacy-policy/ | (correct) | (correct) | ✅ | None |
| /sarasota-summers-.../ | https://wiggleyourtail.com/sarasota-summers-keeping-your-furry-friend-cool-and-happy/ | **MISSING** | ✅ | ⚠️ og:url missing |
| /services-rates/ | https://wiggleyourtail.com/services-rates/ | https://wiggleyourtail.com/services-rates/ | ✅ | ⚠️ netlify.toml redirects /services-rates/ to .html — canonical URL does 301 before delivering page |
| /snowbird-checklist-.../ | (correct) | (correct) | ✅ | ⚠️ Canonical URL not in sitemap |
| /snowbird-services/ | (correct) | (correct) | ✅ | None |
| /terms-and-conditions/ | (correct) | (correct) | ✅ | None |
| /the-future-of-pet-care/ | (correct) | (correct) | ✅ | None |
| /the-power-of-paws-.../ | (correct) | (correct) | ✅ | None |
| /ultimate-sarasota-pet-sitter-guide/ | (correct) | (correct) | ✅ | ⚠️ Canonical URL not in sitemap |
| /wedding-pet-attendant/ | (correct) | (correct) | ✅ | None |

**Summary of canonical issues:**
- 5 pages have canonical URLs not present in sitemap
- 2 pages missing og:url
- 2 pages where the canonical URL triggers a 301 redirect (services-rates, how-it-works)
- 0 pages with wrong/missing canonical tag

---

### Area 4: Meta & On-Page SEO Audit

#### Title Tag Issues (15 pages over 60 characters)

| URL | Title | Chars | Issue |
|-----|-------|-------|-------|
| / | Wiggle Your Tail — Dog Walking & Pet Care in Sarasota, FL | 61 | Over by 1 |
| /about/ | About Wiggle Your Tail Pet Care \| Dog Walking & Pet Sitting in Sarasota, FL | 79 | Over by 19 |
| /are-you-a-pet-mom-.../ | Are You a Pet Mom? Here's Why You Deserve a Shoutout This Mother's Day \| Wiggle Your Tail | 89 | Over by 29 |
| /best-sarasota-neighborhoods-.../ | The Best Sarasota Neighborhoods for Dog Owners (And Where We Walk Every Day) \| Wiggle Your Tail | 95 | Over by 35 |
| /best-time-to-walk-.../ | The Best Time to Walk Your Dog in Sarasota, FL \| Wiggle Your Tail | 65 | Over by 5 |
| /dog-sitter-sarasota/ | Dog Sitter in Sarasota, FL \| In-Home Pet Sitting \| Wiggle Your Tail | 67 | Over by 7 |
| /dog-trainer-sarasota/ | Dog Trainer Sarasota, FL \| Professional Dog Training \| Wiggle Your Tail | 71 | Over by 11 |
| /how-a-dog-attendant-.../ | How a Dog Attendant Can Help You Include Your Pet in Your Wedding \| Wiggle Your Tail | 84 | Over by 24 |
| /mastering-dog-training-.../ | Mastering Dog Training: From Puppies to Adults \| Wiggle Your Tail Sarasota | 74 | Over by 14 |
| /paw-paradise-.../ | Paw Paradise: Discover Why Sarasota Is a Dog Lover's Dream \| Wiggle Your Tail | 77 | Over by 17 |
| /sarasota-summers-.../ | Sarasota Summers: Keeping Your Furry Friend Cool and Happy \| Wiggle Your Tail | 77 | Over by 17 |
| /snowbird-checklist-.../ | The Snowbird Checklist: Managing Your Home & Pets \| Wiggle Your Tail | 72 | Over by 12 |
| /snowbird-services/ | Snowbird & House Sitting Services Sarasota \| Wiggle Your Tail | 61 | Over by 1 |
| /the-future-of-pet-care/ | The Future of Pet Care: What's Changing and What Stays the Same \| Wiggle Your Tail | 82 | Over by 22 |
| /the-power-of-paws-.../ | The Power of Paws: How Dog Walking Benefits Your Furry One \| Wiggle Your Tail | 77 | Over by 17 |
| /ultimate-sarasota-pet-sitter-guide/ | The Ultimate Sarasota Pet Owner's Guide: Choosing and Preparing a Pet Sitter \| Wiggle Your Tail | 95 | Over by 35 |

No duplicate titles found. ✅

#### Meta Description Issues

| URL | Description | Chars | Issue |
|-----|-------------|-------|-------|
| / | Sarasota | 8 | ❌ CRITICALLY SHORT — appears truncated/broken |
| /about/ | Wiggle Your Tail Pet Care provides professional dog walking... | 226 | Too long (>160) |
| /best-time-to-walk-.../ | Sarasota | 8 | ❌ CRITICALLY SHORT — appears truncated/broken |
| /dog-sitter-sarasota/ | Looking for a trusted dog sitter in Sarasota, FL?... | 196 | Too long |
| /dog-trainer-sarasota/ | Looking for a dog trainer in Sarasota, FL?... | 208 | Too long |
| /dog-walking/ | Professional, one-on-one dog walking in Sarasota, FL... | 162 | Slightly long |
| /faqs/ | Frequently asked questions about Wiggle Your Tail | 49 | Too short (needs >50) |
| /how-it-works/ | Getting started with Wiggle Your Tail is easy... | 161 | Slightly long |
| /mastering-dog-training-.../ | A practical guide to dog training at every life stage... | 204 | Too long |
| /sarasota-summers-.../ | Sarasota summers are brutal for dogs. Here | 42 | ❌ TRUNCATED — cut off mid-sentence |
| /services-rates/ | Dog walking, pet sitting, overnight care... | 168 | Too long |
| /snowbird-checklist-.../ | Leaving Sarasota for the summer? This snowbird checklist... | 167 | Too long |

**Duplicate descriptions:** `/` and `/best-time-to-walk-your-dog-in-sarasota/` both have identical 8-character description: "Sarasota" — clearly a truncation or copy error.

#### H1 Issues

| URL | H1 Count | Issue |
|-----|----------|-------|
| /how-it-works/ | 0 | ❌ **MISSING H1** |
| All other pages | 1 | ✅ |

Note: Several H1s contain inline HTML artifacts (concatenated without spaces) like "Tailored Walks forEvery Dog", "In-Home CareDone with Love" — these are display issues from span elements but appear fine in rendered HTML.

**Recommended fixes:**
1. Fix the 8-character meta descriptions on homepage and /best-time-to-walk-.../ immediately
2. Fix truncated description on /sarasota-summers-.../
3. Add H1 to /how-it-works/
4. Trim all titles to ≤60 characters (drop "| Wiggle Your Tail" from blog post titles)
5. Trim over-long meta descriptions to 150-160 characters

---

### Area 5: Structured Data / Schema Audit

| URL | Schema Types | Issues |
|-----|-------------|--------|
| / | LocalBusiness | ✅ |
| /about/ | NONE | ⚠️ No schema |
| /are-you-a-pet-mom-.../ | Article, FAQPage, BreadcrumbList | ✅ |
| /best-sarasota-neighborhoods-.../ | Article, BreadcrumbList | ✅ |
| /best-time-to-walk-.../ | FAQPage, Article, BreadcrumbList | ✅ |
| /blog/ | NONE | ⚠️ No schema |
| /contact/ | NONE | ⚠️ No schema |
| /dog-sitter-sarasota/ | Service, FAQPage | ✅ |
| /dog-trainer-sarasota/ | Service, FAQPage | ✅ |
| /dog-walking/ | Service | ✅ (consider adding FAQPage) |
| /faqs/ | FAQPage | ✅ |
| /how-a-dog-attendant-.../ | Article, FAQPage, BreadcrumbList | ✅ |
| /how-it-works/ | NONE | ⚠️ No schema |
| /mastering-dog-training-.../ | Article, FAQPage, BreadcrumbList | ✅ |
| /paw-paradise-.../ | Article, FAQPage, BreadcrumbList | ✅ |
| /pet-sitting/ | Service | ✅ |
| /pricing/ | Service | ⚠️ Pricing page using Service schema — consider using PriceSpecification or OfferCatalog |
| /privacy-policy/ | NONE | ℹ️ Acceptable (legal page) |
| /sarasota-summers-.../ | FAQPage, Article, BreadcrumbList | ✅ |
| /services-rates/ | NONE | ⚠️ Key services hub has no schema |
| /snowbird-checklist-.../ | Article (in @graph) | ✅ |
| /snowbird-services/ | Service | ✅ |
| /terms-and-conditions/ | NONE | ℹ️ Acceptable (legal page) |
| /the-future-of-pet-care/ | Article, FAQPage, BreadcrumbList | ✅ |
| /the-power-of-paws-.../ | Article, FAQPage, BreadcrumbList | ✅ |
| /ultimate-sarasota-pet-sitter-guide/ | Article, FAQPage, BreadcrumbList | ✅ |
| /wedding-pet-attendant/ | Service | ✅ |

**No schema type mismatches** (e.g., no Service schema on blog posts). ✅

**Recommended fixes:**
1. Add LocalBusiness schema to /about/ (reinforce NAP signals)
2. Add schema to /services-rates/ (ItemList of services)
3. Add schema to /how-it-works/ (HowTo schema would be ideal)
4. Add schema to /contact/ (LocalBusiness or ContactPage)
5. Add FAQPage to /dog-walking/ and /pet-sitting/ (both have FAQ sections)

---

### Area 6: Keyword Cannibalization Analysis

**Note:** Site-wide footer/nav on every page mentions all services, so "dog walking sarasota" and "pet sitting sarasota" technically appear on all 27 pages. The analysis below focuses on meaningful content-level competition.

#### High-Risk Cannibalization Clusters

**Cluster 1: "Dog Sitter Sarasota" / "Pet Sitter Sarasota"**

| Page | Target Keyword | Evidence |
|------|---------------|----------|
| /dog-sitter-sarasota/ | "dog sitter sarasota" | Title, H1, URL slug |
| /ultimate-sarasota-pet-sitter-guide/ | "pet sitter sarasota" | Title, H1, body |
| /pet-sitting/ | "pet sitting sarasota" | Title, meta |
| /blog/ (index) | "dog sitter sarasota" | Blog card mentions dog-sitter page |

**Risk:** /dog-sitter-sarasota/ and /ultimate-sarasota-pet-sitter-guide/ are likely competing for the same searcher intent ("find a pet sitter in Sarasota"). The guide should be positioned as informational content and internally link strongly to /dog-sitter-sarasota/.

**Cluster 2: "Dog Trainer Sarasota"**

| Page | Target Keyword | Evidence |
|------|---------------|----------|
| /dog-trainer-sarasota/ | "dog trainer sarasota" | Title, H1, URL slug, Service schema |
| /mastering-dog-training-from-puppies-to-adults/ | "dog training sarasota" | Title, body text, links to /dog-trainer-sarasota/ |

**Risk:** Low-moderate. The blog post does link to the service page and targets slightly different intent (informational). Cross-link is in place. ✅

**Cluster 3: "Wedding Pet Attendant"**

| Page | Target Keyword | Evidence |
|------|---------------|----------|
| /wedding-pet-attendant/ | "wedding pet attendant" | Title, H1, URL slug, Service schema |
| /how-a-dog-attendant-can-help-you-include-your-pet-in-your-wedding/ | "dog attendant wedding" | Title, H1, body |

**Risk:** Moderate. Both target wedding + dog handler intent. The blog post should canonicalize its authority to the service page with a clear CTA and contextual link.

**Cluster 4: "Dog Walker Sarasota" — missing page**
There is no dedicated `/dog-walker-sarasota/` landing page. The main service page is titled "Dog Walking Sarasota" (transactional query). Someone searching "dog walker near me sarasota" or "dog walker sarasota" would land on /dog-walking/ which uses the H1 "Tailored Walks for Every Dog" — not mentioning "dog walker" or "Sarasota" in the H1.

**Recommended fixes:**
1. Ensure /ultimate-sarasota-pet-sitter-guide/ prominently links to /dog-sitter-sarasota/ (not just /pet-sitting/)
2. Update /dog-walking/ H1 to include "Sarasota" (e.g., "Professional Dog Walking in Sarasota, FL")
3. Consider a /dog-walker-sarasota/ landing page parallel to /dog-sitter-sarasota/
4. Add explicit "hired service" CTA on the blog post /how-a-dog-attendant-.../ linking to /wedding-pet-attendant/

---

### Area 7: Internal Linking Audit

#### Inbound Link Count by Page

| URL | Inbound Links | Outbound Internal | Orphan/Low? |
|-----|--------------|------------------|-------------|
| / | 2 (self) | 15 | Normal for homepage |
| /about/ | 16 | 14 | ✅ Good |
| /are-you-a-pet-mom-.../ | 1 | 12 | ⚠️ LOW |
| /best-sarasota-neighborhoods-.../ | 1 | 15 | ⚠️ LOW |
| /best-time-to-walk-.../ | 7 | 13 | ✅ |
| /blog/ | 15 | 26 | ✅ |
| /contact/ | 16 | 15 | ✅ |
| /dog-sitter-sarasota/ | **1** | 12 | ❌ CRITICAL — only linked from blog index |
| /dog-trainer-sarasota/ | 2 | 14 | ⚠️ LOW |
| /dog-walking/ | 16 | 15 | ✅ |
| /faqs/ | 12 | 13 | ✅ (but not in sitemap) |
| /how-a-dog-attendant-.../ | 1 | 12 | ⚠️ LOW |
| /how-it-works/ | 16 | 15 | ✅ |
| /mastering-dog-training-.../ | 2 | 13 | ⚠️ LOW |
| /paw-paradise-.../ | 2 | 14 | ⚠️ LOW |
| /pet-sitting/ | 16 | 15 | ✅ |
| /pricing/ | 1 | 15 | ⚠️ LOW — only from homepage |
| /privacy-policy/ | 17 | 17 | ✅ |
| /sarasota-summers-.../ | 5 | 13 | ✅ |
| /services-rates/ | 16 | 15 | ✅ |
| /snowbird-checklist-.../ | 1 | 12 | ⚠️ LOW |
| /snowbird-services/ | 16 | 15 | ✅ |
| /terms-and-conditions/ | 16 | 17 | ✅ |
| /the-future-of-pet-care/ | 1 | 12 | ⚠️ LOW |
| /the-power-of-paws-.../ | 1 | 13 | ⚠️ LOW |
| /ultimate-sarasota-pet-sitter-guide/ | 1 | 14 | ⚠️ LOW |
| /wedding-pet-attendant/ | 16 | 15 | ✅ |

#### Key Structural Issues

1. **/dog-sitter-sarasota/ has only 1 inbound link** (from the blog index). This is a high-intent commercial landing page competing for "dog sitter Sarasota" — one of the most valuable local keywords. It should be linked from the homepage, /pet-sitting/, /about/, and every relevant blog post.

2. **Blog posts from the /blog/ index are the only gateway** to many content pages. The blog index has 15 inbound links, but most individual blog posts have only 1 inbound link.

3. **Blog posts link to service pages via nav/footer links** (via the shared navigation), but NOT via contextual in-body links to the most relevant service. Cross-linking checklist:

| Blog Post | Should Link To | Links To? |
|-----------|---------------|-----------|
| /the-power-of-paws-.../ | /dog-walking/ | ✅ (via nav, but check body) |
| /ultimate-sarasota-pet-sitter-guide/ | /dog-sitter-sarasota/ | ⚠️ Links to /pet-sitting/ but not /dog-sitter-sarasota/ |
| /how-a-dog-attendant-.../ | /wedding-pet-attendant/ | ✅ (via nav) |
| /mastering-dog-training-.../ | /dog-trainer-sarasota/ | ✅ (2 inbound from this page) |
| /snowbird-checklist-.../ | /snowbird-services/ | ✅ (via nav) |

**Recommended fixes:**
1. Link to /dog-sitter-sarasota/ from: homepage hero CTA, /pet-sitting/ body, /ultimate-sarasota-pet-sitter-guide/ body, /about/
2. Add /pricing/ to the main navigation
3. Add contextual in-body links from all blog posts to their most relevant service page
4. Cross-link related blog posts to each other (e.g., /best-time-to-walk-.../ ↔ /the-power-of-paws-.../)

---

### Area 8: Redirect & Broken Link Check

**Note:** Live HTTP checks were blocked by the audit proxy. Findings below are from local file analysis and netlify.toml.

#### Known Redirects (from netlify.toml)

| From | To | Status | Issue |
|------|----|--------|-------|
| /pet-taxi/ | /wedding-pet-attendant.html | 301 | .html target — should point to /wedding-pet-attendant/ |
| /pet-taxi | /wedding-pet-attendant.html | 301 | Same issue |
| /services-rates/ | /services-rates.html | 301 | ❌ Canonical page redirected to .html version |
| /how-it-works/ | /how-it-works.html | 301 | ❌ Canonical page redirected to .html version |
| /services/ | /services-rates.html | 301 | Acceptable legacy redirect |
| /services | /services-rates.html | 301 | Acceptable legacy redirect |
| /who-we-are/ | /about.html | 301 | Acceptable legacy redirect |
| /contactus/ | /contact.html | 301 | Acceptable legacy redirect |

#### Broken/Missing Page

| URL | Source | Issue |
|-----|--------|-------|
| /data-deletion/ | /privacy-policy/ links to it | No local file found for this page |

#### Internal Link URL Issues (from HTML source)

Every page's nav/footer uses relative `.html` links (e.g., `href="dog-walking.html"`). These resolve at runtime relative to the current page URL. When served by Netlify Pretty URLs at `/about`, the relative `dog-walking.html` resolves to `/dog-walking.html` — a URL that exists but is not the canonical form. This means:

- Google indexes `.html` URL variants as link targets in internal linking
- Potential for PageRank to be split between `/dog-walking/` (canonical) and `/dog-walking.html` (link target)

#### Mixed HTTP/HTTPS
Local HTML files do not contain mixed content — all external asset URLs use HTTPS. ✅

#### www vs non-www
Based on the netlify.toml and canonical tags, the canonical domain is `wiggleyourtail.com` (non-www). Whether `https://www.wiggleyourtail.com` redirects could not be verified due to proxy restrictions.

---

### Area 9: Image Audit

#### Massively Oversized Images (22 images >200KB)

| File | Size | Issue |
|------|------|-------|
| /assets/images/baninho-dog-7441303.jpg | **4,801 KB** | ❌ Critical — nearly 5MB |
| /assets/images/clarkdonald413-dog-4259565.jpg | **3,023 KB** | ❌ Critical |
| /assets/images/clarissabell-beach-3204990.jpg | **2,688 KB** | ❌ Critical |
| /assets/images/picsbyfran-dog-2579871.jpg | **2,401 KB** | ❌ Critical |
| /assets/images/snowbirds pic.png | **2,196 KB** | ❌ Critical + spaces in filename |
| /assets/images/florida.snowbirds.png | **2,190 KB** | ❌ Critical |
| /assets/images/ultimate pet sitter guide.png | **1,976 KB** | ❌ Critical + spaces in filename |
| /assets/images/pet.wedding.attendant.jpg | **1,901 KB** | ❌ Critical |
| /assets/images/wedding.pet.parent.jpg | **1,513 KB** | ❌ Critical |
| /assets/images/dog.wedding.jpg | **1,121 KB** | ❌ Critical |
| /assets/images/WhatsApp Image 2026-04-05 at pic 9.jpeg | **803 KB** | ❌ WhatsApp export, spaces in name |
| /assets/images/hero-dogs-walk.jpg | **803 KB** | Should be WebP |
| /assets/images/WhatsApp Image 2026-04-05 at pic7.jpeg | **564 KB** | WhatsApp export |
| /assets/images/hero-frenchie.jpg | **564 KB** | Should be WebP |
| /assets/images/pic 3.jpeg | **404 KB** | Spaces in filename |
| /assets/images/wiggle your tail rounded.png | **396 KB** | Spaces in filename, should be WebP |
| /assets/images/pet-wedding-attendant.jpg | 322 KB | |
| /assets/images/pic 2.jpeg | 305 KB | Spaces in filename |
| /assets/images/hero-cat.jpg | 305 KB | |
| /assets/images/WhatsApp Image 2026-04-05 at 17.19.22.jpeg | 262 KB | WhatsApp export |
| /assets/images/WhatsApp Image 2026-04-05 at pic3.jpeg | 291 KB | WhatsApp export |
| /assets/images/wedding pics.jpg | 238 KB | Spaces in filename |

**No WebP or AVIF format images found in local assets.** All locally served images are JPEG/PNG.

#### External Images (Unsplash CDN)
8 pages load images directly from `images.unsplash.com`:

| Page | External Images |
|------|----------------|
| / | 3 |
| /about/ | 5 |
| /dog-sitter-sarasota/ | 3 |
| /dog-trainer-sarasota/ | 3 |
| /dog-walking/ | 3 |
| /how-it-works/ | 1 |
| /pet-sitting/ | 2 |
| /snowbird-services/ | 3 |

**Issues with Unsplash images:**
- External dependency (if Unsplash goes down or removes images, pages break)
- No control over image optimization/caching
- Stock images may not convey authenticity for local trust
- Render-blocking if Unsplash is slow

#### Alt Text Issues

| Page | Issue | Examples |
|------|-------|---------|
| /about/ | 3 keyword-stuffed alts | "Professional dog care in Sarasota FL — Wiggle Your Tail Pet Care", "Dog walking service in Sarasota Florida" |
| /dog-sitter-sarasota/ | 1 keyword-stuffed alt | "Dog sitter in Sarasota FL — Wiggle Your Tail Pet Care" |
| /dog-trainer-sarasota/ | 1 keyword-stuffed alt | (similar pattern) |

Alt text should describe the image for screen readers, not stuff brand keywords. Acceptable alt text: "Professional dog walker on a morning walk in Sarasota". Keyword-stuffed alt text: "Dog walking service in Sarasota Florida — Wiggle Your Tail Pet Care".

**No images with missing alt attributes.** ✅

**Recommended fixes:**
1. Convert ALL local images to WebP using an image optimization pipeline (Squoosh, sharp, or netlify-plugin-image-optim)
2. Target <100KB for most images; <200KB for hero images
3. Replace WhatsApp-exported filenames with SEO-friendly names (no spaces, descriptive)
4. Self-host or cache the Unsplash images locally in WebP format
5. Revise keyword-stuffed alt texts to be descriptive and natural

---

### Area 10: Performance & Technical

#### robots.txt (from local file)
```
User-agent: *
Allow: /
Disallow: /search/

Sitemap: https://wiggleyourtail.com/sitemap.xml
```
✅ Valid. References sitemap. Disallows only /search/ which is correct.

#### Security Headers (from netlify.toml)
Configured globally:
- `X-Frame-Options: DENY` ✅
- `X-XSS-Protection: 1; mode=block` ✅
- `X-Content-Type-Options: nosniff` ✅
- `Referrer-Policy: strict-origin-when-cross-origin` ✅

Missing:
- `Content-Security-Policy` — no CSP defined
- `Permissions-Policy` — not set
- `Strict-Transport-Security` (HSTS) — not in netlify.toml (Netlify may add this at CDN layer)

#### Caching (from netlify.toml)
- `/assets/*`: `Cache-Control: public, max-age=31536000, immutable` ✅ (1 year — ideal for content-addressed assets)
- `/*.html`: `Cache-Control: public, max-age=3600` ✅ (1 hour)

**Concern:** Assets use `immutable` caching, which means if an asset filename doesn't change, cached versions will never refresh. This is fine for content-addressed (hashed) filenames but risky for files with static names like `hero-dogs-walk.jpg` or `wig.logo.png` — any update to these files won't be picked up by browsers until the 1-year cache expires.

#### HTTPS/HTTP Redirect
Could not verify live redirect. netlify.toml does not explicitly configure HTTPS forcing — Netlify handles this at the CDN level by default.

#### Google Fonts (External Dependency)
All pages include:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces...&display=swap" rel="stylesheet"/>
```
This is a render-blocking resource from an external domain. Consider self-hosting fonts for better performance and privacy.

#### netlify.toml Proxy Rules (Potential Issues)
```toml
[[redirects]]
  from = "/faqs/*"
  to = "https://wiggleyourtail.com/faqs/:splat"
  status = 200
  force = false
```
This proxy rule points `/faqs/*` back to the live domain. Since `/faqs/index.html` now exists as a local file, this rule is dead code at best and a potential infinite redirect loop at worst (if Netlify's Pretty URL serves `/faqs` from the file while the proxy rule intercepts `/faqs/` subdirectory requests).

Similar risk for `/doggybloggy/*` and `/home-shop/*` — these appear to be legacy WordPress paths.

---

## Action Items — Prioritized Checklist

### 🔴 Quick Wins (< 1 hour each)

- [ ] **Fix 3 near-empty meta descriptions**: Update homepage (`/`), `/best-time-to-walk-your-dog-in-sarasota/`, and `/sarasota-summers-keeping-your-furry-friend-cool-and-happy/` to proper 140-155 character descriptions
- [ ] **Remove broken `/services-rates/` and `/how-it-works/` redirect rules** from netlify.toml (they redirect the canonical URL to a non-canonical variant)
- [ ] **Add H1 to `/how-it-works/`**
- [ ] **Add missing og:url to `/best-time-to-walk-your-dog-in-sarasota/` and `/sarasota-summers-keeping-your-furry-friend-cool-and-happy/`**
- [ ] **Add 5 missing pages to sitemap.xml**: /faqs/, /pricing/, /best-sarasota-neighborhoods-for-dog-owners/, /snowbird-checklist-managing-your-home-and-pets/, /ultimate-sarasota-pet-sitter-guide/
- [ ] **Remove dead proxy rules from netlify.toml**: /faqs/*, /doggybloggy/*, /home-shop/*, /pet-boarding/* (these appear to be legacy WordPress paths no longer needed)

### 🟠 Medium Effort (1 day)

- [ ] **Convert all nav/footer links to absolute paths**: Replace `href="dog-walking.html"` with `href="/dog-walking/"` across all HTML templates to eliminate .html link pollution
- [ ] **Add /dog-sitter-sarasota/ to internal navigation**: Link from homepage, /pet-sitting/, /about/, and all relevant blog posts body content
- [ ] **Trim 16 long page titles to ≤60 characters**: Remove "| Wiggle Your Tail" from blog post titles (already in brand position)
- [ ] **Trim over-long meta descriptions to ≤160 characters**: Affects /about/, /dog-sitter-sarasota/, /dog-trainer-sarasota/, /mastering-dog-training-.../, /services-rates/, /snowbird-checklist-.../
- [ ] **Add LocalBusiness schema to /about/**: Reinforce NAP signals
- [ ] **Add schema to /services-rates/**: ItemList or Service schema
- [ ] **Add schema to /how-it-works/**: HowTo schema
- [ ] **Update /dog-walking/ H1** to include "Sarasota" for keyword relevance
- [ ] **Create /data-deletion/ page** (linked from privacy policy but doesn't exist)
- [ ] **Add /pricing/ to site navigation** (currently only linked from homepage)

### 🟡 Larger Projects (1+ days)

- [ ] **Image optimization project**: 
  - Convert all local images to WebP (target <100KB body images, <200KB heroes)
  - Rename files with spaces using hyphen-separated SEO-friendly names
  - Implement responsive `<picture srcset>` elements
  - Use content-addressed (hashed) filenames to safely use `immutable` caching
- [ ] **Self-host Unsplash images**: Download, compress to WebP, and host locally the stock images used on 8 pages
- [ ] **Self-host Google Fonts**: Download Fraunces and Plus Jakarta Sans, serve from /assets/fonts/
- [ ] **Fix keyword-stuffed alt texts**: Rewrite 5 alt attributes to be descriptive rather than keyword-laden
- [ ] **Internal linking campaign**: Add contextual in-body links from every blog post to its primary service page (not just via nav)
- [ ] **Create /dog-walker-sarasota/ landing page** parallel to /dog-sitter-sarasota/ targeting "dog walker sarasota" keyword
- [ ] **Add FAQPage schema to /dog-walking/ and /pet-sitting/** (both have FAQ sections with actual Q&A content)
- [ ] **Review /faqs/ netlify.toml proxy rule**: Confirm the pass-through to live domain is not causing loops; if /faqs/index.html is the intended source, remove the proxy rule
- [ ] **Add Content-Security-Policy header** to netlify.toml security headers section

