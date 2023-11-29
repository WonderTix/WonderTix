#!/bin/bash
# update-traffic.sh: Use `gcloud` to send traffic to a new revision.

function check_args() {
  local missing=0
  local required=(
    "ENV"
    "IMAGE"
    "PERCENTAGE"
    "REGION"
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
echo "Sending ${PERCENTAGE}% of traffic to new revision..."

gcloud run services update-traffic "wtix-${IMAGE}-${ENV}" \
  --to-revisions="wtix-${IMAGE}-${ENV}-${SHORT_SHA}=${PERCENTAGE}" \
  --region "${REGION}"

echo "Traffic updated."
