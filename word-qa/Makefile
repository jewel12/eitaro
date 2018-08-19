.PHONY: import docker/* priorities/*

CREDENTIAL := ./serviceAccount.json
WORDS := ./words.csv

import: $(CREDENTIAL) $(WORDS)
	docker run --rm -v "$(PWD):/work" -it wordqa import.go

priorities/init: $(CREDENTIAL)
	docker run --rm -v "$(PWD):/work" -it wordqa init_priorities.go

$(CREDENTIAL):
	echo Put credential file as $@
	exit 1

$(WORDS):
	echo Put words file as $@, see sample.csv
	exit 1

docker/build:
	docker build -t wordqa .
