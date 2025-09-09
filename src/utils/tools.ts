export const getRandomNumber = (from: number, to: number) => {
    return Math.trunc(Math.random()*(to-from)) + from;
}