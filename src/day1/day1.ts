import { dataToArray, getData } from '../utils/getData'

const isNumber = (value: string) => {
    const parseString = parseInt(value);
    if (typeof parseString === "number" && !isNaN(parseString)) {
        return true;
    }
}

const removeLettersFromArray = (array: any[]) => {
    const mixedArray = array;
    let numberArray: number[] = [];
    for (let i = 0; i < mixedArray.length; i++) {
        if (isNumber(array[i])) {
            numberArray.push(array[i]);
        }
    }
    return numberArray
}
 
const sumFirstLastDigit = () => {
    getData('../day1/testFiles/largeTestFilePart1.txt').then((data) => {
        const array = dataToArray(data);
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            const numberArray = removeLettersFromArray(array[i]);
            const lastNumber = numberArray.slice(-1)[0];
            const result = numberArray[0] + lastNumber
            sum = sum + Number(result);
        }
        console.log(sum);
    })
}

sumFirstLastDigit();