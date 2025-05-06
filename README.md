# Manabiko

A book progress tracker application that helps you manage and track your reading progress.

## Features

- Automatic metadata extraction & fetching
- Table of contents extraction
- Multiple color modes in reader
- Reading progress tracking

> **Note:** Compatibility may vary depending on PDF format. Works best with newer, well-formatted PDFs.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker & Docker Compose

### Installation

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

### Database Setup

Initialize and synchronize the database:

```bash
npx prisma generate
npx prisma db push
```

### Start Services

> **Important:** Ensure Docker & Docker Compose are installed and properly configured on your system

Start the required backend services:

```bash
docker-compose up --build
```

This will start:

- **manabiko-api** - PDF processing service
- **postgres:16** - Database server

### Run Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)
