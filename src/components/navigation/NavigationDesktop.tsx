import {type FC, useState} from 'react';
import type {NavItemType} from "../../utils/app-types.ts";
import {AppBar, Avatar, Box, Tab, Tabs, Toolbar} from "@mui/material";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {Paths} from "../../utils/paths.ts";
import Button from "@mui/material/Button";

type Props = {
    items: NavItemType[]
}
const NavigationDesktop: FC<Props> = ({items}) => {
    const [value, setValue] = useState(0);
    const location = useLocation();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setValue(newValue);
    };

    const userData = useSelector((state: RootState) => state.auth.userData);
    const hasUser = Object.keys(userData).length > 0;
    const avatarLetter = hasUser && userData.email
        ? userData.email[0].toUpperCase()
        : '';

    const isProductSubMenu = location.pathname.startsWith('/'+Paths.PRODUCTS);

    return (
        <Box>
            <AppBar sx={{backgroundColor: "lightgrey"}}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Tabs value={value} onChange={handleChange}>
                        {items.map(item =>
                            <Tab key={item.route} component={Link} to={item.route} label={item.itemName}/>
                        )}
                    </Tabs>


                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        {isProductSubMenu && (
                            <Button
                                component={Link}
                                to={Paths.HOME}
                                variant="contained"
                                size="small"
                                color="secondary"
                            >
                                Back to main menu
                            </Button>
                        )}

                        {hasUser && avatarLetter && (
                            <Avatar sx={{bgcolor: 'primary.main'}}>
                                {avatarLetter}
                            </Avatar>
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
            <Outlet/>
        </Box>
    );
};

export default NavigationDesktop;