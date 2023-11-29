#!/bin/bash
# delete-revision.sh: Use `gcloud` to delete a Cloud Run revision.

required=(
  "ENV"
  "IMAGE"
  "REGION"
  "SHORT_SHA"
)
source ${CHECK_ARGS} "${required[@]}"

# Handle optional argument (ie. for test revisions)
if [ -n "${SUFFIX}" ]; then
  SHORT_SHA=${SHORT_SHA}-${SUFFIX}
fi

echo "Deleting revision..."

gcloud run revisions delete wtix-${IMAGE}-${ENV}-${SHORT_SHA} \
--region ${REGION} \
--quiet

echo "Revision deleted."
