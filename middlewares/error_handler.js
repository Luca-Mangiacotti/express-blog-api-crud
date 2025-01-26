const error_handler = (err, req, res, next) =>{
    res.status(500)
    res.json({
        error: `attenzione errore 500: "${err.message}"`,
    })
}

module.exports = error_handler