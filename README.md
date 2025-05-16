# 📚 Manabiko

A book progress tracker application that helps you manage and track your reading progress.

## ✨ Features

- Automatic metadata extraction & fetching
- Table of contents extraction
- Multiple color modes in reader
- Reading progress tracking

> **Note:** Compatibility may vary depending on PDF format. Works best with newer, well-formatted PDFs.

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker & Docker Compose (for local development)

### 💻 Installation

1. Clone the repository

```bash
git clone https://github.com/Aman-Jangid/manabiko.git
cd manabiko
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

### 🗄️ Database Setup

#### Local Development (with Docker)
Initialize and synchronize the database:

```bash
npx prisma generate
npx prisma db push
```

#### Production (with Neon PostgreSQL)
For production deployments on Vercel, we recommend using Neon PostgreSQL:

1. Create an account on [Neon](https://neon.tech)
2. Create a new project named "manabiko"
3. Get your connection strings from the Neon dashboard
4. Set the following environment variables in your Vercel project:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string with connection pooling
   - `DIRECT_URL`: Your direct Neon PostgreSQL connection string for migrations

5. Deploy your schema:
```bash
npm run db:deploy
```

### 🔌 Start Services

> **Important:** For local development, ensure Docker & Docker Compose are installed

Start the required backend services:

```bash
docker-compose up --build
```

This will start:

- **manabiko-api** - PDF processing service
- **postgres:16** - Database server (local development only)

### 🏃‍♂️ Run Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

🌐 The application will be available at [http://localhost:3000](http://localhost:3000)
