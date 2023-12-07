#!/bin/bash
# push-npm-cache: Conditionally repackage `node_modules` and send to GCS.

required=(
  "CACHE"
  "CURRENT"
  "ENV"
  "NPM_CACHE"
)
source ${CHECK_ARGS} "${required[@]}"

# Compare cached package.json to current
if ! cmp --silent ${CACHE} ${CURRENT}; then
  echo "Dependencies are up to date."
else
  echo "Dependencies have changed. Repackaging node_modules..."
  if tar czf node_modules.tar.gz node_modules; then
    echo "Sending new tarball to GCS..."
    gsutil cp node_modules.tar.gz ${NPM_CACHE}/client/${ENV}/node_modules.tar.gz
  else
    echo "Failed to create tarball."
  fi
fi
