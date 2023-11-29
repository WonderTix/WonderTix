#!/bin/bash
# push-npm-cache: Conditionally repackage `node_modules` and send to GCS.

function check_args() {
  local missing=0
  local required=(
    "CACHE"
    "CURRENT"
    "ENV"
    "NPM_CACHE"
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
