#!/bin/bash
# client.sh: Use `gcloud` to gradually shift traffic to a new client revision.

function check_args() {
  local missing=0
  local required=(
    "ENV"
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

function update_traffic() {
  local PERCENTAGE=${1}
  echo "Sending ${PERCENTAGE}% of traffic to new revision..."
  gcloud run services update-traffic "wtix-client-${ENV}" \
    --region "${REGION}" \
    --to-revisions="wtix-client-${ENV}-${SHORT_SHA}=${PERCENTAGE}"
}

check_args
update_traffic 5 && sleep 30

# Remove tag if one exists
if [ -n "${TAG}" ]; then
  gcloud run services update-traffic "wtix-client-${ENV}" \
  --region "${REGION}" \
  --remove-tags "${TAG}" && sleep 30
fi

update_traffic 25 && sleep 30
update_traffic 50 && sleep 30
update_traffic 100 && sleep 30
