//middleware creata esclusivamente per verificare che venga inserito un numero nella richiesta dall'utente
//in caso contrario restituisce un errore

const validationId = (req, res, next) => {
    if (isNaN(req.params.id)) {
      return res.sendStatus(400);
    }
    next();
  };
  
  module.exports = validationId