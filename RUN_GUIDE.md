# NightCode Setup and Execution Guide

This guide provides instructions on how to run **NightCode** locally, configure environment variables, and use your **OpenAI API Key**.

---

## 1. Prerequisites

Before running NightCode, ensure you have:

- **Bun** installed (v1.0+). You can verify with `bun --version`.
- **PostgreSQL Database** (e.g. local Postgres or Neon DB instance).
- **OpenAI API Key**, **Anthropic API Key**, or **Google Generative AI API Key**.
- **Clerk Application** (for OAuth CLI authentication).
- **Polar Account** (for usage credit metering, if enabled).

---

## 2. Environment Setup

NightCode uses a `.env` file at the root of the project to manage API keys and service configurations.

If `.env` does not exist, copy `.env.example`:

```bash
cp .env.example .env
```

### Configuring OpenAI & Gemini API Keys

Yes! You **can** use an OpenAI API key or a Google Gemini API Key. Add your keys to `.env`:

```env
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
```

NightCode natively supports OpenAI and Google Gemini models (defined in [`packages/shared/src/models.ts`](file:///c:/Users/zeus/projects/nightcode/packages/shared/src/models.ts)), including:
- `gpt-5.4`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `gemini-1.5-pro`
- `gemini-1.5-flash`

### Environment Variables Summary

```env
# Server URL
API_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nightcode"

# AI Provider Keys
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...

# Auth (Clerk)
CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_OAUTH_CLIENT_ID=your-client-id
CLERK_OAUTH_CLIENT_SECRET=your-client-secret
CLERK_PUBLISHABLE_KEY=your-pub-key
CLERK_SECRET_KEY=your-secret-key
JWT_SECRET=jwt-secret

# Billing (Polar)
POLAR_ACCESS_TOKEN=your-polar-token
POLAR_PRODUCT_ID=your-product-id
POLAR_SERVER=sandbox
POLAR_CREDITS_METER_ID=your-meter-id
```

---

## 3. Database Setup

Generate the Prisma database client:

```bash
bun run --cwd packages/database db:generate
```

Push or migrate your database schema:

```bash
bun run --cwd packages/database db:push
# or npx prisma db push --schema=packages/database/prisma/schema.prisma
```

---

## 4. Running NightCode

NightCode consists of a **Hono API Server** and an **OpenTUI React CLI**.

### Step 1: Start the Backend Server

In your first terminal, run:

```bash
bun run dev:server
```
*The server will start on `http://localhost:3000` with hot-reloading.*

### Step 2: Start the CLI Client

In a second terminal, run:

```bash
bun run dev:cli
```
*This starts the interactive terminal UI with live reloads.*

### Optional: Build & Link CLI Globally

To build and link the CLI as a binary so you can type `nightcode` anywhere:

```bash
bun run link:cli
nightcode
```

---

## 5. Summary of Common Commands

| Command | Action |
|---|---|
| `bun install` | Install all workspace dependencies |
| `bun run dev:server` | Start the API server on `http://localhost:3000` |
| `bun run dev:cli` | Start the interactive CLI in watch mode |
| `bun run build:cli` | Build the CLI package |
| `bun run link:cli` | Build and link `nightcode` globally |
| `bun run --cwd packages/database db:generate` | Generate Prisma client |

