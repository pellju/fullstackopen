/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewPatientWithoutId, Gender, Types, DiagnosisCodes, Discharge, NewDiagnosisWithOutId } from "./types";

const isString = (checkedItem: unknown): checkedItem is string => {
    return typeof checkedItem === 'string' || checkedItem instanceof String;
};

const parseString = (item: unknown): string => {

    if (!item || !isString(item)) {
        throw new Error('Error caused by the given string-values!');
    }

    return item;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error ('Error caused by the given date!');
    }

    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Error caused by the given gender!');
    }
    return gender;
};

const isType = (param: any): param is Types => {
    return Object.values(Types).includes(param);
};

const parseType = (givenType: unknown): Types => {
    if (!givenType || !isType(givenType)) {
        throw new Error ('Error caused by the given entry type!');
    }
    return givenType;
};

const isDiagnosisCode = (param: any): param is DiagnosisCodes => {
    return Object.values(DiagnosisCodes).includes(param);
};

const parseDiagnosisCodes = (codes: unknown): DiagnosisCodes[] => {
    console.log(typeof codes);
    return typeof codes === 'DiagnosisCodes[]' || codes instanceof DiagnosisCodes[];
};

const parseDischarge = (discharge: unknown): Discharge => {

};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};
type DiagnosisFields = { date: unknown, type: unknown, specialist: unknown, diagnosisCodes: unknown, description: unknown, discharge: unknown};

const createNewEntryWithoutId = ({ name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientWithoutId => {
    const newEntry: NewPatientWithoutId = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: []
    };

    return newEntry;
};

const addNewHospitalDiagnosisToPatient = ({date, type, specialist, diagnosisCodes, description, discharge}: DiagnosisFields): NewHospitalDiagnosisWithOutId => {
    const newEntry: NewDiagnosisWithOutId = {
        date: parseDate(date),
        type: parseType(type), //!
        specialist: parseString(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes), //!
        description: parseString(description),
        discharge: parseDischarge(discharge)
    };

    return newEntry;
};

export default {createNewEntryWithoutId, addNewHospitalDiagnosisToPatient};