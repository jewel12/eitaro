.PHONY: build run dep docker/*

build:
	npm run build

run:
	npm run dev

dep:
	npm install

fb/serve:
	firebase serve --project $(PROJECT_ID)

fb/deploy:
	firebase deploy --project $(PROJECT_ID) --token "$(FIREBASE_TOKEN)"

fb/login:
	firebase login:ci

docker/build:
	docker build -f Dockerfile.dev -t eitaro .

docker/run:
	docker run --rm -it -p 8080:8080 -v `pwd`:/eitaro -w /eitaro eitaro make $(TASK)

docker/fb/run:
	docker run --rm -e FIREBASE_TOKEN="$(FIREBASE_TOKEN)" -e PROJECT_ID=$(PROJECT_ID) -p 9005:9005 -p 5000:5000 -it -v `pwd`:/eitaro -w /eitaro eitaro make fb/$(TASK)
