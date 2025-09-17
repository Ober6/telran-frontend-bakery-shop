import {signOut,
    signInWithPopup,
    GoogleAuthProvider
    ,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile} from 'firebase/auth';
import type {AuthUserType, LoginData, SignUpData} from "../utils/app-types.ts";
import {auth} from "../configurations/firebase-config.ts";



const loginWithEmail = async (data: LoginData): Promise<AuthUserType> => {
    const result = await signInWithEmailAndPassword(auth, data.login, data.password);
    const user = result.user;
    return { uid: user.uid, email: user.email!, name: user.displayName ?? "" };
};


const loginWithGoogle = async ():Promise<AuthUserType> => {
    const provider = new GoogleAuthProvider();
    const result  = await signInWithPopup(auth, provider);
    const user = result.user;
    return { uid: user.uid, email: user.email!, name: user.displayName ?? "" };

}
export const login = async (data?:LoginData) => {
    return data? await loginWithEmail(data) : await loginWithGoogle();
}
export const logout = async () => {
    await signOut(auth);
}

export const registerWithEmailPass = async (data:SignUpData)=> {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    console.log(auth.currentUser);
    await updateProfile(auth.currentUser!, {displayName: data.name})
    const user = result.user;
    console.log(user)
    return user;
}