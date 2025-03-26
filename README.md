# Brilliant Esystems Website

A modern, responsive website built with Next.js 14, Tailwind CSS, and Supabase. Features a blog system, portfolio showcase, and contact form.

## Features

- 🎨 Modern UI with Tailwind CSS and Shadcn/ui
- 📱 Fully responsive design
- 📝 Blog system with Supabase backend
- 🔐 Authentication and protected routes
- 📊 Portfolio showcase
- 📬 Contact form
- 🌙 Dark/Light mode
- 🎯 SEO optimized

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Database:** Supabase
- **Authentication:** Supabase Auth
- **Icons:** Lucide Icons
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BRILLIANT-ESYSTEMS-LIMITED/brilliant-esystem-web.git
cd brilliant-esystem-web
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
- Go to your Supabase project
- Run the SQL migrations in `supabase/migrations/`

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
├── app/                  # Next.js app router pages
├── components/          # Reusable components
│   ├── ui/             # UI components from shadcn/ui
│   └── ...             # Other components
├── lib/                # Utility functions and configurations
├── public/             # Static assets
├── styles/            # Global styles
└── supabase/          # Supabase configurations and migrations
```

## Features in Detail

### Blog System
- Create, edit, and publish blog posts
- Rich text editing
- Image uploads
- Categories and tags
- Author profiles

### Portfolio
- Project showcase
- Project details pages
- Categories filter
- Image gallery

### Authentication
- Email/password login
- Protected admin routes
- User roles and permissions

### Contact Form
- Form validation
- Email notifications
- Spam protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by Brilliant Esystems Limited.

## Contact

Brilliant Esystems Limited - admin@brilliant.ng

Project Link: [https://github.com/BRILLIANT-ESYSTEMS-LIMITED/brilliant-esystem-web](https://github.com/BRILLIANT-ESYSTEMS-LIMITED/brilliant-esystem-web) 