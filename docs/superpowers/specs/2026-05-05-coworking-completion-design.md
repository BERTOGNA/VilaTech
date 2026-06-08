# Design Spec: Vila Tech Hub Coworking Page Completion

**Date:** 2026-05-05  
**Topic:** Coworking Page content expansion and data synchronization with 2026 Catalog.

## 1. Goal
The objective is to meticulously complete all sections of the Coworking page, ensuring 100% data alignment with the "Vila Tech Hub Coworking Catalogo 2026" while removing all internal/sensitive revenue data. The page will present a premium, high-tech interface for freelancers, startups, and content creators.

## 2. Architecture & Data
- **Centralized Data:** `precos.json` will be the single source of truth for all pricing, plans, and benefits.
- **Component-Based UI:** React components will fetch and map data from the JSON, ensuring consistency across cards and the consolidated pricing table.

## 3. Detailed Changes by Section

### 3.1 Data Layer (`precos.json`) [COMPLETE REVISION]
- **Workspaces:**
  - Individual (Anual: R$800)
  - Duplo (Anual: R$1520)
  - Equipe (4 people, Anual: R$2800)
  - Sala Privativa 4p (Anual: R$3000)
- **Espaços On-Demand:**
  - Update Auditório: 50 pax, R$1400 (4h) / R$2300 (8h), including tech support.
  - Update Estúdio Podcast: R$170/h, include "RØDECaster Pro II" and "Video recording".
- **Endereço & Virtual:**
  - Endereço Básico (R$180)
  - Escritório Virtual (R$390) - Includes 8h hot desk + 2h meeting.
  - Virtual Premium (R$580) - Includes 4h meeting + 1h podcast + Reception.
- **Combos (Clube):**
  - Startup Solo (R$950)
  - Time Criativo (R$1650)
  - Empresa Residente (R$3200)
  - Creator Pass (R$690) - 10h hot desk + 8h podcast + 2h meeting.
  - Nômade Digital (R$490) - 20h hot desk + 2h meeting.
  - Departamento Tech (R$5900) - 10 desks + 20h meeting.
- **Programas de Inovação:**
  - Startup Seed (3mo, R$400) - includes 2 fixed desks.
  - Tech Residency (6mo, R$990) - includes 4 fixed desks + investor access.
  - Dev Day Pass (R$120/week).
  - Hackathon Ready (R$3500/day).
  - Alumni Network (R$370) - includes permanent address + 4h meeting.

### 3.2 UI Sections
- **CoworkingHero:** Add tagline "Do posto individual ao ecossistema completo de inovação".
- **Diferentials:** Add specific hardware icons and highlight "1Gbps Fiber" and "24/7 Access (Diamond)".
- **Vila Tech Club:** Clear visual cards for Prata, Ouro, Diamante (30% off) and Fundadores levels.
- **PricingTable:** Implement the consolidated list with a "Club Discount" toggle.
- **FAQ:** Add common questions (Reservations via App, Guest policy, Infrastructure).

## 4. UI/UX Style
- **Color Palette:** Void Black background, Brand Cyan accents, and subtle glassmorphism (white/10% bg).
- **Interactions:** GSAP animations for card entries, smooth Lenis scrolling, and Hover effects on pricing tiers.
- **Typography:** Inter/Outfit for a modern, tech-focused readability.

## 5. Verification Plan
- **Data Integrity:** Verify every price point against Page 10 of the catalog.
- **Responsiveness:** Test on Mobile (Stacked cards) and Desktop (Grid/Table views).
- **Links:** Ensure all anchor links (`#contact`, `#pricing`, etc.) scroll to the correct section.
