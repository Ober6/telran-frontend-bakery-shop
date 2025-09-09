import SignUp from "../templates/SignUp.tsx";
import type {LoginData, SignUpData} from "../../utils/app-types.ts";
import {registerWithEmailPass} from "../../firebase/firebaseAuthService.ts";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../utils/paths.ts";


const Registration = () => {
    const navigate = useNavigate();
    const registerFirebase = async (data: SignUpData) => {
        const registerData: LoginData = {
            login: data.email,
            password: data.password
        }
        try {
            await registerWithEmailPass(registerData);
            navigate(`/${Paths.LOGIN}`);
        } catch (e) {
            console.log(e);
            navigate(`/`)
        }
    }

    return (
        <div>
            <SignUp func={registerFirebase}/>
        </div>
    );
};

export default Registration;