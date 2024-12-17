const bcrypt = require('bcrypt')
const UserModel = require("../Models/User")
const jwt = require('jsonwebtoken')

// for signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409).json({ message: "User is already exist, you can login", status: false })
        }
        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();

        res.status(201).json({ message: "Signup successful", status: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: false })

    }
}

// for login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const errorMessage = "Email or password is incorrect"
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false })
        }

        const isPassEqual = await bcrypt.compare(user.password, password)
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMessage, success: false })
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY, { expiresIn: "24h" })

        res.status(200).json({ message: "Login Success", success: true, jwtToken, email, name: user.name })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false })

    }
}

module.exports = { signup, login }