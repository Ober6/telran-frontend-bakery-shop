import {type NavItemType, Roles} from "./app-types.ts";
import {Paths} from "./paths.ts";

export const navItems: NavItemType[] = [
    {route: Paths.HOME, itemName: "Home", role: Roles.ALL},
    {route: Paths.PRODUCTS, itemName: "Products", role:Roles.ALL},
    {route: Paths.CUSTOMERS, itemName: "Customers", role:Roles.ADMIN},
    {route: Paths.ORDERS, itemName: "Orders", role: Roles.USER},
    {route: Paths.CART, itemName: "Shopping Cart", role: Roles.USER_ONLY},
    {route: Paths.LOGIN, itemName: "Login", role: Roles.NO_AUTH},
    {route: Paths.LOGOUT, itemName: "Logout", role: Roles.USER}
]

export const productItems: NavItemType[] = [
    {route: Paths.DAIRY, itemName: "Dairy"},
    {route: Paths.BREAD, itemName: "Bread"},
    {route: Paths.HOME, itemName: "Back to main menu"},
]