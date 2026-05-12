# NOL Ticket Next.js Template

Clean Next.js rebuild of the live NOL ticket landing UI. The live page remains the visual/UX source of truth; this template keeps assets/data/component structure maintainable while matching the current customer-facing layout.

## Run with Docker on this VPS

```bash
docker run --rm -it -p 3000:3000 -v "$PWD:/app" -w /app node:22-bookworm-slim npm run dev
```

## Build

```bash
docker run --rm -v "$PWD:/app" -w /app node:22-bookworm-slim npm run build
```

## Refresh Assets

```bash
docker run --rm -v "$PWD:/app" -w /app node:22-bookworm-slim npm run assets:download
```

## Structure

- `app/`: Next.js App Router entrypoints.
- `components/TicketLanding.tsx`: page sections and interactions.
- `lib/data/ticket.ts`: editable fixture data.
- `public/assets/`: localized live assets.
- `scripts/download-assets.mjs`: asset manifest/downloader.
