import {getEcho, getRandomNumber} from "../src/utils/tools";

describe('BakeryShop project tests', () => {
    let arr:number[];

    beforeEach(() => {
        arr = [1,2,3]
    })

    test('Positive test: tools.getRandomNumber', () => {
        expect(getRandomNumber(1,2)).toBe(1);
        expect(getRandomNumber(1,10)).toBeLessThan(10);
        expect(getRandomNumber(1,10)).not.toBeGreaterThan(10);
    })

    test('Test: arrays', () => {
        expect(arr.length).toBe(3)
    })

    test('Test: tools:getEcho', async () => {
        await expect(getEcho("Hello")).resolves.toBe("Hello");
        await expect(getEcho("")).rejects.toThrow("Error!")
    })

})