#!/bin/bash
# server.sh: Use `gcloud` to deploy the server to Cloud Run.

function check_args() {
  local missing=0
  local required=(
    "ARTIFACTS"
    "AUTH0_URL"
    "ENV"
    "REGION"
    "SERVER_CPU"
    "SERVER_MEMORY"
    "SERVICE_ACCOUNT"
    "SHORT_SHA"
    "SQL_INSTANCE"
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

  # Use revision URL if deploying with a tag
  if [ -z "${FRONTEND_URL}" ] && [ -z "${CLIENT_REVISION}" ]; then
    echo "Error: At least one of 'FRONTEND_URL' or 'CLIENT_REVISION' must be set."
    ((missing++))
  fi

  if [ $missing -ne 0 ]; then
    echo "Error: One or more required environment variables are missing."
    exit 1
  fi
}

check_args

ROOT_URL=${ROOT_URL:-$SERVER_REVISION}          # use SERVER_REVISION if no ROOT_URL
FRONTEND_URL=${FRONTEND_URL:-$CLIENT_REVISION}  # use CLIENT_REVISION if no FRONTEND_URL

# Handle optional args
TAG_ARGS=()
SUFFIX="${SHORT_SHA}"
if [ -n "${TAG}" ]; then
  TAG_ARGS+=(--no-traffic --tag "${TAG}")
  if [ "${TAG}" == "test" ]; then
    SUFFIX="${SUFFIX}-test"
  fi
fi

# Deploy the server
gcloud run deploy "wtix-server-${ENV}" \
  --image "${ARTIFACTS}/server-img-${ENV}:${SHORT_SHA}" \
  --revision-suffix "${SUFFIX}" \
  --region "${REGION}" \
  --platform managed \
  --memory "${SERVER_MEMORY}" \
  --cpu "${SERVER_CPU}" \
  --cpu-boost \
  --allow-unauthenticated \
  --min-instances 1 \
  --max-instances 10 \
  --set-cloudsql-instances "${SQL_INSTANCE}" \
  --service-account "${SERVICE_ACCOUNT}" \
  --set-env-vars="\
  AUTH0_AUDIENCE=${ROOT_URL},\
  AUTH0_URL=${AUTH0_URL},\
  ENV=${ENV},\
  FRONTEND_URL=${FRONTEND_URL},\
  ROOT_URL=${ROOT_URL}" \
  --set-secrets="\
  AUTH0_CLIENT_SECRET=AUTH0_CLIENT_SECRET:${ENV},\
  DATABASE_URL=DATABASE_URL:${ENV},\
  DB_DATABASE=DB_DATABASE:${ENV},\
  DB_HOST=DB_HOST:${ENV},\
  DB_PASSWORD=DB_PASSWORD:${ENV},\
  DB_PORT=DB_PORT:${ENV},\
  DB_USER=DB_USER:${ENV},\
  PRIVATE_STRIPE_KEY=PRIVATE_STRIPE_KEY:${ENV},\
  PRIVATE_STRIPE_WEBHOOK=PRIVATE_STRIPE_WEBHOOK:${ENV}" \
  "${TAG_ARGS[@]}"

echo "Deployment of wtix-server-${ENV} completed successfully."
