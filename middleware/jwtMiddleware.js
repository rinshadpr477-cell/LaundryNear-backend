const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");
    

    try {

        const token = req.headers["authorization"].split(" ")[1]

        const jwtResponse = jwt.verify(
            token,
            process.env.JWT_PASSWORD
        )

        req.payload = jwtResponse.userId

        next()

    } catch (err) {
        res.status(401).json("Invalid Token")
    }
}

module.exports = jwtMiddleware