# NightCode

A terminal-based AI coding agent.

## Requirements

- [Bun](https://bun.sh) v1.0+
- PostgreSQL database (e.g. [Neon](https://neon.tech))
- Clerk application (OAuth)
- OpenAI or Anthropic API key
- Polar account (billing/credits)

## Setup

**1. Install dependencies**

```bash
bun install
```

**2. Configure environment**

```bash
cp .env.example .env
```

Fill in `.env`:

```env
API_URL=http://localhost:3000
DATABASE_URL=

OPENAI_API_KEY=
ANTHROPIC_API_KEY=

CLERK_FRONTEND_API=
CLERK_OAUTH_CLIENT_ID=
CLERK_OAUTH_CLIENT_SECRET=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
JWT_SECRET=jwt-secret

POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=
POLAR_SERVER=sandbox
POLAR_CREDITS_METER_ID=
```

**3. Generate Prisma client**

```bash
bun run --cwd packages/database db:generate
```

**4. Push database schema**

```bash
bun run --cwd packages/database db:push
```

## Running

Start the server (terminal 1):

```bash
bun run dev:server
```

Start the CLI (terminal 2):

```bash
bun run dev:cli
```

### Optional: link CLI globally

```bash
bun run link:cli
nightcode
```

## Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install all dependencies |
| `bun run dev:server` | Start API server on `http://localhost:3000` |
| `bun run dev:cli` | Start CLI in watch mode |
| `bun run build:cli` | Build the CLI |
| `bun run link:cli` | Build and link `nightcode` globally |
| `bun run --cwd packages/database db:generate` | Generate Prisma client |
| `bun run --cwd packages/database db:push` | Push schema to database |
