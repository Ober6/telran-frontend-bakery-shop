import type {Paths} from "./paths.ts";

export enum Roles {
    ALL, USER, ADMIN, NO_AUTH, USER_ONLY
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

export type SignUpData = {
    name:string,
    lastName?:string|null,
    email:string,
    password:string
}

export type ProductType = {
    id: string;
    title: string;
    category: string;
    unit: string;
    cost: number;
    img: string;
};


export type Category = {
    categoryName:string
}

export type AuthUserType = {
    uid: string;
    name: string;
    email: string;
};

export type ShopCartProdType = {
    prodId: string,
    count: number
}