# NightCode

A terminal-based AI coding agent.

## Requirements

- [Bun](https://bun.sh) v1.0+
- [Ollama](https://ollama.com) installed and running locally (`ollama serve`)
- At least one **tool-calling capable** chat model pulled, e.g. `ollama pull llama3.2`

The database is a local SQLite file — no separate database server needed.

> **Model note:** NightCode is agentic and depends on structured tool calling
> (reading/writing files, running commands). Only use models that support the
> "Tools" capability (see https://ollama.com/search?c=tools). Models without it
> — including `qwen2.5-coder` — will print tool calls as plain JSON text
> instead of executing them, so no files get created.

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

# SQLite database file (relative paths are resolved from packages/database)
DATABASE_URL=file:./dev.db

# Optional: override if Ollama runs on another host/port
# OLLAMA_BASE_URL=http://localhost:11434
```

The default models are defined in `packages/shared/src/models.ts`. Make sure
you've pulled the ones you want to use, for example:

```bash
ollama pull llama3.2
ollama pull llama3.1
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
