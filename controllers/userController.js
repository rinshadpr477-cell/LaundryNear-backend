const users = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.registerController = async (req, res) => {
    console.log("inside registerController");

    const { username, email, password, role } = req.body

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json("User already exists")
        } else {

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new users({ username, email, password: hashedPassword, role })

            await newUser.save()

            res.status(200).json(newUser)
        }

    }
    catch (err) {
        res.status(500).json(err)
    }


}

exports.loginController = async (req, res) => {
    console.log("inside loginController")

    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

            if (isPasswordMatch) {
                const token = jwt.sign(
                    { userId: existingUser._id, role: existingUser.role },
                    process.env.JWT_PASSWORD
                )

                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(404).json("Invalid email or password")
            }
        } else {
            res.status(404).json("Invalid email or password")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
exports.googleLoginController = async(req,res)=>{
    console.log("inside googleLoginController")

    const {username,email,password,profile,role} = req.body

    try{

        const existingUser = await users.findOne({email})

        if(existingUser){

            const token = jwt.sign(
                {
                    userId:existingUser._id,
                    role:existingUser.role
                },
                process.env.JWT_PASSWORD
            )

            res.status(200).json({
                user:existingUser,
                token
            })

        }else{

            const newUser = new users({
                username,
                email,
                password,
                profile,
                role:role || "customer"
            })

            await newUser.save()

            const token = jwt.sign(
                {
                    userId:newUser._id,
                    role:newUser.role
                },
                process.env.JWT_PASSWORD
            )

            res.status(200).json({
                user:newUser,
                token
            })

        }

    }catch(err){
        res.status(500).json(err)
    }
}