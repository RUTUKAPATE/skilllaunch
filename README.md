# SkillLaunch - AI Career Guide

## Overview

**SkillLaunch** is an AI-driven career guide built using **Next.js** and **React**. It provides users with career insights, interview preparation tools, AI-powered resume building, and interactive onboarding experiences. This project showcases advanced full-stack development skills, making it a strong addition to any developer's portfolio.

## Features

- **User Authentication**: Secure login and sign-up with Clerk Authentication.
- **AI-Powered Insights**: Leverages the Gemini API to provide AI-generated industry insights.
- **Interview Preparation**: Generates mock interview questions and evaluates performance stats.
- **Resume Builder**: Allows users to create and download markdown-based resumes as PDFs.
- **Database Management**: Utilizes NeonDB with Prisma for efficient data storage.
- **Task Automation**: Integrates Inngest for scheduled functions like weekly insights.
- **Modern UI Components**: Built with Tailwind CSS and Shadcn UI for a sleek design.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: NeonDB
- **Authentication**: Clerk
- **AI Integration**: Gemini API
- **Task Automation**: Inngest
- **Deployment**: Vercel

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm / yarn / pnpm

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/fullstack-skilllaunch.git
   cd fullstack-skilllaunch
   ```

2. **Install dependencies:**
   ```sh
   npm install  # or yarn install or pnpm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the necessary API keys and database connection strings.

4. **Run the development server:**
   ```sh
   npm run dev  # or yarn dev or pnpm dev
   ```

5. Open **http://localhost:3000** in your browser to view the app.

## Project Structure

The project follows a well-organized directory structure:

```
SKILLLAUNCH
│── .next/
│── actions/
│── app/
│── components/
│── data/
│── hooks/
│── lib/
│── node_modules/
│── prisma/
│── public/
│── .env
│── .gitignore
│── components.json
│── eslint.config.mjs
│── jsconfig.json
│── middleware.js
│── next.config.mjs
│── package-lock.json
│── package.json
│── postcss.config.mjs
│── README.md
```

## Deployment

This project can be deployed on **Vercel**:

1. Push your code to **GitHub**.
2. Link the repository to **Vercel**.
3. Configure environment variables on **Vercel**.
4. Deploy with a single click.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.
