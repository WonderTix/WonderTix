#!/bin/bash
# client.sh: Conditionally repackage `node_modules` and cache in GCS.

function check_args() {
  local missing=0
  local required=(
    "CACHE"
    "CURRENT"
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

if ! cmp --silent ${CACHE} ${CURRENT}; then
  echo "Dependencies are up to date."
else
  echo "Dependencies have changed. Repackaging node_modules..."
  if tar czf node_modules.tar.gz node_modules; then
    echo "Sending new tarball to GCS..."
    gsutil cp node_modules.tar.gz gs://wtix-npm-cache/client/node_modules.tar.gz
  else
    echo "Failed to create tarball."
  fi
fi
