const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');


exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Hashage du mot de passe
        .then(hash => {
            const user = new UserModel({
                ...req.body,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};