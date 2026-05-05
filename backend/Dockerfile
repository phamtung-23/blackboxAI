FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

# Install deps
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# Build
FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm run build

# Prod
FROM base AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "dist/main.js"]
