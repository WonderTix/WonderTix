#!/bin/bash
# build-client.sh: Use Kaniko to build the client with necessary args.

required=(
  "ARTIFACTS"
  "ENV"
  "SHORT_SHA"
  "AUTH0_CLIENT_ID"
  "AUTH0_URL"
  "PUBLIC_STRIPE_KEY"
)
source ${CHECK_ARGS} "${required[@]}"

if [ -z "${ROOT_URL}" ] && [ -z "${SERVER_REVISION}" ]; then
  echo "Error: At least one of 'ROOT_URL' or 'SERVER_REVISION' must be set."
  exit 1
fi

# Use SERVER_REVISION if no ROOT_URL
URL=${ROOT_URL:-$SERVER_REVISION}

/kaniko/executor --context=dir://client \
  --dockerfile=client/Dockerfile \
  --destination=${ARTIFACTS}/client-img-${ENV}:${SHORT_SHA} \
  --cache=true \
  --cache-repo=${KANIKO_CACHE} \
  --build-arg REACT_APP_API_1_URL=${URL}/api/1 \
  --build-arg REACT_APP_API_2_URL=${URL}/api/2 \
  --build-arg REACT_APP_AUTH0_AUDIENCE=${URL} \
  --build-arg REACT_APP_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} \
  --build-arg REACT_APP_AUTH0_URL=${AUTH0_URL} \
  --build-arg REACT_APP_PUBLIC_STRIPE_KEY=${PUBLIC_STRIPE_KEY} \
  --build-arg REACT_APP_ROOT_URL=${URL}
