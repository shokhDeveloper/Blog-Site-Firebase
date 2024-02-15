export interface User {
    name: string,
    firstName: string,
    email: string,
    photoURL?: string,
    uid?: string
}   
export interface GoogleResponse {
    user: {
        displayName: string,
        email: string,
        accessToken: string
    }
}
export type genericsType<T> = T | null
export interface InitialStateInterface {
    token: genericsType<string>,
    user: genericsType<User>,
    posts: Post[]
}
export interface Author {
    name: string,
    firstName: string,
    uid: string
}
export interface Post {
    title: string,
    id?: string,
    discription: string,
    author: Author
}