const { body, validationResult } = require('express-validator');

const validateUserBody = [
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('La mail non è corretta'),   

    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Attenzione, la password deve avere almeno 8 caratteri'),

    body('fullName')
        .notEmpty()
        .isString()
        .isLength({ min: 1 })
        .withMessage('Attenzione, l\'username deve contenere almeno un carattere'),

    ( req, res, next ) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res
                .status(400)
                .send({
                    error: error.array()
                })
        }

        next()
    }

]

module.exports =  { validateUserBody } 