import { NewPatientWithoutId, Gender } from "./types"

const isString = (checkedItem: unknown): checkedItem is string => {
    return typeof checkedItem === 'string' || checkedItem instanceof String;
}

const parseString = (item: unknown): string => {

    if (!item || !isString(item)) {
        throw new Error('Error caused by the given string-values!');
    }

    return item;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error ('Error caused by the given date!');
    }

    return date;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Error caused by the given gender!')
    }
     return gender;
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown}

const createNewEntryWithoutId = ({ name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientWithoutId => {
    const newEntry: NewPatientWithoutId = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)

    }

    return newEntry;
}

export default createNewEntryWithoutId