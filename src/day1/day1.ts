import { dataToArray, getData } from '../utils/getData'

const isNumber = (value: string) => {
    const parseString = parseInt(value);
    if (typeof parseString === "number" && !isNaN(parseString)) {
        return true;
    }
}

// type LetterNumberString = {
//     [key:string]: string
// }
// const letterNumbersString: LetterNumberString = {
//     one: '1',
//     two: '2',
//     three: '3',
//     four: '4',
//     five: '5',
//     six: '6',
//     seven: '7',
//     eight: '8',
//     nine: '9'
// }

type LetterNumber = {
    [key:string]: number
}
const letterNumbers: LetterNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

// const getWordedNumbers = (stringParam: string): string => {
//     let searchString = stringParam;
//     const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
//     let numbersFoundAtIndices: number[] = numbers.map(n => searchString.indexOf(n));
//     let numbersStillLeft: boolean = numbersFoundAtIndices.some(n => n > -1);
//     while (numbersStillLeft) {
//         let lowestCurrentIndex: number = -1;
//         let lowestCurrentValue: number = Number.MAX_SAFE_INTEGER;
//         for (let i = 0; i < numbersFoundAtIndices.length; i++) {
//             if (numbersFoundAtIndices[i] !== -1) {
//                 const thisNumberIsTheLowestSeen: boolean = numbersFoundAtIndices[i] < lowestCurrentValue;
//                 if (thisNumberIsTheLowestSeen) {
//                     lowestCurrentIndex = i;
//                     lowestCurrentValue = numbersFoundAtIndices[i];
//                 }
//             }
//         }
//         searchString = searchString.replace(numbers[lowestCurrentIndex], letterNumbersString[numbers[lowestCurrentIndex]]);
//         numbersFoundAtIndices = numbers.map(n => searchString.indexOf(n));
//         numbersStillLeft = numbersFoundAtIndices.some(n => n > -1);
//     }
//     return searchString;
// }

// const removeLetters = (array: any[] | string) => {
//     const mixedArray = array;
//     let numberArray: number[] = [];
//     for (let i = 0; i < mixedArray.length; i++) {
//         if (isNumber(array[i])) {
//             numberArray.push(array[i]);
//         }
//     }
//     return numberArray
// }

const mapNumbers = (stringArray: any[]) => {
    return stringArray.map(n => {
        if (isNumber(n)) {
            return Number(n)
        } else {
            return letterNumbers[n]
        }
    })
}

const getNumbers = (str: string) => {
    let r = /(?=one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9)/g;
    let rExtract = /(?:.*?)(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9)/;
    let res = [];
    let m;

    do { 
        m = r.exec(str); 
        if(m) {
            let mExtract = rExtract.exec(str.slice(m.index));
            if (mExtract) {
                res.push(mExtract[1]);
            } else {
            }
            r.lastIndex++;
        } 
    } while(m !== null)
    
    return [res[0], res.slice(-1)];
}
 
const sumFirstLastDigit = () => {
    // getData('../day1/testFiles/smallTestFilePart2.txt').then((data) => {
    getData('../day1/testFiles/largeTestFilePart2.txt').then((data) => {
        const array = dataToArray(data);
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            // const wordsToNumbersString = getWordedNumbers(array[i]);
            // const removedLettersString = removeLetters(wordsToNumbersString);
            // const wordsToNumbersArray = getNumbers(array[i]);
            const mappedString = mapNumbers(getNumbers(array[i]));
            console.log('mappedString', mappedString);
            const lastNumber = mappedString.slice(-1)[0];
            const result = Number(String(mappedString[0]) + String(lastNumber));
            sum = sum + result;
        }
        console.log(sum);
    })
}

sumFirstLastDigit();