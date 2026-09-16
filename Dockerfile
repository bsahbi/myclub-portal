FROM node:22-slim AS builder

WORKDIR /app

# Install all dependencies (dev + prod) to build
COPY package.json package-lock.json* ./
RUN npm ci 2>/dev/null || npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production image: Next.js standalone output (official pattern)
FROM node:22-slim

WORKDIR /app

# Copy the standalone output (self-contained: server.js + pruned node_modules + .next/)
COPY --from=builder /app/.next/standalone ./
# Copy static assets that the standalone server references
COPY --from=builder /app/.next/static .next/static
# Copy public folder if present
COPY --from=builder /app/public ./public 2>/dev/null || true

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
