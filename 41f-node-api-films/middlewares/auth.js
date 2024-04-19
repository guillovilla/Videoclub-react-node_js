const jwt = require("jsonwebtoken");
const db = require("../config/db.js");


const auth = async (req, res, next) => {
    try {
        // Si le jeton est valide
        // Est-ce qu'il y a qulque chose dans l'entete
        if (req.headers.authorization) {
            //console.log(req.headers.authorization)
            //Transforme en array et retourne 
            const jetonAValider = req.headers.authorization.split(" ")[1];
            const jetonDecode = jwt.verify(jetonAValider, process.env.JWT_SECRET);

            const utilisateurVerifie = await db.collection("utilisateurs").doc(jetonDecode.id).get();
            
            if (!utilisateurVerifie.exists) {
                throw "Non autorisé";
            } else {
                req.user = utilisateurVerifie.data();
                next();
            }
        } else {
            throw "Non autorisé";
        }
    } catch (erreur) {
        console.log(erreur);
        res.statusCode = 401;
        res.json({ message: erreur.message });
    }
};

module.exports = auth;


// const auth = async (req, res, next) => {
//     try {
//         // Si le jeton est valide
//         // Est-ce qu'il y a qulque chose dans l'entete
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//             const token = req.headers.authorization.split(" ")[1];
//             const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//             const docRef = await db.collection("utilisateurs").doc(decodedToken.id).get();

//             if (!docRef.exists) {
//                 throw "Non autorisé";
//             } else {
//                 req.user = docRef.data();
//                 next();
//             }
//         } else {
//             throw "Non autorisé";
//         }
//     } catch (error) {
//         res.statusCode = 401;
//         res.json({ message: "Non autorisé" });
//     }
// };

// module.exports = auth;
