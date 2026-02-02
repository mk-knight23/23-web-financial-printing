# 23 Web Financial Printing

A professional, enterprise-grade bank cheque generation tool built with Angular 21. Transform financial data into pixel-perfect, print-ready documents with real-time SVG rendering.

## 📦 Deployment

### Render (One-Click Deploy)
This repository includes a `render.yaml` blueprint for automated deployment:
1. Visit [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect repository: `mk-knight23/23-web-financial-printing`
4. Render will auto-detect and apply the blueprint configuration

### Manual Deployment
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/bank-cheque-generator`

## Overview
ChequeGen is designed for organizations and individuals who need a precise way to generate cheque drafts. It replaces legacy manual entry tools with a robust reactive system powered by Angular Signals.

## Features Comparison

| Feature | Legacy Version | ChequeGen (v2.0) |
| :--- | :--- | :--- |
| **Tech Stack** | Vanilla JS / Simple React | **Angular 19 + Signals + TypeScript** |
| **Preview** | Static / Low-res | **Live High-Fidelity SVG Preview** |
| **Logic** | Manual Input | **Auto Amount-to-Words Conversion** |
| **Bank Support** | Single Format | **Multi-Bank Template Engine** (SBI, HDFC, etc.) |
| **PDF Export** | Basic Print | **DPI-Optimized PDF Generation** (jsPDF) |
| **UI/UX** | Basic Forms | **Modern Fintech UI** with Dark Mode support |

## Tech Stack
- **Framework:** Angular 21 (Standalone Components, Signals)
- **Styling:** Tailwind CSS v4 (Financial-grade design system)
- **PDF Engine:** jsPDF
- **State Management:** Angular Signals & RxJS

## Project Structure
```text
src/app/
├── core/services/          # Cheque calculation & conversion logic
├── features/generator/     # Reactive forms & SVG preview components
├── types/                  # Strict financial data interfaces
└── styles.css              # Custom Tailwind financial components
```

## Setup & Build Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 10.x or higher

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm start
```

### Production Build
```bash
# Build for production
npm run build
```

## Deployment
The project is configured for static hosting (GitHub Pages / Vercel / Netlify).

---

**License:** MIT
**Created by:** mk-knight23
