.SILENT:
.PHONY: build run

DEFAULT_GOAL: run

build:
	docker build --no-cache=true -t flowchart-api .

run: build
	docker-compose up
