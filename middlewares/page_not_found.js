const page_not_found = (req, res, next) => {
    res.status(404)
    res.json({
        error: "not found",
        message: "404 PAGINA NON TROVATA"
    })
}

module.exports = page_not_found