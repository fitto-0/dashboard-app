# AgencyPro Dashboard 🚀

A beautifully designed, professional dashboard for managing agency information and contacts. Built with Next.js 14, React 18, Tailwind CSS, and Clerk authentication.

## ✨ Features

- **🎨 Professional Design**: Beautiful, modern UI with smooth animations and responsive layout
- **🔐 Secure Authentication**: Enterprise-grade security with Clerk authentication
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **📊 Analytics Dashboard**: Track daily usage and view comprehensive statistics
- **👥 Contact Management**: Organized view of agency contacts and information
- **🌐 Agency Database**: Browse and search through agency details
- **⚡ Fast Performance**: Optimized with Next.js 14 and Turbopack
- **🎯 Usage Tracking**: Daily contact view limits with visual progress tracking
- **✨ Smooth Animations**: Framer Motion animations for enhanced UX

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.33
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.6
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Utilities**: clsx, tailwind-merge

## 📋 Project Structure

```
agency-dashboard/
├── app/
│   ├── api/                    # API routes
│   │   ├── contacts/
│   │   ├── usage/
│   │   └── health/
│   ├── dashboard/              # Dashboard routes
│   │   ├── agencies/
│   │   ├── contacts/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/                 # Reusable components
│   ├── DashboardNav.tsx
│   ├── StatsCards.tsx
│   ├── UsageTracker.tsx
│   ├── DataTable.tsx
│   └── LoadingSpinner.tsx
├── lib/
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript definitions
├── data/
│   └── sample.ts              # Sample data
├── public/                     # Static assets
├── tailwind.config.js         # Tailwind configuration
├── next.config.mjs            # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agency-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
   CLERK_SECRET_KEY=your_secret_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Routes

### Public Routes
- `/` - Landing page with feature overview
- `/sign-in` - Sign in page (Clerk)
- `/sign-up` - Sign up page (Clerk)

### Protected Routes (Requires Authentication)
- `/dashboard` - Main dashboard with statistics and overview
- `/dashboard/agencies` - Browse all agencies
- `/dashboard/contacts` - View contact directory

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/contacts` - Fetch all contacts
- `GET /api/usage` - Get user's daily usage stats

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables from `.env.local`
   - Click Deploy

3. **Configure Clerk**
   - Add your Vercel domain to Clerk's allowed origins
   - Update production API keys in Vercel environment variables

## 📱 Responsive Design

The dashboard is built mobile-first and includes:
- Mobile navigation with hamburger menu
- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized typography for all screen sizes

## 🎨 Styling System

### CSS Classes
- `.btn-primary` - Primary call-to-action button
- `.btn-secondary` - Secondary button
- `.card` - Card container with hover effects
- `.gradient-bg` - Gradient background
- `.text-gradient` - Gradient text effect

### Color Palette
- **Primary**: Blue shades for main UI elements
- **Secondary**: Slate/gray for neutral elements
- **Success**: Green for positive states
- **Warning**: Amber for warnings/limits

## ✅ Ready for Production

This dashboard is fully configured and ready to deploy with:
- ✅ TypeScript for type safety
- ✅ Responsive mobile-first design
- ✅ Secure Clerk authentication
- ✅ Performance optimizations
- ✅ Clean component architecture
- ✅ Environment variable management

---

**Made with ❤️ for professional agency management**
