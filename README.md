# Stellar Portfolio (local run)

Quick steps to run the project locally.

Prerequisites:
- Node 18+ or Bun (recommended to match your environment)
- Git

Install dependencies (choose one):

```bash
# npm
npm install

# or pnpm
pnpm install

# or bun
bun install
```

Run dev server:

```bash
# npm
npm run start

# or pnpm
pnpm start

# or bun
bun run start
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
# after `npm run build`
npm run preview
```

Vercel notes:
- If deploying to Vercel, set the **Output Directory** for your project to `dist` or `dist/client` depending on your project settings. This repo writes `dist/client/index.html` and also creates `dist/index.html` for compatibility.

If you run into issues, share the terminal output and I'll help diagnose further.
