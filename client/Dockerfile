# Install stage
FROM node:18-alpine AS install
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install --omit=dev

# Build stage
FROM node:18-alpine AS build
WORKDIR /usr/app
COPY --from=install /usr/app/node_modules/ ./node_modules
COPY --from=install /usr/app/package*.json ./
COPY . .

ARG ENV
ARG REACT_APP_API_2_URL
ARG REACT_APP_AUTH0_AUDIENCE
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_URL
ARG REACT_APP_PUBLIC_STRIPE_KEY
ARG REACT_APP_ROOT_URL

ENV REACT_APP_API_2_URL=${REACT_APP_API_2_URL}
ENV REACT_APP_AUTH0_AUDIENCE=${REACT_APP_AUTH0_AUDIENCE}
ENV REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID}
ENV REACT_APP_AUTH0_URL=${REACT_APP_AUTH0_URL}
ENV REACT_APP_PUBLIC_STRIPE_KEY=${REACT_APP_PUBLIC_STRIPE_KEY}
ENV REACT_APP_ROOT_URL=${REACT_APP_ROOT_URL}

RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /usr/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
