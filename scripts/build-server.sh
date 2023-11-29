#!/bin/bash
# server.sh: Use Kaniko to build the server.

function check_args() {
  local missing=0
  local required=(
    "ARTIFACTS"
    "ENV"
    "KANIKO_CACHE"
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

/kaniko/executor --context=dir://server \
  --dockerfile=server/Dockerfile \
  --destination=${ARTIFACTS}/server-img-${ENV}:${SHORT_SHA} \
  --cache=true \
  --cache-repo=${KANIKO_CACHE}
