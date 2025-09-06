import {NavLink, Outlet} from "react-router-dom";
import {Paths} from "../../utils/paths.ts";


const ProductLayout = () => {
    return (
        <div>
            <nav>
                <ul className={'nav-list'}>
                    <NavLink to={Paths.BREAD}><li>Bread</li></NavLink>
                    <NavLink to={Paths.DAIRY}><li>Dairy</li></NavLink>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
};

export default ProductLayout;