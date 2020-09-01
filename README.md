# QRMenu API

## Installation

```bash
$ docker-compose up
```

Default parameters are:

- `PORT: 8100`
- `URL: 0.0.0.0`

## Tools

### Routes

All available routes are listed here [`http://localhost:8100/route-list`](http://localhost:8100/route-list)

### Watch logs of API container

`$docker container logs -f --tail 500 qrapp_api`

SSH into a container;

`$docker exec -it qrapp_api bash`

### Run tests

Run for a specific file:

`$docker exec -it qrapp_api npx jest --watch ./test/controllers/restaurants.test.js`

Run for all files:

`$docker exec -it qrapp_api npx jest --watch ./test`

### Ngrok

For local development you might need to use `ngrok` for the QRMenu App to be able to access API on local host.

```bash
$ ngrok http 8100
```
