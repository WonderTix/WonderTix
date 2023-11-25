#!/bin/bash
# client.sh: Use `docker` to build the client with necessary args.

function check_args() {
  local missing=0
  local required=(
    "ARTIFACTS"
    "ENV"
    "SHORT_SHA"
    "AUTH0_CLIENT_SECRET"
    "AUTH0_CLIENT_ID"
    "AUTH0_URL"
    "PUBLIC_STRIPE_KEY"
  )

  for arg in "${required[@]}"; do
    if [ -z "${!arg}" ]; then
      echo "Error: Missing required environment variable '$arg'"
      ((missing++))
    fi
  done

  # Use revision URL if deploying with a tag
  if [ -z "${ROOT_URL}" ] && [ -z "${SERVER_REVISION}" ]; then
    echo "Error: At least one of 'ROOT_URL' or 'SERVER_REVISION' must be set."
    ((missing++))
  fi

  if [ $missing -ne 0 ]; then
    echo "Error: One or more required environment variables are missing."
    exit 1
  fi
}

check_args

# Use SERVER_REVISION if no ROOT_URL
URL=${ROOT_URL:-$SERVER_REVISION}

# Pass build arguments to Docker command
# docker build -f client/Dockerfile -t ${ARTIFACTS}/client-img-${ENV}:${SHORT_SHA} client \
#   --build-arg AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET} \
#   --build-arg REACT_APP_API_1_URL=${URL}/api/1 \
#   --build-arg REACT_APP_API_2_URL=${URL}/api/2 \
#   --build-arg REACT_APP_AUTH0_AUDIENCE=${URL} \
#   --build-arg REACT_APP_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} \
#   --build-arg REACT_APP_AUTH0_URL=${AUTH0_URL} \
#   --build-arg REACT_APP_PUBLIC_STRIPE_KEY=${PUBLIC_STRIPE_KEY} \
#   --build-arg REACT_APP_ROOT_URL=${URL}

/kaniko/executor --context=dir://workspace/client \
  --dockerfile=client/Dockerfile \
  --destination=${ARTIFACTS}/client-img-${ENV}:${SHORT_SHA} \
  --cache=true \
  --cache-repo=${KANIKO_CACHE} \
  --build-arg AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET} \
  --build-arg REACT_APP_API_1_URL=${URL}/api/1 \
  --build-arg REACT_APP_API_2_URL=${URL}/api/2 \
  --build-arg REACT_APP_AUTH0_AUDIENCE=${URL} \
  --build-arg REACT_APP_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} \
  --build-arg REACT_APP_AUTH0_URL=${AUTH0_URL} \
  --build-arg REACT_APP_PUBLIC_STRIPE_KEY=${PUBLIC_STRIPE_KEY} \
  --build-arg REACT_APP_ROOT_URL=${URL}
