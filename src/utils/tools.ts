import {useEffect} from "react";
import {onSnapshot, query} from 'firebase/firestore';
import {prodColl} from "../firebase/firebaseDBService.ts";
import type {ProductType} from "./app-types.ts";
import {useAppDispatch} from "../redux/hooks.ts";
import {prodsUpd} from "../redux/slices/productSlice.ts";

export const getRandomNumber = (from: number, to: number) => {
    return Math.trunc(Math.random()*(to - from)) + from;
}

export const getEcho = (data:string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(data) resolve(data);
            else reject(new Error("Error!"))
        }, 1000)
    })
}

export const useProductsFirebase = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const q = query(prodColl);
        const unsubscribe = onSnapshot(q,(snapshot)=> {
            const prods =
                snapshot.docs.map(doc =>
                    ({...doc.data() as ProductType}))
            dispatch(prodsUpd(prods))
        });
        return () => unsubscribe();
    }, []);
}