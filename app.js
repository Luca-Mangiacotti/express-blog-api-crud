//importiamo il framework express
const express = require('express')
const app = express()
const port = 3001
//rendiamo file statici il contenuto della directory "public"
app.use(express.static("public"));
//inseriamo il body parser per dare possibilità alla nostra app di decodificare il json nella request body
app.use(express.json())

//importiamo i routers per i post
const postsRouter = require("./routers/posts_router")

//importiamo i gestori di errore
const error_handler = require("./middlewares/error_handler")
const page_not_found = require("./middlewares/page_not_found")

//indirizzo di partenza del server Blog
app.get('/', (req, res) => {
  res.send('Questo è il Server del blog')
})

//registro le rotte per i post
app.use("/posts", postsRouter);

//utilizziamo i gestori di errore
//middleware che gestisce gli errori 404
app.use(page_not_found)
//middleware che gestisce gli errori interni del server
app.use(error_handler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      