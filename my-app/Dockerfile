# Use the official Node.js image as the base image (prebuild)
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY library/package.json ./library/
RUN npm install --force 

# Develope image, copy all the files and run next (build & run)
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./

# Next.js collects completely anonymous telemetry data about general usage.
CMD ["npm", "run", "dev"]


