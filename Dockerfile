FROM alpine:3.21

ARG BUILD_DATE
ARG VERSION="v1"

LABEL maintainer="VaronaTech"
LABEL build_version="PicoWebServer version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL org.opencontainers.image.authors="HL Varona <humberto.varona@gmail.com>"
LABEL org.opencontainers.image.description="PicoWebServer"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"

ENV TIMEZONE=UTC

RUN apk add --no-cache \
    busybox-extras \
    curl \
    tzdata \
    && printf "PicoWebServer version: ${VERSION}\nBuild-date: ${BUILD_DATE}" > /build_version \
    && rm -f /etc/nginx/conf.d/stream.conf \
    && rm -rf /var/cache/apk/* /tmp/*


COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www/localhost/htdocs

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -k -s -L -o /dev/null -w "%{http_code}" http://127.0.0.1 | grep -qE "200|301|302|403|404"

ENTRYPOINT ["/start.sh"]

