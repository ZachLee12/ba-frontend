import { UserResource } from "./resources.interfaces";

export interface User {
    username: string,
    access: UserResource[]
}

export interface CreateUser extends User {
    password: string
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
