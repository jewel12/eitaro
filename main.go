package main

import (
  "syscall/js"
  "math/rand"
  "time"
  "strconv"
  "fmt"
)

func main() {
  t := time.Tick(100 * time.Millisecond)

  var deg int64
  var cn int
  for {
    fmt.Printf("%d", js.Global().Get("alpha"))
    select {
      case <-t:
        deg = 8 + (deg % 360)
        if rand.Intn(10) == 0 {
          cn  = rand.Intn(16777215)
        }
	c := fmt.Sprintf("#%06X", cn)

        body := js.Global().Get("document").Get("body")
        style := body.Get("style")
        background := "linear-gradient(" + strconv.FormatInt(deg, 10) + "deg, " + c + " 25%, #CEECF5 25%, #CEECF5 50%," + c + " 50%, " + c + " 75%, #CEECF5 75%, #CEECF5)"
        style.Set("backgroundImage", background)
    }
  }
}
