# Vercel Deployment Guide with Neon PostgreSQL

This guide walks you through deploying your Manabiko application on Vercel with a Neon PostgreSQL database.

## Set Up Neon PostgreSQL

1. **Create a Neon Account**
   - Go to [Neon](https://neon.tech/) and sign up for an account
   - Neon offers a generous free tier that works well for many applications

2. **Create a New Project**
   - Click "Create Project"
   - Name your project (e.g., "manabiko")
   - Select the region closest to your users
   - Click "Create Project"

3. **Get Your Connection Strings**
   - After project creation, you'll be shown connection details
   - You'll need two connection strings:
     - **Connection string**: Used for pooled connections
     - **Direct connection string**: Used for migrations

## Configure Vercel Project

1. **Link Your GitHub Repository**
   - Go to [Vercel](https://vercel.com/) and create an account if you don't have one
   - Import your GitHub project

2. **Configure Environment Variables**
   - In your Vercel project settings, navigate to "Environment Variables"
   - Add the following variables:
     - `DATABASE_URL`: Your Neon pooled connection string
     - `DIRECT_URL`: Your Neon direct connection string
     - Any other environment variables your application needs

3. **Configure Build Settings**
   - Vercel should automatically detect Next.js and set appropriate build settings
   - The `vercel.json` in your repository provides additional configuration

## Deploy Your Application

1. **Deploy**
   - After configuring your environment variables, deploy your application
   - Vercel will run the build process, which includes:
     - Installing dependencies
     - Running database migrations
     - Building your Next.js application

2. **Verify Database Connection**
   - After deployment, check your application logs to ensure proper database connection
   - Test database functionality in your deployed app

## Database Management

1. **Running Migrations**
   - When you make schema changes, you'll need to run migrations
   - You can use the Neon SQL Editor for direct database access
   - For schema changes, deploy a new version of your app to Vercel

2. **Database Backups**
   - Neon provides automated backup features
   - Configure additional backup policies in your Neon dashboard

## Troubleshooting

If you encounter issues with your database connection:

1. **Check Environment Variables**
   - Verify that `DATABASE_URL` and `DIRECT_URL` are correctly set in Vercel

2. **Check IP Allow List**
   - If you've configured IP restrictions in Neon, ensure Vercel's IP ranges are allowed

3. **Check Logs**
   - Review build logs and runtime logs in Vercel for database connection errors

4. **Connection Pooling**
   - If you experience connection issues, check that you're using the pooled connection string for general app usage
   - Use the direct connection string only for migrations 