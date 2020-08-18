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

### Ngrok

For local development you might need to use `ngrok` for the QRMenu App to be able to access API on local host.

```bash
$ ngrok http 8100
```
