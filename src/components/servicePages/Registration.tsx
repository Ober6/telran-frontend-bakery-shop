import {registerWithEmailPass} from "../../firebase/firebaseAuthService.ts";
import type { SignUpData} from "../../utils/app-types.ts";
import {setAuthUser} from "../../redux/slices/AuthSlice.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {useNavigate} from "react-router-dom";
import SignUp from "../templates/SignUp.tsx";
import {useState} from "react";

const Registration = () => {
    const  dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    const registerWithFireBase = async (data:SignUpData) => {
        try {
            const registeredUser = await registerWithEmailPass(data);
            dispatch(setAuthUser(registeredUser));
            navigate('/')
        } catch (e) {
            const error = e as Error;
            setErrorMessage('Error: ' + (error.message || error));
        }
    }
    return (
        <div>
            {errorMessage && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffdddd',
                        color: '#900',
                        padding: '10px 20px',
                        border: '1px solid #900',
                        borderRadius: '5px',
                        zIndex: 1000,
                    }}
                >
                    {errorMessage}
                    <button
                        style={{ marginLeft: '10px' }}
                        onClick={() => setErrorMessage('')}
                    >
                        OK
                    </button>
                </div>
            )}


            <SignUp func={registerWithFireBase}/>
        </div>
    );
};

export default Registration;