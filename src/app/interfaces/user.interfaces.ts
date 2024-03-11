import { User } from "./resources.interfaces"

export interface CreateUser extends Omit<User, 'password'> {

}

export interface RequestAccountUser {
    username: string,
    password: string,
    reason: string
}

export interface UserEmailVerificationCode {
    username: string,
    verification_code: string
}
