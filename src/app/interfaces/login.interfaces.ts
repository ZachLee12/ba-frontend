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