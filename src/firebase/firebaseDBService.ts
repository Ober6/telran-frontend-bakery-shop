import { doc, setDoc, getDoc, deleteDoc, collection, getCountFromServer } from 'firebase/firestore';
import { db } from "../configurations/firebase-config.ts";
import type { Category, ProductType } from "../utils/app-types.ts";
import { getRandomNumber } from "../utils/tools.ts";
import productConfig from '../configurations/products-config.json';
import type { WithFieldValue, DocumentData } from 'firebase/firestore';


const prodColl = collection(db, "product_collection");
const categoryColl = collection(db, "category_collection");

async function addItem<T extends DocumentData>(
    coll: typeof prodColl | typeof categoryColl,
    id: string,
    item: WithFieldValue<T>
) {
    const ref = doc(coll, id);
    await setDoc(ref, item);
}

async function removeItem<T>(coll: typeof prodColl | typeof categoryColl, id: string) {
    const ref = doc(coll, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error(`Item with id "${id}" not found`);
    await deleteDoc(ref);
    return snap.data() as T;
}

async function getItem<T>(coll: typeof prodColl | typeof categoryColl, id: string) {
    const ref = doc(coll, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error(`Item with id "${id}" not found`);
    return snap.data() as T;
}

async function exists(coll: typeof prodColl | typeof categoryColl, id: string) {
    const ref = doc(coll, id);
    const snap = await getDoc(ref);
    return snap.exists();
}

export const addProduct = (product: ProductType) => {
    product.id = getRandomNumber(10000, 99999) + "";
    return addItem(prodColl, product.id, product);
}

export const addCategory = (cat: Category) => addItem(categoryColl, cat.categoryName, cat);
export const removeProduct = (id: string) => removeItem<ProductType>(prodColl, id);
export const removeCategory = (name: string) => removeItem<Category>(categoryColl, name);
export const getProduct = (id: string) => getItem<ProductType>(prodColl, id);
export const isCategoryExists = (name: string) => exists(categoryColl, name);

export const setProducts = async () => {
    let count = (await getCountFromServer(prodColl)).data().count;
    if (count === 0) {
        const products: ProductType[] = productConfig.map(item => ({
            title: item.name,
            category: item.name.split('-')[0],
            unit: item.unit,
            cost: item.cost,
            img: item.name + '.jpg'
        }));

        for (const p of products) {
            if (!await isCategoryExists(p.category)) {
                await addCategory({ categoryName: p.category });
            }
            await addProduct(p);
            count++;
        }
    }
    return count;
}
