start-services:
	- ./docker/scripts/init.sh
stop-services:
	- docker compose down
build:
	- docker build -f ./Dockerfile-prod -t ms-middleware-bot-container:latest .
start:
	- docker run --name ms-middleware-bot-container -d ms-middleware-bot-container:latest
exec:
	- docker exec -it ms-middleware-bot-container /bin/sh
logs:
	- docker logs -f --tail 50 --timestamps ms-middleware-bot-container
