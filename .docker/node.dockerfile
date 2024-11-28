FROM node:18-alpine AS install
WORKDIR /usr/app
COPY ../ .
RUN npm ci --no-progress --quiet && npm prune

FROM install AS build
RUN npm run prod:build && npm prune --production

FROM node:18-alpine AS production
WORKDIR /usr/app
COPY --chown=node:node --from=build /usr/app/package.json /usr/app/package-lock.json ./
COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist
ENV NODE_ENV=production
RUN npm prune --production
RUN chmod 750 /usr/app
RUN echo "node" > /etc/group && echo "node" > /etc/sudoers

EXPOSE 8080

CMD [ "npm", "run", "prod:start-no-bundle" ]