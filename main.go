package main

import (
  "syscall/js"
  "time"
  "fmt"
  "strconv"
)

func main() {
  body := js.Global().Get("document").Get("body")
  style := body.Get("style")

  deg := time.Now().UnixNano() % 360

  background := "linear-gradient(" + strconv.FormatInt(deg, 10) + "deg, #00BFFF 25%, #CEECF5 25%, #CEECF5 50%, #00BFFF 50%, #00BFFF 75%, #CEECF5 75%, #CEECF5)"
  fmt.Println(deg)
  style.Set("backgroundImage", background)
}
