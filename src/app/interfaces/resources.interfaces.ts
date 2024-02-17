export interface UserResource {
    municipality: string,
    grouped: boolean,
    indicators: any[]
}

export interface User {
    username: string,
    access: UserResource[]
}

export interface EmailVerification {
    username: string,
    verification_code: string,
    is_verified: boolean
}