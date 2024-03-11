export interface UserResource {
    username: string,
    municipality: string,
    is_grouped_indicators: boolean,
    indicators: any[]
}

export interface User {
    username: string,
    password: string,
    resources: UserResource[]
}


export interface EmailVerification {
    username: string,
    verification_code: string,
    is_verified: boolean
}

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
