#!/bin/sh

set -e

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] $1"; }
success() { echo "$(date '+%Y-%m-%d %H:%M:%S') [SUCCESS] $1"; }
warn() { echo "$(date '+%Y-%m-%d %H:%M:%S') [WARNING] $1"; }

log "Starting container initialization..."
log "PicoWebServer version: $(cat /build_version 2>/dev/null || echo 'unknown')"
log "httpd document root: /var/www/localhost/htdocs"

if [ -n "$TIMEZONE" ] && [ -f "/usr/share/zoneinfo/$TIMEZONE" ]; then
    ln -sf "/usr/share/zoneinfo/$TIMEZONE" /etc/localtime
    echo "$TIMEZONE" > /etc/timezone
    success "Timezone set to $TIMEZONE"
else
    warn "Invalid or unset TIMEZONE. Using container default."
fi

CMD="httpd -f -p 80 -h /var/www/localhost/htdocs"

log "Launching: $CMD"
exec $CMD

exit 0
