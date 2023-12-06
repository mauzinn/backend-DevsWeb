//Interfaces
    export interface IUserDatabase {
        email: string,
        name: string,
        about: string,
        image: string
    }

    export interface ICode {
        code: string,
        id: number
    }

    export interface ICodeSchema {
        email: string
    }

    export interface ICodeVerifySchema {
        code: string
    }

    export interface IGenerateRequest {
        email: string
    }

    export interface IAuthenticationRequest {
        email: string,
        name: string,
        about: string
    }

    export interface IMessageSchema {
        message: string,
        by: string,
        room: string
    }

    export interface IUsers {
        id: string,
        messages: IMessageSchema[]
    }

    export interface ILocalDB {
        codes: ICode[],
        users: IUsers[]
    }

    export interface IDecodeJWT {
        token: string
    }

    export interface IContacts {
        src: string,
        name: string,
        about: string,
        room: string
    }

    export interface IContactsUser {
        contacts: IContacts,
        by: string
    }

    export interface IContactsRead {
        email: string,
        token: string
    }

    export interface IContactsCreate {
        email: string,
        by: string,
        token: string
    }

    export interface IMessageRead {
        room: string,
        token: string
    }