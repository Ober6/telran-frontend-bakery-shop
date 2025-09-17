import {type FC, useEffect, useState} from 'react';
import type {NavItemType} from "../../utils/app-types.ts";
import {AppBar, Avatar, Box, Tab, Tabs, Toolbar} from "@mui/material";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks.ts";
import * as React from "react";

type Props = {
    items: NavItemType[]
}
const NavigationDesktop: FC<Props> = ({items}) => {
    const [value, setValue] = useState(0);
    const {authUser} = useAppSelector(state => state.auth);
    const location = useLocation();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setValue(newValue);

    };

    useEffect(() => {
        const currentIndex = items.findIndex(item => {
            if (location.pathname === item.route) return true;
            const pathArr = location.pathname.split('/');
            const lastStr = pathArr[pathArr.length - 1];
            return item.route === lastStr;
        });

        if (currentIndex !== -1) {
            setValue(currentIndex);
        } else if (location.pathname === '/') {
            setValue(0);
        }
    }, [location.pathname, items]);



    return (
        <Box>

            <AppBar sx={{backgroundColor: "lightgrey"}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Tabs value={value > items.length? 0 : value} onChange={handleChange}>
                        {items.map(item =>
                            <Tab key={item.route} component={Link} to={item.route} label={item.itemName}/>
                        )}
                    </Tabs>
                    {authUser&&
                        <Avatar
                        variant="rounded"
                        sx={{
                            width: 'auto',
                            height: 40,
                            paddingX: 2,
                            bgcolor: 'primary.main',
                            fontSize: 16,
                            fontWeight: 'bold',
                            borderRadius: 2,
                        }}
                        >
                            {authUser.email ?? "User"}
                        </Avatar>}
                </Toolbar>
            </AppBar>

            <Outlet/>
        </Box>
    );
};

export default NavigationDesktop;