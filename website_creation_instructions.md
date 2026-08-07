# Property Landing Page Website Generator Guide

If you want to spin up a matching website for another listing in a different location (e.g., a cabin in the mountains, a villa in Barbados, or a loft in London) using an AI assistant, you can copy-paste the template prompt and structural instructions below.

---

## 1. Master Prompt for Another Conversation

You can feed this prompt directly into another conversation to instruct the AI:

```markdown
I want to create a premium Airbnb listing landing page website for a property named [PROPERTY_NAME] located in [CITY/COUNTRY]. 

Here are the details for the listing:
- Nightly Rate: $[RATE] USD
- Cleaning Fee: $[CLEANING_FEE] USD
- Stats: [GUESTS] Guests, [BEDROOMS] Bedrooms, [BEDS] Beds, [BATHROOMS] Bathrooms
- Key Amenities to highlight: [AMENITY_1], [AMENITY_2], [AMENITY_3], [AMENITY_4]
- Style Vibe: [e.g. Modern Minimalist, Alpine Cozy, Coastal Tropical, Industrial Loft]

Please implement this single-page landing site in the workspace directory using:
1. index.html - Semantic markup with modern responsive sections (Navbar, Hero, Space/Stats, Splitted Feature section, Lightbox Image Gallery, Testimonials Carousel, Inquiry & Live Calculator form, Footer). Add unique ID tags for browser testing.
2. styles.css - Clean CSS using CSS variables to define a beautiful color palette fitting the vibe. Use Outfit and Playfair Display (or equivalent Google Fonts) for modern layout, animations, and transitions.
3. app.js - Vanilla JS script supporting:
   - Hamburger mobile navigation toggles
   - Image gallery click-to-zoom Lightbox (with Escape and Arrow key support)
   - Testimonial review slider auto-rotator
   - Dynamic price estimator showing: Nights x Rate + Cleaning Fee + 12% Resort fee
   - Inquiry form submit animation simulation

Also, generate three realistic showcase images (tobago_exterior.png, tobago_living_room.png, tobago_bedroom.png) matching the description using your image generator tool.
```

---

## 2. Customizable Theme Variables (CSS)

Give the AI this block to specify color themes. Simply swap values based on the location's personality:

```css
:root {
    /* Alpine Cozy (Woodland/Cabin) Vibe */
    --bg-main: #f4f0ea;
    --bg-card: #faf8f5;
    --bg-navbar: rgba(244, 240, 234, 0.85);
    --text-primary: #2a2b25;
    --text-secondary: #4e4f47;
    --accent: #2a443b;          /* Forest Green */
    --accent-hover: #1f332c;
    --accent-light: #e5edea;
    --sandy-gold: #8d7a5f;      
    --font-sans: 'Merriweather', Georgia, serif;
    --font-display: 'Playfair Display', serif;

    /* Coastal Tropical (Beach/Oceanfront) Vibe */
    --bg-main: #f5f8f8;
    --bg-card: #ffffff;
    --bg-navbar: rgba(245, 248, 248, 0.85);
    --text-primary: #1c2b36;
    --text-secondary: #4a5c6a;
    --accent: #008080;          /* Teal Blue */
    --accent-hover: #005a5a;
    --accent-light: #e0f2f1;
    --sandy-gold: #cca43b;      /* Sandy Gold */
    --font-sans: 'Outfit', sans-serif;
    --font-display: 'Playfair Display', serif;
}
```

---

## 3. Recommended Steps for the AI Developer

For the next AI session, tell the agent to build the project in this sequence:
1. **Foundation & Assets**: Generate three photorealistic image assets representing the exterior, living room, and bedroom of the property first.
2. **HTML Layout**: Scaffold the page semantics inside `index.html`. Add date widgets with native `date` type inputs.
3. **Responsive CSS**: Implement grid layouts, responsive navigation media queries, hover effects, and CSS variable styling.
4. **Interactive Logic**: Program the calculator pricing algorithm inside `app.js` using `document.getElementById` hooks. Make sure calculations check if dates are valid before computing.
