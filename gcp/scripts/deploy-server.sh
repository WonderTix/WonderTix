#!/bin/bash
# deploy-server.sh: Use `gcloud` to deploy the server to Cloud Run.

required=(
  "ARTIFACTS"
  "AUTH0_URL"
  "ENV"
  "REGION"
  "SERVER_CPU"
  "SERVER_MEMORY"
  "SERVICE_ACCOUNT"
  "SHORT_SHA"
  "SHOULD_SEED"
  "SQL_INSTANCE"
)
source ${CHECK_ARGS} "${required[@]}"

# Use revision URL if deploying with a tag
if [ -z "${ROOT_URL}" ] && [ -z "${SERVER_REVISION}" ]; then
  echo "Error: At least one of 'ROOT_URL' or 'SERVER_REVISION' must be set."
  exit 1
fi

# Use revision URL if deploying with a tag
if [ -z "${FRONTEND_URL}" ] && [ -z "${CLIENT_REVISION}" ]; then
  echo "Error: At least one of 'FRONTEND_URL' or 'CLIENT_REVISION' must be set."
  exit 1
fi

# Use second value if first is not set
ROOT_URL=${ROOT_URL:-$SERVER_REVISION}
FRONTEND_URL=${FRONTEND_URL:-$CLIENT_REVISION}

# Handle optional args for test revisions
TAG_ARGS=()
SUFFIX="${SHORT_SHA}"
STRIPE_WEBHOOK="PRIVATE_STRIPE_WEBHOOK"

if [ -n "${TAG}" ]; then
  TAG_ARGS+=(--no-traffic --tag "${TAG}")
  if [ "${TAG}" == "test" ]; then
    SUFFIX="${SUFFIX}-test"
    STRIPE_WEBHOOK="TEST_STRIPE_WEBHOOK"
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
  ROOT_URL=${ROOT_URL},\
  SHOULD_SEED=${SHOULD_SEED}" \
  --set-secrets="\
  DATABASE_URL=DATABASE_URL:${ENV},\
  DB_DATABASE=DB_DATABASE:${ENV},\
  DB_HOST=DB_HOST:${ENV},\
  DB_PASSWORD=DB_PASSWORD:${ENV},\
  DB_PORT=DB_PORT:${ENV},\
  DB_USER=DB_USER:${ENV},\
  GCLOUD_KEY=GCLOUD_KEY:${ENV},\
  GCLOUD_BUCKET=GCLOUD_BUCKET:${ENV},\
  PRIVATE_STRIPE_KEY=PRIVATE_STRIPE_KEY:${ENV},\
  PRIVATE_STRIPE_WEBHOOK=${STRIPE_WEBHOOK}:${ENV}" \
  "${TAG_ARGS[@]}"

echo "Deployment of wtix-server-${ENV} completed successfully."
