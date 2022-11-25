.SILENT:
.PHONY: build run

build:
	docker build -t flowchart-api .

run: build
	docker-compose up
