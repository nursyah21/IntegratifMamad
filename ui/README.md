# Getting Started

## install dependecies

```bash
npm i
```

## run backend server
> run javaspring

```bash
./mvnw spring-boot:run
```

> run expressjs
```bash
npm run backend
```

## run frontend

> for development

```
npm run dev
```

> for production

```bash
npm run frontend
```

## procedure to expose project to public

1. run backend and expose to public with [serveo.net](http://serveo.net)

```bash
npm run backend
```

```bash
ssh -R 80:localhost:5000 serveo.net
```

2. edit baseURL in [src/components/url.js](src/components/url.js) based on url from serveo.net. after that run frontend

```bash
npm run frontend
```

3. expose frontend and test url we get from serveo.net in different device

```bash
ssh -R 80:localhost:8080 serveo.net
```
