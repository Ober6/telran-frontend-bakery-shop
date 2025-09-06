import {NavLink, Outlet} from "react-router-dom";
import {Paths} from "../../utils/paths.ts";


const Layout = () => {
    return (
        <div>
            <nav>
                <ul className={'nav-list'}>
                    <NavLink to={Paths.HOME}><li>Home</li></NavLink>
                    <NavLink to={Paths.CART}><li>ShoppingCart</li></NavLink>
                    <NavLink to={Paths.CUSTOMERS}><li>Customers</li></NavLink>
                    <NavLink to={Paths.ORDERS}><li>Orders</li></NavLink>
                    <NavLink to={Paths.PRODUCTS}><li>Products</li></NavLink>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
};

export default Layout;