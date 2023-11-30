# Doddle Jump

Hands Free Doddle Jump Implements Using Mediapipe.js and Vue.js.

## For Development

### Install Dependencies

> You can try try <https://registry.npmmirror.com>.

```plain
npm install
```

### Local Serve

> For real command, see package.json.

```plain
npm run serve
```

### Local Build

> For real command, see package.json.

```plain
npm run build
```

### Local Preview

> For real command, see package.json.

```plain
npm run preview
```

### Source Code Prettier

> For rule detail, see package.json.

```plain
npx prettier ./src
```

### Source Code Lint

> For rule detail, see package.json.

```plain
npx eslint ./src
```

## For Production

### Use Https Example Server

> Use self signed certificate and enable remote acctess.

```plain
python ssl.server.example.py
```

### Use Python Http Server

> Http only and camera only available at localhost.

```plain
python -m http.server <port>
```

### Use Node.js Http Server

> Http only and camera only available at localhost.

```plain
npx http-server -p <port>
```

### Use Docker and Build Image

> Http only and camera only available at localhost.

```plain
date +%s | xargs -I {} docker build . -t doddle-jump-image:{}
```

### Use Docker and Run Image

> Http only and camera only available at localhost.

```plain
docker run -d --name doddle-jump -p 80:80 doddle-jump-image
```
