FROM gcr.io/kaniko-project/executor:latest as kaniko
FROM alpine:latest
RUN apk add --no-cache bash
COPY --from=kaniko /kaniko/executor /kaniko/executor
RUN chmod +x /kaniko/executor
SHELL ["/bin/bash", "-c"]
ENTRYPOINT ["/bin/bash"]
