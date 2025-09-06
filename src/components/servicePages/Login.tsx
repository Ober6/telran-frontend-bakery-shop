import SignIn from "../templates/SignIn.tsx";
import type {LoginData} from "../../utils/app-types.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {setAuthUser} from "../../redux/slices/AuthSlice.ts";
import {useNavigate} from "react-router-dom";
import {login} from "../../firebase/firebaseAuthService.ts";


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const loginFunc = (data:LoginData) => {
    //     dispatch(setAuthUser(data.login));
    //     navigate('/')
    // }

    const loginWithFirebase = async (data?:LoginData)=> {
        try {
            const authUser = await login(data);
            dispatch(setAuthUser(authUser));
            navigate('/')
        } catch (e) {
            console.log(e) //Todo
        }
    }


    return (
        <div>
            {/*<SignIn func={loginFunc}/>*/}
            <SignIn func={loginWithFirebase}/>
        </div>
    );
};

export default Login;