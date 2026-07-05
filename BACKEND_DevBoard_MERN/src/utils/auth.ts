import bcrypt from 'bcrypt'

export const hashPassword = async (password:string) => {
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const confirmPassword = async (enteredPassword:string, storedHash:string) => {
    // return true or false
    return await bcrypt.compare(enteredPassword, storedHash)
}