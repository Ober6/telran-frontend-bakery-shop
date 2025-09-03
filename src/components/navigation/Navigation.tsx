import type {FC} from "react";
import type {NavItemType} from "../../utils/app-types.ts";
import {NavLink, Outlet} from "react-router-dom";

type Props = {
    items: NavItemType[]
}

const Navigation:FC<Props> = ({items}) => {
    return (
        <div>
            <nav>
                <ul className={'nav-list'}>
                    {items.map(item =>
                        <NavLink to={item.route} key={item.route}>
                            <li>{item.itemName}</li>
                        </NavLink>
                    )}
                </ul>
                <Outlet/>
            </nav>
        </div>
    );
};

export default Navigation;