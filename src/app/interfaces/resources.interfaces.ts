export interface UserResource {
    municipality: string,
    grouped: boolean,
    indicators: any[]
}

export interface User {
    username: string,
    access: UserResource[]
}