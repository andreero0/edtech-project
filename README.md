# EdTech Project - Nigerian AI Education Platform

A modern React landing page for an AI-powered educational platform targeting Nigerian high schools. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd edtech-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to: `http://localhost:8080`
   - The app will automatically reload when you make changes

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Check code quality

## 📁 Project Structure

```
edtech-project/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Hero.tsx         # 🎯 MAIN HERO SECTION (edit main headlines here)
│   │   ├── ValueProposition.tsx  # 🎯 BENEFITS SECTION (edit value props here)
│   │   ├── InfoSession.tsx  # 🎯 SESSION INFO (edit session details here)
│   │   ├── Credibility.tsx  # 🎯 TESTIMONIALS (edit social proof here)
│   │   ├── RegistrationForm.tsx # 🎯 SIGNUP FORM (edit form fields here)
│   │   ├── FAQ.tsx          # 🎯 FAQ SECTION (edit questions/answers here)
│   │   ├── Footer.tsx       # 🎯 FOOTER (edit contact info here)
│   │   ├── AnimatedWord.tsx # Animation component (don't edit)
│   │   ├── ShaderBackground.tsx # Background effects (don't edit)
│   │   └── ui/              # Shadcn UI components (don't edit)
│   ├── pages/
│   │   ├── Index.tsx        # 🎯 MAIN PAGE LAYOUT (controls page structure)
│   │   ├── AdminDashboard.tsx # Admin panel (don't edit)
│   │   ├── AdminLogin.tsx   # Admin login (don't edit)
│   │   └── NotFound.tsx     # 404 page (don't edit)
│   ├── hooks/               # Custom React hooks (don't edit)
│   ├── integrations/        # Supabase integration (don't edit)
│   ├── lib/                 # Utility functions (don't edit)
│   ├── utils/               # Helper functions (don't edit)
│   ├── index.css           # 🎯 GLOBAL STYLES (edit colors/fonts here)
│   └── main.tsx            # App entry point (don't edit)
├── public/                  # Static assets
│   ├── favicon.ico         # 🎯 WEBSITE ICON (replace with your icon)
│   └── placeholder.svg     # 🎯 PLACEHOLDER IMAGE (replace if needed)
├── supabase/               # Database configuration (don't edit)
├── package.json            # Dependencies (don't edit unless adding packages)
└── README.md              # This file
```

## 🎨 How to Edit Content

### 1. Main Headlines & Hero Text
**File:** `src/components/Hero.tsx`

Look for these sections to edit:
```tsx
// Subtitle text
<h2 className="text-xs md:text-sm font-mono font-light text-blue-300 uppercase tracking-[0.3em] opacity-80">
  <AnimatedWord delay={0}>Transform</AnimatedWord>
  <AnimatedWord delay={200}>Nigerian</AnimatedWord>
  <AnimatedWord delay={400}>Education</AnimatedWord>
  <AnimatedWord delay={600}>Forever</AnimatedWord>
</h2>

// Main headline
<h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight text-white text-glow mb-8">
  <div className="mb-6">
    <AnimatedWord delay={800}>Unlocking</AnimatedWord>
    <AnimatedWord delay={950}>Educational</AnimatedWord>
    <AnimatedWord delay={1100}>Excellence</AnimatedWord>
  </div>
  // ... more headline text
</h1>

// Description text
<p className="text-lg md:text-xl text-blue-200 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
  <AnimatedWord delay={2450}>Join</AnimatedWord>
  <AnimatedWord delay={2600}>Nigerian</AnimatedWord>
  // ... edit the words here
</p>
```

### 2. Value Propositions/Benefits
**File:** `src/components/ValueProposition.tsx`

Edit the benefit cards and descriptions in this component.

### 3. Session Information
**File:** `src/components/InfoSession.tsx`

Edit session details, dates, times, and what attendees will learn.

### 4. FAQ Questions & Answers
**File:** `src/components/FAQ.tsx`

Add, remove, or modify frequently asked questions and their answers.

### 5. Contact Information
**File:** `src/components/Footer.tsx`

Edit social media links, contact details, and footer text.

### 6. Colors & Styling
**File:** `src/index.css`

Edit the CSS custom properties at the top of the file:
```css
:root {
  --background: 0 0% 0%;           /* Main background color */
  --foreground: 0 0% 100%;         /* Main text color */
  --primary: 214 100% 69%;         /* Primary blue color */
  --accent: 214 100% 69%;          /* Accent color */
  /* ... more color variables */
}
```

### 7. Registration Form Fields
**File:** `src/components/RegistrationForm.tsx`

Modify form fields, validation rules, and submission handling.

## 🎯 Common Editing Tasks

### Change the Main Headline
1. Open `src/components/Hero.tsx`
2. Find the `<h1>` section around line 55
3. Replace the `<AnimatedWord>` content with your new text
4. Keep the `delay` values for smooth animation

### Update Value Propositions
1. Open `src/components/ValueProposition.tsx`
2. Find the benefit cards
3. Edit the titles, descriptions, and icons

### Modify FAQ Content
1. Open `src/components/FAQ.tsx`
2. Find the FAQ data array
3. Add/remove/edit questions and answers

### Change Colors
1. Open `src/index.css`
2. Modify the CSS custom properties in the `:root` section
3. Use HSL color format: `hue saturation% lightness%`

## 🔧 Technical Details

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Shadcn/ui component library
- **Database:** Supabase (PostgreSQL)
- **Build Tool:** Vite
- **Deployment:** Ready for Vercel, Netlify, or similar platforms

## 🚨 Important Notes

- The app runs on port **8080** (not the default 5173)
- Always test your changes by running `npm run dev`
- Don't edit files in the `ui/` folder - these are pre-built components
- Keep the `<AnimatedWord>` wrapper for text animations
- The registration form connects to a Supabase database
- **All third-party branding has been removed** - the project is now fully proprietary

## 🐛 Troubleshooting

### Port Issues
If you see "port already in use" errors:
```bash
# Kill any process using port 8080
lsof -ti:8080 | xargs kill -9
npm run dev
```

### CSS Import Warnings
The CSS import order has been fixed. If you see warnings about `@import`, make sure Google Fonts import is at the top of `src/index.css`.

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Need Help?

- Check the browser console for error messages
- Ensure all file paths are correct when making changes
- Test changes immediately after editing
- Use the browser's developer tools to inspect elements

---

**Happy editing! 🎉** Remember to save your files and the browser will automatically reload to show your changes.
