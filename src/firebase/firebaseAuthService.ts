import {
    signOut,
    signInWithPopup,
    GoogleAuthProvider
    ,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
                    } from 'firebase/auth';
import type {LoginData, SignUpData, AuthUser} from "../utils/app-types.ts";
import {auth} from "../configurations/firebase-config.ts";


const loginWithEmail = async (data: LoginData) : Promise<AuthUser> => {
    const result = await signInWithEmailAndPassword(auth, data.login, data.password);
    const user = result.user;
    // return user.email;
    return {
        email: user.email,
        displayName: user.displayName,
    }
}
const loginWithGoogle = async () : Promise<AuthUser> => {
    const provider = new GoogleAuthProvider();
    const result  = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
        email: user.email,
        displayName: user.displayName,
    }
}
export const login = async (data?:LoginData) => {
    return data? await loginWithEmail(data) : await loginWithGoogle();
}
export const logout = async () => {
    await signOut(auth);
}

// export const registerWithEmailPass = async (data:LoginData)=> {
//     const result = await createUserWithEmailAndPassword(auth, data.login, data.password);
//     const user = result.user;
//     return user.email;
// }

export const registerWithNameEmailPass = async (data:SignUpData)=> {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = result.user;
    await updateProfile(user, {
        displayName: data.name
    })
    return {
        email: user.email,
        displayName: user.displayName
    };
}