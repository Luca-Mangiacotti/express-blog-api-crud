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
  res.send("Creazione nuovo post");
};

// Update
const update = (req, res) => {
  res.send(`Modifica integrale del post: ${req.params.id}`);
};

// Modify
const modify = (req, res) => {
  res.send(`Modifica parziale del post ${req.params.id}`);
};

// Delete
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
  res.sendStatus(204);
};

module.exports = { index, show, store, update, modify, destroy };