import type {NavItemType} from "./app-types.ts";
import {Paths} from "./paths.ts";

export const navItems: NavItemType[] = [
    {route: Paths.HOME, itemName: "Home"},
    {route: Paths.PRODUCTS, itemName: "Products"},
    {route: Paths.CUSTOMERS, itemName: "Customers"},
    {route: Paths.ORDERS, itemName: "Orders"},
    {route: Paths.CART, itemName: "Shopping Cart"},
    {route: Paths.LOGIN, itemName: "Login"},
    {route: Paths.LOGOUT, itemName: "Logout"}
]

export const productItems: NavItemType[] = [
    {route: Paths.DAIRY, itemName: "Dairy"},
    {route: Paths.BREAD, itemName: "Bread"},
]