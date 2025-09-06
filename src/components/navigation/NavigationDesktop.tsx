import {type FC, useState} from 'react';
import type {NavItemType} from "../../utils/app-types.ts";
import {AppBar, Avatar, Box, Tab, Tabs, Toolbar} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks.ts";

type Props = {
    items: NavItemType[]
}
const NavigationDesktop: FC<Props> = ({items}) => {
    const [value, setValue] = useState(0);
    const {authUser} = useAppSelector(state => state.auth)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setValue(newValue);
    };

    return (
        <Box>

            <AppBar sx={{backgroundColor: "lightgrey"}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Tabs value={value} onChange={handleChange}>
                        {items.map(item =>
                            <Tab key={item.route} component={Link} to={item.route} label={item.itemName}/>
                        )}
                    </Tabs>
                    {authUser&&<Avatar>{authUser.substring(0, 1)}</Avatar>}
                </Toolbar>
            </AppBar>

            <Outlet/>
        </Box>
    );
};

export default NavigationDesktop;