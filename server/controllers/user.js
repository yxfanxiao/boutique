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

export function findUserByName(name, cb) {
    return User.findOne({ name: name }, cb)
}

export function reCharge(name, num, cb) {
    return User
        .where({name: name})
        .update({ $inc: { account: num }})
        .exec(cb)
}