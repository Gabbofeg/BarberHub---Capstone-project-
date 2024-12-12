const isAuthored = ( req, res, next ) => {
    const { role } = req.body
    console.log(req)
    if ( role !== 'admin' ) {
        return res.status(403)
            .send({
                statusCode: 403,
                message: 'You are not authorized'
            })
    }

    next()
}

module.exports = isAuthored