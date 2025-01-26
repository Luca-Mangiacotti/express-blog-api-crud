const postsData = require("../data/posts_data");

// Index
const index = (req, res) => {
  
  //andiamo ad inserire un controllo tramite richiesta query string dall'utente
  //il quale andrà a ricercare un post tramite uno dei tags presenti in ognuno dei post
 
  //andiamo a salvare il nostro array di post da filtrare in una variabile
  let filtredPost = postsData;

  //otteniamo il valore dalla query string con chiave TAG
  const { tag } = req.query;

  //applichiamo il metodo filter sull'array di post e andiamo a slavare solamente quelli che presentano il tag desiderato
  if (tag) {
    filtredPost = filtredPost.filter((post) =>
      post.tags.includes(tag)
    );
  }
  //restituiamo l'array filtrato
  console.log(filtredPost)
  res.json(filtredPost);
};

// Show
//andiamo a salvare in una costante il post desiderato tramite il metodo find sull'array di post
const show = (req, res) => {
  const post = postsData.find((elm) => elm.id == req.params.id);

  //eseguiamo un controllo sull'esistenza del post, in caso sia assente restituiamo un errore
  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }
//altrimenti se il post è presente lo visualizziamo
  res.json(post);
};

// Store
const store = (req, res) => {
  //stampa in console del contenuto della request Body da noi inserita
  console.log(`questa è la Request Body: `, req.body)

  //andiamo a definire un nuovo id per l'elemento da aggiungere
  const id = postsData[postsData.length-1].id + 1

  //creiamo il nuovo oggetto da aggiungere 
  const newPost ={
      id,
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      tags: req.body.tags

  }

  console.log(`questo è il nuovo post aggiunto: `,newPost)

  //andiamo ad aggiungere il nuovo oggetto al nostro array
  postsData.push(newPost)

  //andiamo a restituire uno status 201 che conferma la creazione dell'elemento e lo restituiamo 

  res.sendStatus(201)
  // res.json(newPost)
    
};

// Update
const update = (req, res) => {
  //andiamo a cercare l'elemento da modificare integralmente tramite il metodo find
  const post = postsData.find((elm) => elm.id == req.params.id);

  //eseguiamo un controllo sull'esistenza del post, in caso sia assente restituiamo un errore
  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }
  //altrimenti andiamo ad aggiornare il post con il conenuto della request body
  post.title = req.body.title
  post.content = req.body.content
  post.tags = req.body.tags

  //andiamo a restituire il post modificato
  res.json(post)
  console.log(postsData)

};

// Modify
const modify = (req, res) => {
  //andiamo a cercare l'elemento da modificare parzialmente tramite il metodo find
  //questa volta sarà una "let" perchè non sostituiremo l'elemento ma lo modificheremo
  let post = postsData.find((elm) => elm.id == req.params.id);

  //eseguiamo un controllo sull'esistenza del post, in caso sia assente restituiamo un errore
  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }
  //altrimenti andiamo ad aggiornare il post con il conenuto della request body
  //utilizziamo lo spread operator in modo da ricopiare nel contenuto dell'oggetto tutto il vecchio contenuto
  //in seguito gli diamo anche tutti i valori della request body che andranno a sostituire solamente le proprietà passate dall'utente
  post = {
    ...post,
    ...req.body
  }
  

  //andiamo a restituire il post modificato
  res.json(post)
  console.log(post)

};

// Destroy
//creiamo una funzione che tramite il metodo find andrà per prima cosa a cercare l'elemento da distruggere
const destroy = (req, res) => {
  const post = postsData.find((elm) => elm.id == req.params.id);

//controllo l'esistenza del post, in caso contrario restituisco un errore
  if (!post) {
    return res.status(404).json({
      error: "Pizza not found",
    });
  }

  //individuato il post da distruggere lo andiamo ad eliminare dall'array con il metodo splice
  postsData.splice(postsData.indexOf(post), 1);

  //restituiamo uno status 204 per comunicare all'utente della riuscita eliminazione
  res.sendStatus(204)
};

module.exports = { index, show, store, update, modify, destroy };