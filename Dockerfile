FROM node:22-slim AS builder

WORKDIR /app

# Install all deps (dev + prod) to build
COPY package.json package-lock.json* ./
RUN npm ci 2>/dev/null || npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production image: Next.js standalone output (official pattern)
FROM node:22-slim

WORKDIR /app

# Copy standalone server + pruned node_modules + .next/
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static .next/static

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
