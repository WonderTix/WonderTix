#!/bin/bash
# send-traffic.sh: Use `gcloud` to send traffic to a new revision.

required=(
  "ENV"
  "IMAGE"
  "PERCENTAGE"
  "REGION"
  "SHORT_SHA"
)
source ${CHECK_ARGS} "${required[@]}"
echo "Sending ${PERCENTAGE}% of traffic to new revision..."

gcloud run services update-traffic "wtix-${IMAGE}-${ENV}" \
  --to-revisions="wtix-${IMAGE}-${ENV}-${SHORT_SHA}=${PERCENTAGE}" \
  --region "${REGION}"

echo "Traffic updated."
