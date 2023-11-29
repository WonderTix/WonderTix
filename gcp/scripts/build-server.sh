#!/bin/bash
# build-server.sh: Use Kaniko to build the server.

required=(
  "ARTIFACTS"
  "ENV"
  "KANIKO_CACHE"
  "SHORT_SHA"
)
source ${CHECK_ARGS} "${required[@]}"

/kaniko/executor --context=dir://server \
  --dockerfile=server/Dockerfile \
  --destination=${ARTIFACTS}/server-img-${ENV}:${SHORT_SHA} \
  --cache=true \
  --cache-repo=${KANIKO_CACHE}
