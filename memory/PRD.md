# Product Requirements Document (PRD)
## Hussain Murad Shipping Services - Enterprise SaaS Logistics Website

---

## Original Problem Statement
Create a modern enterprise SaaS logistics website with a futuristic AI technology style for **Hussain Murad Shipping Services**, a freight forwarding business located in Dubai, UAE.

### Design Requirements:
- **Style**: Ultra minimal, white background, black typography, subtle cyan-green accents (#00FFD1)
- **Aesthetic**: Apple / Tesla / Palantir inspired, industrial logistics theme
- **Typography**: Modern geometric sans serif, very large hero text (100px+), bold headlines
- **Layout**: Full screen hero, sticky navigation, large storytelling sections, numbered benefits, client logos, testimonials, contact form
- **Motion**: Smooth scrolling, fade-in on scroll, text reveal animations, cinematic transitions
- **Components**: Sharp-cornered buttons, minimal forms, clean UI elements, no heavy shadows

---

## User Personas
1. **Enterprise Logistics Managers** - Looking for advanced freight forwarding solutions with AI automation
2. **Supply Chain Directors** - Seeking reliable partners for global shipping operations
3. **Business Owners** - Need cost-effective and efficient logistics services for their companies

---

## Core Requirements (Static)
1. ✅ Ultra-minimal light theme design (#FFFFFF background with black text)
2. ✅ Futuristic enterprise aesthetic with cyan-green accents (#00FFD1)
3. ✅ Full-screen hero section with large typography (120px)
4. ✅ Sticky navigation with smooth scrolling
5. ✅ Services section with numbered features (01-04)
6. ✅ Technology section highlighting key capabilities
7. ✅ Client logos showcase section
8. ✅ Testimonials from industry leaders
9. ✅ Contact form with name, email, company, message fields
10. ✅ Footer with company info
11. ✅ Scroll-triggered animations and transitions
12. ✅ Responsive design (desktop-first)
13. ✅ Sharp-cornered buttons (border-radius: 0px)
14. ✅ Custom hover states for interactive elements

---

## What's Been Implemented

### Phase 1: Frontend with Mock Data (Completed - Dec 2025)

**Files Created:**
- `/app/frontend/src/pages/Landing.jsx` - Main landing page with all sections
- `/app/frontend/src/components/Navigation.jsx` - Sticky header with smooth scroll navigation
- `/app/frontend/src/data/mockData.js` - Mock data for services, clients, testimonials, stats
- `/app/frontend/src/App.js` - Updated routing to Landing page
- `/app/frontend/src/App.css` - Custom animations and transitions

**Sections Implemented:**
1. ✅ Hero Section - Large headline "The Future of Freight Forwarding" with CTAs and stats
2. ✅ Services Section - 4 numbered service cards (AI Route Optimization, Real-Time Tracking, Automated Customs, Predictive Analytics)
3. ✅ Technology Section - 3 feature highlights with icons
4. ✅ Clients Section - 6 client logo placeholders (EA, DPW, MSK, DHL, ARX, FDX)
5. ✅ Testimonials Section - 3 customer testimonials with quotes
6. ✅ Contact Form Section - Full contact form with name, email, company, message fields
7. ✅ Footer - Company name and location

**Design Implementation:**
- ✅ White background (#FFFFFF) throughout with gray sections (#F9FAFB)
- ✅ Cyan-green accent color (#00FFD1) for CTAs and highlights
- ✅ Black typography with high contrast
- ✅ Sharp-cornered buttons (border-radius: 0px)
- ✅ Large typography (clamp 48px-120px for hero)
- ✅ Smooth scroll animations with IntersectionObserver
- ✅ Hover effects on buttons and cards
- ✅ Custom scrollbar styling
- ✅ Mobile-responsive navigation menu

**Mock Functionality:**
- Contact form shows success toast on submission (frontend only)
- Smooth scroll navigation to sections
- Scroll-triggered fade-in animations
- Interactive hover states

---

## Prioritized Backlog

### P0 Features (Next Phase - Backend Development)
- [ ] Backend API for contact form submission
- [ ] MongoDB schema for contact inquiries
- [ ] Email notification system for form submissions
- [ ] Admin dashboard to view contact submissions
- [ ] Form validation and error handling on backend
- [ ] Rate limiting for contact form

### P1 Features (Future Enhancements)
- [ ] CMS integration for dynamic content management
- [ ] Blog/News section for company updates
- [ ] Case studies section with detailed project examples
- [ ] Live chat integration
- [ ] Multi-language support (Arabic/English)
- [ ] Service request calculator/quote generator
- [ ] Integration with shipping tracking APIs

### P2 Features (Nice-to-Have)
- [ ] 3D Spline animations for enhanced visual appeal
- [ ] Video testimonials
- [ ] Interactive route map visualization
- [ ] Real-time shipping statistics dashboard
- [ ] Customer portal login
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] SEO optimization and meta tags
- [ ] Analytics tracking (Google Analytics)

---

## Next Tasks
1. **User Decision**: Get confirmation to proceed with backend development
2. **Backend Setup**: Create contact form API endpoints
3. **Database Schema**: Design and implement MongoDB models for inquiries
4. **Email Integration**: Set up email service for notifications (SendGrid/Nodemailer)
5. **Frontend-Backend Integration**: Connect contact form to API
6. **Testing**: End-to-end testing of contact form functionality

---

## Technical Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn UI components
- **Backend**: FastAPI, Python
- **Database**: MongoDB (Motor async driver)
- **Deployment**: Emergent Platform
- **Design System**: Custom dark theme with green-dark-theme guidelines

---

## Notes
- All content is currently MOCK data for demo purposes
- Design follows green-dark-theme guidelines with #00FFD1 accent color
- Website is fully responsive and follows Apple/Tesla/Palantir aesthetic
- No external API integrations in Phase 1
