# Candidate Categorization Platform - Frontend


## DEMO URL  https://candidatize.vercel.app/

## Overview

This is the Next.js frontend application for the Candidate Categorization Platform. It provides both admin and candidate interfaces for managing candidate registrations, skill assessments, and tier categorizations.

**Key Technologies:**
- Next.js 16 (React 19)
- React Query (TanStack Query v5) for server state management
- Axios for HTTP requests with interceptors
- Tailwind CSS v4 for styling
- TypeScript for type safety
- shadcn/ui components

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Backend API running on `http://localhost:3000/api/v1`

### Installation & Setup (5 minutes)

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example 

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
\`\`\`

### Environment Configuration

Create `.env` with:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_API_TIMEOUT=10000
\`\`\`


---

## Project Structure

\`\`\`
root/
├── app/
│   ├── layout.tsx                    # Root layout with React Query provider
│   ├── globals.css                   # Tailwind & design tokens
│   ├── login/page.tsx                # Admin login
│   ├── dashboard/page.tsx            # Admin dashboard
│   └── candidate/
│       ├── page.tsx                  # Candidate landing
│       ├── register/page.tsx         # Registration form
│       └── results/page.tsx          # Results display
├── components/
│   ├── dashboard/                    # Dashboard components
│   ├── ui/                           # shadcn/ui components
│   └── theme-provider.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts                 # Axios instance
│   │   ├── hooks.ts                  # React Query hooks
│   │   ├── types.ts                  # TypeScript types
│   │   └── query-client.ts           # React Query config
│   └── utils.ts
├── hooks/
├── public/
└── FRONTEND_README.md
\`\`\`

---

## Available Scripts

\`\`\`bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
\`\`\`

---

## Core Features

### Admin Dashboard (`/login` → `/dashboard`)

- User authentication with JWT
- Real-time statistics and metrics
- Tier distribution visualization
- Skill analytics and trends
- Searchable candidate list with pagination
- Export candidate data (CSV/Excel)
- Responsive dark theme interface

**Login Credentials:**
\`\`\`
Email: admin@example.com
Password: Admin@123
\`\`\`

### Candidate Portal (`/candidate`)

**Landing Page** (`/candidate`)
- Platform overview
- How the tier system works
- Feature highlights
- Call-to-action to register

**Registration** (`/candidate/register`)
- Two-step registration process
  1. Profile Information (name, email, phone, etc.)
  2. Skill Assessment (add skills with proficiency 0-10)
- Form validation with Zod
- Progress tracking
- Email confirmation

**Results** (`/candidate/results`)
- Tier assignment display
- Skill breakdown
- Score visualization
- Next steps recommendations

---

## API Integration

### Axios Configuration

Located in `lib/api/client.ts`:
- Automatic JWT token injection from localStorage
- Request/response interceptors
- Error handling with 401 redirect
- Configurable timeout (default: 10s)

### React Query Hooks

**Authentication:**
\`\`\`typescript
const { mutateAsync: login } = useLogin();
await login({ email, password });
\`\`\`

**Data Fetching:**
\`\`\`typescript
const { data: stats } = useDashboardStats();
const { data: candidates } = useCandidates({ page: 1, search: 'john' });
const { data: candidate } = useCandidate(id);
\`\`\`

**Mutations:**
\`\`\`typescript
const { mutateAsync: addSkill } = useAddSkill();
const { mutateAsync: assess } = useAssessCandidate();
const { mutateAsync: exportData } = useExportCandidates();
\`\`\`

**Caching Strategy:**
- Dashboard stats: 5 minutes stale time
- Candidate list: 1 minute stale time
- Skills: 2 minutes stale time
- Manual refetch on mutations

---

## Authentication Flow

1. Admin visits `/login`
2. Enters email and password
3. Receives JWT token from backend
4. Token stored in localStorage
5. Token automatically injected in all requests
6. 401 response redirects to `/login`
7. On logout, token cleared from localStorage

**Token Format:**
\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

---

## Component Examples

### Using React Query Hooks

\`\`\`typescript
'use client';

import { useCandidates } from '@/lib/api/hooks';

export function CandidatesList() {
  const { data, isLoading, error } = useCandidates({
    page: 1,
    limit: 10,
    search: ''
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.candidates.map(candidate => (
        <div key={candidate.id}>
          <h3>{candidate.name}</h3>
          <p>Tier: {candidate.tier}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### Using Mutations

\`\`\`typescript
'use client';

import { useAddSkill } from '@/lib/api/hooks';

export function AddSkillForm({ candidateId }) {
  const { mutateAsync: addSkill, isPending } = useAddSkill();

  const handleSubmit = async (skillData) => {
    try {
      await addSkill({
        candidate_id: candidateId,
        ...skillData
      });
      // Success - React Query will auto-refetch
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Skill'}
      </button>
    </form>
  );
}
\`\`\`

---

## Styling & Theming

### Design System

**Colors:**
- Primary: Blue (#3B82F6)
- Secondary: Green (#10B981)
- Background: Dark (#0F1419)
- Foreground: White (#FFFFFF)

**Typography:**
- Font Family: Geist (sans-serif)
- Headings: Bold weights
- Body: Regular weight

### Tailwind Classes

\`\`\`tsx
// Semantic tokens
<div className="bg-background text-foreground">
  <button className="bg-primary text-white hover:bg-primary/90">
    Action
  </button>
</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
\`\`\`

---

## Troubleshooting

### "API connection refused"
\`\`\`bash
# Check backend is running
curl http://localhost:3001/api/health

# Verify .env.local has correct URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Restart dev server
npm run dev
\`\`\`

### "CORS error"
Ensure backend has CORS enabled for `http://localhost:3000`

### "Token not persisting"
Check localStorage in DevTools → Application → Local Storage

### "Build fails with TypeScript"
\`\`\`bash
npx tsc --noEmit  # Check errors
npm run build
\`\`\`


---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## Performance Tips

1. Use React Query for all API calls (automatic caching)
2. Lazy load components with dynamic imports
3. Optimize images with Next.js Image component
4. Enable code splitting (automatic)
5. Monitor bundle size with `next/bundle-analyzer`

---

## Development Workflow

\`\`\`bash
# 1. Create new branch
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "feat: description"

# 3. Push and create pull request
git push origin feature/your-feature
\`\`\`

---





## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

