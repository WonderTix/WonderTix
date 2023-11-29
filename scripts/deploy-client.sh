#!/bin/bash
# client.sh: Use `gcloud` to deploy the client to Cloud Run.

function check_args() {
  local missing=0
  local required=(
    "ARTIFACTS"
    "CLIENT_CPU"
    "CLIENT_MEMORY"
    "ENV"
    "REGION"
    "SERVICE_ACCOUNT"
    "SHORT_SHA"
  )

  for arg in "${required[@]}"; do
    if [ -z "${!arg}" ]; then
      echo "Error: Missing required environment variable '$arg'"
      ((missing++))
    fi
  done

  if [ $missing -ne 0 ]; then
    echo "Error: One or more required environment variables are missing."
    exit 1
  fi
}

check_args

# Handle optional args
TAG_ARGS=()
SUFFIX="${SHORT_SHA}"
if [ -n "${TAG}" ]; then
  TAG_ARGS+=(--no-traffic --tag "${TAG}")
  if [ "${TAG}" == "test" ]; then
    SUFFIX="${SUFFIX}-test"
  fi
fi

# Deploy the client
gcloud run deploy "wtix-client-${ENV}" \
  --image "${ARTIFACTS}/client-img-${ENV}:${SHORT_SHA}" \
  --revision-suffix "${SUFFIX}" \
  --region "${REGION}" \
  --platform managed \
  --memory "${CLIENT_MEMORY}" \
  --cpu "${CLIENT_CPU}" \
  --cpu-boost \
  --allow-unauthenticated \
  --min-instances 1 \
  --max-instances 10 \
  --service-account "${SERVICE_ACCOUNT}" \
  --set-env-vars="ENV=${ENV}" \
  --set-secrets="\
  REACT_APP_AUTH0_CLIENT_ID=AUTH0_CLIENT_ID:${ENV},\
  REACT_APP_PUBLIC_STRIPE_KEY=PUBLIC_STRIPE_KEY:${ENV}" \
  "${TAG_ARGS[@]}"

echo "Deployment of wtix-client-${ENV} completed successfully."
