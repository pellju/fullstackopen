/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewPatientWithoutId, Diagnosis, Gender, Discharge, Entry, sickLeave, HealthCheckRating } from "./types";
import {parse, v1 as uuid} from 'uuid';

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

const isValidDischarge = (param: unknown): param is Discharge => {
    return (param as Discharge).date !== undefined && typeof (param as Discharge).date === "string" 
    && (param as Discharge).criteria !== undefined && typeof (param as Discharge).criteria === "string"
    && isDate((param as Discharge).date); 
}

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isValidDischarge(discharge)) {
        throw new Error ('Problems with discharge!');
    }
    
    const newItem: Discharge = {
        date: (discharge as Discharge).date,
        criteria: (discharge as Discharge).criteria,
    }
    return newItem;
};

const isValidArray = (param: unknown): param is Array<Diagnosis['code']> => {
    return (param as Array<Diagnosis['code']>) !== undefined
  };
  
const parseDiagnosisCodes = (listOfCodes: unknown): Array<Diagnosis['code']> => {
    if (!listOfCodes || !isValidArray(listOfCodes) || (listOfCodes as Array<Diagnosis['code']>).length === 0) {
        return [];
    } else {
        const newList: Array<Diagnosis['code']> = [];
        let i = 0;
        while ((listOfCodes as Array<Diagnosis['code']>)[i] !== undefined) {
          newList.push((listOfCodes as Array<Diagnosis['code']>)[i]);
          i++;
        }
        return newList;
    }
};

const parseSickLeave = (sickleave: unknown): sickLeave => {
    if (!sickleave || !parseDate((sickleave as sickLeave).startDate) || !parseDate((sickleave as sickLeave).endDate)) {
        return {
            startDate: "-",
            endDate: "-"
        }
    }
    const checkedSickLeave = {
        startDate: (sickleave as sickLeave).startDate,
        endDate: (sickleave as sickLeave).endDate
    };
    return checkedSickLeave;
};

const parseHealthCheckRating = (hcr: unknown): HealthCheckRating => {
    if (!hcr || !parseString(hcr)) {
        throw new Error ("Problem with the given health check rating!");
    }

    switch ((hcr as string)) {
        case 'Healthy':
            return 0;
        case 'LowRisk':
            return 1;
        case 'HighRisk':
            return 2;
        case 'CriticalRisk':
            return 3;
        default:
            throw new Error ("Invalid value with the given health check rating!");
    }
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};
type DiagnosisFields = { date: unknown, type: unknown, specialist: unknown, diagnosisCodes: unknown, description: unknown, discharge: unknown, employerName: unknown, sickLeave: unknown, healthCheckRating: unknown};

export const createNewPatientWithoutId = ({ name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientWithoutId => {
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

export const addNewEntryToPatient = ({date, type, specialist, diagnosisCodes, description, discharge, employerName, sickLeave, healthCheckRating}: DiagnosisFields): Entry => {
    if (!parseString(type)) {
        throw new Error ('Not sure about the type?');
    }
    
    switch (type) {
        case 'Hospital':
            return {
                id: uuid(),
                date: parseDate(date),
                type: 'Hospital',
                specialist: parseString(specialist),
                diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                description: parseString(description),
                discharge: parseDischarge(discharge)
            }
        case 'OccupationalHealthcare':
            return {
                id: uuid(),
                date: parseDate(date),
                type: 'OccupationalHealthcare',
                specialist: parseString(specialist),
                diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                description: parseString(description),
                employerName: parseString(employerName),
                sickLeave: parseSickLeave(sickLeave)
            }
        case 'HealthCheck':
            return {
                id: uuid(),
                date: parseDate(date),
                type: 'HealthCheck',
                specialist: parseString(specialist),
                diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                description: parseString(description),
                healthCheckRating: parseHealthCheckRating(healthCheckRating)
            }
        default:
            throw new Error ('Unknown type.');
    }
};