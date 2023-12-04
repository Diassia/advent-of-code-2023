import { getData, dataToArray } from "../utils/getData";

const getGameId = (string: string) => {
    const firstTurnString = string;
    const fullStringArray = firstTurnString.split(" ");
    const getGameIdArray = fullStringArray[1].split(":");
    const gameId = getGameIdArray[0];
    return gameId
}

const splitGameIntoTurnsArray = (string: string) => {
    let gameString = string;
    const removedGameIdArray = gameString.split(":");
    const splitTurnsArray = removedGameIdArray[1].split(";")
    // console.log(splitTurnsArray);
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
    
    console.log('coloured cubes:', numberColourTuple);
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

    if (green > 13 || red > 12 || blue > 14) {
        return false
    } else {
        return true
    }
}

// 12 red cubes, 13 green cubes, and 14 blue cubes

const sumGameIDs = () => {
    // getData('../day2/testFiles/smallTestFilePart1.txt').then((data) => {
    getData('../day2/testFiles/largeTestFilePart1.txt').then((data) => {
        const array = dataToArray(data);
        // console.log('Array: ',array);
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            const gameId = getGameId(array[i]);
            const arraySplitIntoTurns = splitGameIntoTurnsArray(array[i]);
            // console.log("array split into turns: ", arraySplitIntoTurns);

            let numberOfPossibleTurns = 0;

            for(let i = 0; i < arraySplitIntoTurns.length; i++) {
                const isTheTurnPossible = calculateTurn(arraySplitIntoTurns[i]);
                if (isTheTurnPossible) {
                    console.log(`Game ID ${gameId}, Turn ${i + 1} is possible`);
                    numberOfPossibleTurns += 1;
                } else {
                    console.log(`Game ID ${gameId}, Turn ${i + 1} is NOT possible`);
                }
            }

            console.log('Game ID: ', gameId);
            if (numberOfPossibleTurns == arraySplitIntoTurns.length) {
                sum = sum + Number(gameId);
            }

        }
        console.log(sum);
    })
}

sumGameIDs();