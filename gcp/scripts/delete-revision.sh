#!/bin/bash
# delete-revision.sh: Use `gcloud` to delete a Cloud Run revision.

function check_args() {
  local missing=0
  local required=(
    "ENV"
    "IMAGE"
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

# Handle optional argument (ie. for test revisions)
if [ -n "${SUFFIX}" ]; then
  SHORT_SHA=${SHORT_SHA}-${SUFFIX}
fi

echo "Deleting revision..."

gcloud run revisions delete wtix-${IMAGE}-${ENV}-${SHORT_SHA} \
--region ${REGION} \
--quiet

echo "Revision deleted."
