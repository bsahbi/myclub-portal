FROM node:22-slim

WORKDIR /app

# Install serve for previewing the built static output
RUN npm install -g serve

COPY package.json package.json bun.lock* ./
COPY prisma/ prisma/

# Install deps (npm works fine with the bun.lock present)
RUN npm install --no-audit --no-fund

COPY . .

# Build the SPA
RUN npm run build

# Serve the dist/ on port 3000
EXPOSE 3000
CMD ["serve", "dist", "-l", "3000", "--single"]
