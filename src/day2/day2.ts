import { getData, dataToArray } from "../utils/getData";

const splitGameIntoTurnsArray = (string: string) => {
    let gameString = string;
    const removedGameIdArray = gameString.split(":");
    const splitTurnsArray = removedGameIdArray[1].split(";")
    return splitTurnsArray;
}

const getNumberColourTuple = (string: string) => {
    let colouredCubes = string;
    let numberOfCubes: number = 0;
    let colour: string = '';        
    
    const colouredCubesArray = colouredCubes.split(" ");
    numberOfCubes = Number(colouredCubesArray[1]);
    colour = colouredCubesArray[2];
    const numberColourTuple: [number, string] = [numberOfCubes, colour];
    
    return numberColourTuple
}

const calculateTurn = (string: string) => {
    const turnString = string;
    const colouredCubeArray = turnString.split(",");

    let green: number = 0;
    let red: number = 0;
    let blue: number = 0;

    for (let i = 0; i < colouredCubeArray.length; i++) {
        const colouredCubeTuple = getNumberColourTuple(colouredCubeArray[i]);
        const number = colouredCubeTuple[0];
        const colour = colouredCubeTuple[1];
        if (colour == "green") { green += number };
        if (colour == "red") { red += number };
        if (colour == "blue") { blue += number };
    }
    return [{green: green, red: red, blue: blue}]
}

const sumGameIDs = () => {
    // getData('../day2/testFiles/smallTestFilePart1.txt').then((data) => {
    getData('../day2/testFiles/largeTestFilePart2.txt').then((data) => {
        const array = dataToArray(data);
        let sum = 0;
        let greenCubes = 0;
        let redCubes = 0;
        let blueCubes = 0;

        for (let i = 0; i < array.length; i++) {
            const arraySplitIntoTurns = splitGameIntoTurnsArray(array[i]);

            for(let i = 0; i < arraySplitIntoTurns.length; i++) {
                const [cubes] = calculateTurn(arraySplitIntoTurns[i]);

                if (greenCubes < cubes.green) {
                    greenCubes = cubes.green
                }
                if (blueCubes < cubes.blue) {
                    blueCubes = cubes.blue
                }
                if (redCubes < cubes.red) {
                    redCubes = cubes.red
                }
            }

            sum = sum + (greenCubes * redCubes * blueCubes);

            greenCubes = 0;
            redCubes = 0;
            blueCubes = 0;

        }
        console.log(sum);
    })
}

sumGameIDs();