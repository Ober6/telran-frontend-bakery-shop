import SignIn from "../templates/SignIn.tsx";
import {useDispatch} from "react-redux";
import {setUserData} from "../../redux/slices/AuthSlice.ts";

const Login = () => {
    const dispatch = useDispatch();

    const handleLogin = (data: {email: string, password: string}) => {
        dispatch(setUserData(data));
    }

    return (
        <div>
            <SignIn onSubmit={handleLogin} />
        </div>
    );
};

export default Login;