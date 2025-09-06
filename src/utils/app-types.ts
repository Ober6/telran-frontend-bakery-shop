import type {Paths} from "./paths.ts";

export enum Roles {
    ALL, USER, ADMIN, NO_AUTH
}

export type NavItemType =    {
    route: Paths,
    itemName: string,
    role?: Roles
}

export type LoginData = {
    login: string,
    password: string
}