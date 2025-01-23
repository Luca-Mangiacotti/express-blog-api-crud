//importiamo il framework express
const express = require('express')
const app = express()
const port = 3001
//rendiamo file statici il contenuto della directory "public"
app.use(express.static("public"));
//inseriamo il body parser per dare possibilità alla nostra app di decodificare il json nella request body
app.use(express.json())

//router per i post
const postsRouter = require("./routers/posts_router")

//indirizzo di partenza del server Blog
app.get('/', (req, res) => {
  res.send('Questo è il Server del blog')
})

//registro le rotte per i post
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      