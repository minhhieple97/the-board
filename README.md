# The Board - A Jira-like Project Management Tool

A full-stack project management application built with Next.js 14, Hono.js, and Appwrite.

## Features

- 🏢 Workspaces Management
- 📊 Projects & Epics
- ✅ Tasks & Kanban Boards
- 📅 Calendar View
- ✉️ Invite System
- 🔒 Authentication (OAuth & Email)
- 👥 Role-based Access Control
- 🖼️ Image Upload Support
- 📱 Responsive Design
- 📈 Analytics Dashboard

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **API**: Hono.js
- **Backend**: Appwrite
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form, Zod
- **Authentication**: Appwrite Auth

## Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Appwrite Cloud Account or Self-hosted Instance

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/minhhieple97/the-board.git
cd the-board
```

2. Install dependencies:
```bash
npm install
```

3. Create an Appwrite project:
   - Sign up for [Appwrite Cloud](https://cloud.appwrite.io)
   - Create a new project
   - Create a new API key with all permissions
   - Create the following collections in your database:
     - Workspaces
     - Members

4. Configure environment variables:
   - Copy `env.local.example` to `.env.local`
   - Update the following variables:

```bash
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Appwrite Configuration
NEXT_APPWRITE_KEY=your_appwrite_api_key_here
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id_here

# Appwrite Database Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=your_workspaces_collection_id_here
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=your_members_collection_id_here

# Appwrite Storage Configuration
NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Appwrite Setup Guide

1. Create Collections:
   - Create a new database
   - Create collections for:
     - Workspaces
     - Members
     - Projects
     - Tasks

2. Configure Collection Permissions:
   - Enable read/write access for authenticated users
   - Set up appropriate indexes for queries

3. Create Storage Bucket:
   - Create a new storage bucket for file uploads
   - Configure CORS and file size limits
   - Set appropriate permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
