FROM node:22-alpine
WORKDIR /app
COPY .output .
RUN cd server && npm install --omit=dev
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
CMD ["node", "server/index.mjs"]
