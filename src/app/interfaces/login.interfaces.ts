// Interfaces that are related to the login process

export interface UserCredentials {
    username: string,
    password: string
}

export interface Token {
    access_token: string
    token_type: string
}

export interface UserNonceSession {
    username: string
    nonce: string,
    nonce_expiry: string
}

export interface OtpNoncePair {
    otp: string
    nonce: string
}