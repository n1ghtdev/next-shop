### Quick Start

#### Development

##### Run `npm install` in root / directory, it'll install client and server dependencies

##### Run docker-compose in root / directory

On development side client and server are just a volumes, to make HOT reloading
work without restarting docker.

```
docker-compose up --build -d
```

##### Client will be on `localhost` and server on `localhost/api`

#### Production

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
