import {useAppSelector} from "../../redux/hooks.ts";
import BreadProductAdmin from "./BreadProductAdmin.tsx";
import BreadProductUser from "./BreadProductUser.tsx";


const Bread = () => {
    const {authUser} = useAppSelector(state => state.auth);
    if(authUser && authUser.email.includes('admin'))
        return <BreadProductAdmin/>
    return <BreadProductUser/>
};

export default Bread;