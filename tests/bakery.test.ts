import { app } from "../src/configurations/firebase-config";
import {addCategory, isCategoryExists, removeCategory} from "../src/firebase/firebaseDBService";
import {deleteApp} from 'firebase/app';


describe('BakeryShop tests', () => {
    let categories:string[];

    beforeAll(async () => {
        categories = [
            "biscuits", "bread", "cake", "croissants", "pizza", "pretzels", "sweets", "tart",
        ];
        for(const cat of categories) {
            const doesExist = await isCategoryExists(cat);
            if(!doesExist) await addCategory({categoryName:cat});
        }
        await removeCategory("donuts");
    })

    afterAll(async () => {
        await deleteApp(app);
    });

    test('Test:firebaseDBService.isCategoryExists', ()=>{
        expect(isCategoryExists('bread')).resolves.toBeTruthy();
        expect(isCategoryExists('milk')).resolves.toBeFalsy();
    })

    test('Test:all categories exists', async ()=>{
       await expect(
           Promise
               .all(categories.map(isCategoryExists))
               .then(x => x.every(Boolean))
       ).resolves.toBe(true);
    });

    test('Test: remove category', async ()=>{
        await expect(isCategoryExists("cake")).resolves.toBe(true);
        await removeCategory("cake");
        await expect(isCategoryExists("cake")).resolves.toBe(false);
    })

    test('Test: add category', async () =>{
        await expect(isCategoryExists('donuts')).resolves.toBe(false);
        await addCategory({categoryName:"donuts"});
        await expect(isCategoryExists('donuts')).resolves.toBe(true);
    })
})