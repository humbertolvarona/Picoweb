# PicoWebServer Docker Image Documentation

Lightweight Alpine-based web server Docker image for rapid static content hosting

![Docker](https://img.shields.io/badge/Docker-ready-blue)
![Alpine](https://img.shields.io/badge/Base-Alpine%203.21-29abe2)
![License](https://img.shields.io/badge/License-CC0_International-green)

---

This image provides a minimal and secure Alpine Linux environment, pre-configured to run a lightweight HTTP server (httpd) for serving static files. It is designed for simplicity and quick deployment, making it ideal for use cases such as rapid prototyping, microservices, embedded applications, or serving simple HTML/CSS/JS content. The image supports custom time zone configuration and health checks, making it suitable for both development and production environments. A custom `start.sh` script is used for initialization, ensuring flexible and reproducible container startup. All configuration files and web content can be managed via standard Docker volume mounts and environment variables, keeping the deployment process straightforward and repeatable.

---

## Features

* **Based on Alpine Linux 3.21:** Extremely lightweight and secure base.
* **Simple HTTP Server:** Uses `httpd` to serve files from `/var/www/localhost/htdocs`.
* **Configurable Time Zone:** Set with the `TIMEZONE` environment variable (e.g., `America/Recife`).
* **Healthcheck:** Automated endpoint health verification using `curl`.
* **Persistent Volume Support:** Mount host directories as web roots.
* **Easy Startup Script:** Initialization handled by `/start.sh`.

---

## Usage

### Run the Container

```sh
docker run -d \
  -p 18080:80 \
  --name test_picoweb \
  -e TIMEZONE=America/Recife \
  -v $(pwd)/www:/var/www/localhost/htdocs \
  humbertovarona/picoweb
```

* **-p 18080:80**: Maps host port 18080 to container port 80.
* **--name test\_picoweb**: Names the running container.
* **-e TIMEZONE=America/Recife**: Sets the desired time zone.
* **-v \$(pwd)/www:/var/www/localhost/htdocs**: Mounts a host directory as the document root.

### Stopping and Removing the Container

```sh
docker stop test_picoweb

docker rm test_picoweb
```

### Removing the Image

```sh
docker rmi -f humbertovarona/picoweb
```

### Inspecting Container Health

```sh
docker inspect --format='{{json .State.Health}}' test_picoweb | jq
```

### Viewing Logs

```sh
docker logs test_picoweb
```

### Executing a Shell in the Container

```sh
docker exec -it test_picoweb sh
```

#### Inside the container

```sh
ps aux | grep httpd
netstat -tuln | grep <TCP-PORT>
```

---

## Docker Compose Example

You can manage and run the container using Docker Compose. Example `docker-compose.yml`:

```yaml
services:
  picoweb:
    image: humbertovarona/picoweb
    container_name: test_picoweb
    ports:
      - "18080:80"
    environment:
      - TIMEZONE=America/Recife
    volumes:
      - ./www:/var/www/localhost/htdocs
    healthcheck:
      test: ["CMD", "curl", "-k", "-s", "-L", "-o", "/dev/null", "-w", "%{http_code}", "http://127.0.0.1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

Launch with:

```sh
docker compose up -d
```

---

## Environment Variables

| Variable | Default | Description                 |
| -------- | ------- | --------------------------- |
| TIMEZONE | UTC     | Time zone for the container |

---

## Health Check

* The container runs a built-in healthcheck using `curl` to verify HTTP server responsiveness.
* The server is considered healthy if it responds with HTTP status 200, 301, 302, 403, or 404.

---

## License

This project is licensed under the international CC0 Public Domain Dedication.

This means you are free to use, modify, distribute, and build upon this software for any purpose, without any restrictions, including commercial use, and without the need for attribution. No copyright is claimed by the author, and all related rights are waived worldwide to the fullest extent allowed by law.

While attribution is not legally required, credit to the original author is appreciated.

## Attribution

Author: HL Varona ([humbertovarona@gmail.com](mailto:humbertovarona@gmail.com)).

