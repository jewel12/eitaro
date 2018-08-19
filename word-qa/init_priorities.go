package main

import (
	"log"
	"context"

	firebase "firebase.google.com/go"
	firestore "cloud.google.com/go/firestore"
	iterator "google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"time"
)

type Priority struct {
	Priority    int                     `firestore:"priority"`
	UpdatedAt   time.Time               `firestore:"updated_at"`
	User        *firestore.DocumentRef  `firestore:"user"`
	Word        *firestore.DocumentRef  `firestore:"word"`
}

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

	// 現状 user はひとりだけなので Next は 1 回
	user, err := client.Collection("users").Documents(ctx).Next()
	if err != nil {
		log.Fatalln(err)
	}

	q := client.Collection("priorities").Where("user", "==", user.Ref)
	prIter := q.Documents(ctx)
	defer prIter.Stop()
	hasPriorities := map[string]struct{}{}
	for {
		d, err := prIter.Next()
		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Println(err) // Skip
			continue
		}

		var pr Priority
		if err := d.DataTo(&pr); err != nil {
			log.Println(err) // Skip
			continue
		}

		hasPriorities[pr.Word.Path] = struct{}{}
	}

	wIter := client.Collection("words").Documents(ctx)
	var initRequiredWords []*firestore.DocumentRef
	defer wIter.Stop()
	for {
		d, err := wIter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Println(err) // Skip
			continue
		}
		_, hasPriority := hasPriorities[d.Ref.Path]
		if !hasPriority {
			initRequiredWords = append(initRequiredWords, d.Ref)
		}
	}

	collection := client.Collection("priorities")
	batch := client.Batch()
	for _, w := range(initRequiredWords) {
		doc := collection.NewDoc()
		pr := Priority{
			50, // initial priority
			time.Now(),
			user.Ref,
			w,
		}
		batch.Set(doc, pr)
	}

	_, err = batch.Commit(ctx)
	if err != nil {
		log.Fatalln(err)
	}
}
