# AffiliateHub - Digital & Affiliate Marketing Website

## Problem Statement
Build a full-fledged web app for digital and affiliate marketing products with product cards (links open in new tabs), contact form with SendGrid email integration, dark/light theme toggle, hero banner, about section, and footer with social links.

## Architecture
- **Frontend**: React (CRA) + Tailwind CSS + Shadcn/UI components
- **Backend**: FastAPI + MongoDB + SendGrid
- **Design System**: "Performance Pro" - Oswald/Inter/JetBrains Mono fonts, Acid Green (#D4FF00) accent, sharp edges, dark-first

## User Personas
- Digital marketers seeking premium tools
- Affiliate marketers looking for vetted product recommendations
- Potential customers evaluating marketing products

## Core Requirements
- [x] Hero/banner section with bold typography and stats
- [x] Product cards (6 products) with ratings, prices, category badges, external links (target=_blank)
- [x] About Us section with brand story and values grid
- [x] Contact form with SendGrid email integration (backend validation, MongoDB storage)
- [x] Dark/Light theme toggle via dropdown menu
- [x] Footer with social links (Twitter, LinkedIn, YouTube, Instagram)
- [x] Responsive design with mobile navigation menu
- [x] Scroll-triggered entrance animations (IntersectionObserver)

## What's Been Implemented (Feb 2026)
- Full single-page marketing site with 5 sections
- FastAPI backend with /api/contact (POST), /api/health (GET), /api/contacts (GET)
- SendGrid email integration (configured with dummy key)
- MongoDB storage for contact submissions
- Dark/Light/System theme toggle using next-themes
- Pydantic validation (EmailStr, min_length)
- Bento grid product layout with featured cards spanning 2 columns
- Custom design system: Oswald headings, Inter body, JetBrains Mono for stats

## Prioritized Backlog
### P0 (Critical)
- Replace SendGrid dummy API key with real key for email delivery

### P1 (High)
- Admin panel for managing products (CRUD from MongoDB instead of static)
- SEO meta tags and Open Graph for social sharing

### P2 (Nice to have)
- Blog/content section
- Newsletter subscription
- Product search/filter by category
- Testimonials carousel
- Analytics integration

## Next Tasks
1. User needs to provide real SendGrid API key + verified sender email
2. Add admin panel for dynamic product management
3. Implement SEO meta tags for each section
