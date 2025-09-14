import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import {Paths} from "./utils/paths.ts";
import ShoppingCart from "./components/ShoppingCart.tsx";
import Customers from "./components/Customers.tsx";
import Orders from "./components/Orders.tsx";
//import Products from "./components/Products.tsx";
import Bread from "./components/Bread.tsx";
import Dairy from "./components/Dairy.tsx";
//import Layout from "./components/navigation/Layout.tsx";
//import ProductLayout from "./components/navigation/ProductLayout.tsx";
import Error404Page from "./components/servicePages/Error404Page.tsx";
import NavigationDesktop from "./components/navigation/NavigationDesktop.tsx";
import {navItems, productItems} from "./utils/constants.ts";
import Logout from "./components/servicePages/Logout.tsx";
import Login from "./components/servicePages/Login.tsx";
import {type NavItemType, type ProductType, Roles} from "./utils/app-types.ts";
import {useAppDispatch, useAppSelector} from "./redux/hooks.ts";
import Registration from "./components/servicePages/Registration.tsx";
import {useEffect} from "react";
import {getProducts} from "./firebase/firebaseDBService.ts";
import {prodsUpd} from "./redux/slices/productSlice.ts";

function App() {
    // const {authUser} = useAppSelector(state => state.auth) as { authUser: any };
    const {authUser} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const subscription = getProducts().subscribe({
            next:(prods:ProductType[])=>{
                dispatch(prodsUpd(prods));
            }
        })
        return () => subscription.unsubscribe();
    },[]);

    function predicate(item: NavItemType) {
        const email = authUser?.email ?? "";
        return (
            item.role === Roles.ALL ||
            item.role === Roles.USER && authUser ||
            item.role === Roles.ADMIN && authUser && email.includes('admin') ||
            item.role === Roles.NO_AUTH && !authUser||
            item.role === Roles.USER_ONLY && authUser && !email.includes('admin')
        )
    }

    function getRoutes() {
        return navItems.filter(item => predicate(item));
    }

    return (
        <Routes>
            {/*<Route path={Paths.HOME} element={<Layout/>}>*/}
            <Route path={Paths.HOME} element={<NavigationDesktop items={getRoutes()}/>}>
                <Route index element={<Home/>}/>
                <Route path={Paths.CART} element={<ShoppingCart/>}/>
                <Route path={Paths.CUSTOMERS} element={<Customers/>}/>
                <Route path={Paths.ORDERS} element={<Orders/>}/>
                {/*<Route path={Paths.PRODUCTS} element={<ProductLayout/>}>*/}
                {/*<Route path={Paths.PRODUCTS} element={<Navigation items={navItems}/>}>*/}
                <Route path={Paths.PRODUCTS} element={<NavigationDesktop items={productItems}/>}>
                    <Route path={Paths.BREAD} element={<Bread/>}/>
                    <Route path={Paths.DAIRY} element={<Dairy/>}/>
                </Route>
                <Route path={Paths.LOGOUT} element={<Logout/>}/>
                <Route path={Paths.LOGIN} element={<Login/>}/>
                <Route path={Paths.REGISTRATION} element={<Registration/>}/>
            </Route>
            <Route path={'*'} element={<Error404Page/>}/>
        </Routes>
    )
}

export default App;