import * as fs from 'fs'

export const getData = async (filePath: string) => {
    const data = await fs.readFileSync(filePath, 'utf8');
    return data
}

export const dataToArray = (data: any) => {
    const array = [...data.split("\n")]
    return array
}