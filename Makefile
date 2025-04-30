DC_DEV = docker compose -f docker-compose.dev.yml --env-file .env.deploy

dev-up:
	$(DC_DEV) up --build

