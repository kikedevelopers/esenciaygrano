# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences in Ibagué (Tolima, Colombia), in no strict order:

- **Hogares del barrio:** families and home cooks doing their regular shopping who want to buy exactly the quantity they need, from grams to kilos.
- **Cocina saludable:** people on vegan, gluten-free or high-protein diets looking for seeds, nuts, legumes and whole grains, and for advice on what to choose.
- **Negocios:** restaurants, bakeries and small food entrepreneurs buying in volume.

All of them arrive mostly from a phone, often from a Google search or Maps, and decide quickly whether the store has what they need.

## Product Purpose

Esencia & Grano, "La Despensa de la 21", is a bulk-goods store (condimentos, especias, granos, semillas y frutos secos) in the Plaza de la 21. The website is a single landing page whose primary job is to **turn visits into WhatsApp orders** (the visitor writes to order, and the order is delivered or picked up). Being found in local search and driving walk-in visits are secondary outcomes.

Success means: more WhatsApp conversations that start an order.

## Positioning

A neighborhood pantry that sells everything a granel: the customer takes exactly the amount they need, with fresh rotation and personal advice from people who know the products. A supermarket cannot offer the bulk quantities and the advice; a generic online shop cannot offer the neighborhood trust and the physical store in the Plaza de la 21.

## Operating Context

- Orders happen over WhatsApp (+57 301 595 5518); the site links straight to a prefilled chat.
- Physical store: Plaza de la 21, Ibagué, Tolima. Open Monday to Saturday, 8:00 to 20:00.
- Payment: efectivo, transferencia, Nequi.
- **Delivery to the customer's home (domicilios) is offered**, as well as pickup in store.
- Visitors are Spanish-speaking (es-CO); copy uses the informal "tú".

## Capabilities and Constraints

- Static site: SvelteKit + `adapter-static`, deployed to GitHub Pages via `.github/workflows/deploy.yml`, custom domain `esenciaygrano.com` (CNAME).
- There is no catalog, cart, prices or online payment. The website does not take orders itself; WhatsApp does.
- Local SEO is a standing requirement: metadata, JSON-LD (`GroceryStore` + `FAQPage`) and NAP data in `src/routes/+page.svelte` must stay consistent with the visible content.
- **Known content gap:** the current FAQ and JSON-LD say orders are picked up in store only. That conflicts with the confirmed home delivery and must be updated (the exact delivery area and conditions are still undecided).

## Brand Commitments

- Name: **Esencia & Grano**, tagline **"La Despensa de la 21"**.
- The logo (`src/lib/assets/logo.png`, plus the derived WebP files) is the binding brand asset.
- Voice: warm, close, neighborhood-trust; artisan care without luxury pretension.

## Evidence on Hand

- **"+120 productos a granel"**: confirmed by the owner.
- **Real photographs** of the store and products exist but are not in the repository yet; they must be requested from the owner before being used. Until then, do not use stock or AI-generated food photography as if it were the store.
- Home delivery: confirmed (area and conditions not documented).
- **Not confirmed, do not fabricate:** customer reviews or testimonials, ratings, press, supplier names or origins, prices. "100% selección natural" (current hero) has not been verified and should be checked with the owner.

## Product Principles

1. **Every path ends in WhatsApp.** The order conversation is the conversion; every section should make writing to the store easier, never harder.
2. **Truth over polish.** Only claims the owner confirms; a real photo beats a beautiful invented one.
3. **Phone first, local first.** The typical visitor is on a phone in Ibagué, deciding fast; location, hours and contact must be reachable in seconds.
4. **Serve three buyers without splitting the page:** a home cook, a health-conscious shopper and a business owner should each recognize their need.

## Accessibility & Inclusion

WCAG 2.2 AA as the baseline, with `prefers-reduced-motion` and `prefers-reduced-transparency` respected. No product-specific needs beyond that have been established.
