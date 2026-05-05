FROM node:20-alpine AS base

# Install pnpm
FROM node:20-alpine AS pnpm
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

# Install deps
FROM pnpm AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# Build
FROM deps AS builder
WORKDIR /app
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./ 

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
