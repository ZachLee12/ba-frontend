import { UserResource } from "./resources.interfaces";

export interface User {
    username: string,
    password: string,
}

export interface RequestAccountUser extends User {
    reason: string
}

export interface CreateUser extends UserResource {
}