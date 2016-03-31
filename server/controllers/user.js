import { User } from "../models"

export function signUp(name, pwd) {
    const user = new User()
    user.name = name
    user.pwd = pwd
    return user.save()
}

export function logIn(name) {
    return User.findOne({ name: name })
}