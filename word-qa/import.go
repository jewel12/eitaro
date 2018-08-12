package main

import (
	"os"
	"log"
	"context"
	"encoding/csv"

	firebase "firebase.google.com/go"
  	"google.golang.org/api/option"
)

func main () {
	sa := option.WithCredentialsFile("./serviceAccount.json")
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
  		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
  		log.Fatalln(err)
	}
	defer client.Close()

    	file, err := os.Open("./words.csv")
	if err != nil {
		log.Fatalln(err)
	}
    	defer file.Close()

    	r := csv.NewReader(file)

    	rows, err := r.ReadAll()
	if err != nil {
		log.Fatalln(err)
	}

	header := rows[0]

	for _, row := range(rows) {
		d := map[string]string{}
		for col, val := range(row) {
			
			d[header[col]] = val
		}

		_, _, err = client.Collection("words").Add(ctx, d)
		if err != nil {
			log.Fatalf("Failed adding the word: %v", err)
		}
	}	
}