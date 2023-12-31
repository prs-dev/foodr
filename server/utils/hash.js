const brcypt = require("bcrypt")

const hashPassword = async(password) => {
    try {
        const salt = await brcypt.genSalt(10)
        const hashedPassword = await brcypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

const comparePasswords = async(password, hashedPassword) => {
    return await brcypt.compare(password, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePasswords
}