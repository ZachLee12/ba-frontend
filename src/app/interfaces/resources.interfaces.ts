export interface UserResource {
    municipality: string,
    grouped: string,
    indicators: any[]
}

export interface User {
    username: string,
    access: UserResource[]
}