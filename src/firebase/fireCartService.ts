import {doc, setDoc, getDoc, deleteDoc} from 'firebase/firestore'
import {db} from "../configurations/firebase-config.ts";
import type {ShopCartProdType} from "../utils/app-types.ts";
import {collection, onSnapshot, query} from "firebase/firestore";

const getCartRef = (uid: string, prodId: string) => doc(db, "users", uid, "cart", prodId);

export const addProductToCart = async (uid: string, product: ShopCartProdType) => {
    const ref = getCartRef(uid, product.prodId);
    await setDoc(ref, product);
};

export const removeProductFromCart = async (uid: string, prodId: string): Promise<ShopCartProdType | null> => {
    const ref = getCartRef(uid, prodId);
    const temp = await getDoc(ref);
    if (temp.exists()) {
        const data = temp.data() as ShopCartProdType;
        await deleteDoc(ref);
        return data;
    }
    return null;
};

export const addProductUnitToCart = async (uid: string, prodId: string) => {
    const ref = getCartRef(uid, prodId);
    const temp = await getDoc(ref);
    const product = temp.data() as ShopCartProdType | undefined;
    const count = product?.count ?? 0;
    await addProductToCart(uid, {prodId, count: count + 1});
};

export const removeProductUnitFromCart = async (uid: string, prodId: string) => {
    const ref = getCartRef(uid, prodId);
    const temp = await getDoc(ref);
    if (!temp.exists()) return;
    const product = temp.data() as ShopCartProdType;
    if (product.count > 0) {
        await addProductToCart(uid, {prodId, count: product.count - 1});
    }
};

export const subscribeToCart = (uid: string, callback: (cart: ShopCartProdType[]) => void) => {
    const q = query(collection(db, "users", uid, "cart"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const cart: ShopCartProdType[] = snapshot.docs.map(doc => doc.data() as ShopCartProdType);
        callback(cart);
    });
    return unsubscribe;
};