import {doc, setDoc, getDoc, deleteDoc, collection, getCountFromServer, query, onSnapshot} from 'firebase/firestore'
import {db} from "../configurations/firebase-config.ts";
import type {Category, ProductType} from "../utils/app-types.ts";
import {getRandomNumber} from "../utils/tools.ts";
import productConfig from '../configurations/products-config.json';
import {Observable, Subscriber} from "rxjs";
import {collectionData} from "rxfire/firestore";

export const prodColl = collection(db, "product_collection");
export const categoryColl = collection(db, "category_collection");


export const addProduct = async (product: ProductType) => {
    product.id = getRandomNumber(10000, 99999) + "";
    const ref = doc(prodColl, product.id);
    await setDoc(ref, product);
}

export const addCategory = async (cat: Category) => {
    const ref = doc(categoryColl, cat.categoryName);
    await setDoc(ref, cat);
}

export const removeProduct = async (id: string) => {
    const ref = doc(prodColl, id);
    const removed = await getDoc(ref);
    if (!removed.exists()) throw new Error(`No product with id: ${id}`);

    await deleteDoc(ref)
    return removed.data();
}

export const removeCategory = async (name: string) => {
    const ref = doc(categoryColl, name);
    const remCat = await getDoc(ref);
    if (!remCat.exists()) throw new Error(`Category ${name} not exists`);
    await deleteDoc(ref);
    return remCat.data();
}

export const getProduct = async (id: string) => {
    const ref = doc(prodColl, id);
    const prod = await getDoc(ref);
    if (!prod.exists()) throw new Error(`No product with id: ${id}`);

    return prod.data();
}

export const isCategoryExists = async (name: string) => {
    const ref = doc(categoryColl, name);
    const category = await getDoc(ref);
    return category.exists();
}

export const setProducts = async () => {
    let count = (await getCountFromServer(prodColl)).data().count;
    if (count === 0) {
        const products: ProductType[] = productConfig.map(item => (
            {
                title: item.name,
                category: item.name.split('-')[0],
                unit: item.unit,
                cost: item.cost,
                img: item.name + '.jpg'
            }
        ));
        for (let i = 0; i < products.length; i++) {
            const temp = await isCategoryExists(products[i].category);
            if (!temp)
                await addCategory({categoryName: products[i].category});
            await addProduct(products[i]);
            count++;
        }
    }
    return count;
}

export const getProducts = () => {
    return collectionData(prodColl) as Observable<ProductType[]>
}

export const getProductsRxJs = () => {
    return new Observable((subscriber: Subscriber<ProductType[]>) => {
        const q = query(prodColl);
        const unsubscribe = onSnapshot(q, (snapshot) => {
                const prods =
                    snapshot.docs.map(doc =>
                        ({...doc.data()} as ProductType))
                subscriber.next(prods)
            },
            (err) => subscriber.error(err)
        );
        return () => unsubscribe()
    })
}