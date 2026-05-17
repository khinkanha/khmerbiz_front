FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build arguments for environment variables
ARG NUXT_PUBLIC_API_BASE
ARG NUXT_PUBLIC_PHOTO_URL

# Set as environment variables during build
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE}
ENV NUXT_PUBLIC_PHOTO_URL=${NUXT_PUBLIC_PHOTO_URL}

RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.output .
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
CMD ["node", "server/index.mjs"]
