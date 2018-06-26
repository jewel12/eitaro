.PHONY: run dep docker/*

DOCKER_RUN = docker run -rm -p 8080:8080 -v `pwd`:/eitaro -w /eitaro eitaro-dev

run:
	npm run dev

dep:
	npm install

docker/run:
	$(DOCKER_RUN) make $(TASK)

docker/build:
	docker build -t eitaro-dev .
