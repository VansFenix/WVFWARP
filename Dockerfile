FROM node:24-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV DB_PATH=/data/database.sqlite

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/drizzle.config.json ./drizzle.config.json
COPY --from=build /app/node_modules/drizzle-kit ./node_modules/drizzle-kit

EXPOSE 3000
CMD ["sh", "-c", "npx drizzle-kit push && node_modules/.bin/next start"]
