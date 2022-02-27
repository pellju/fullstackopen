/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewPatientWithoutId, Diagnosis, Gender, Discharge, NewHospitalEntryWithoutId } from "./types";

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
      if (!listOfCodes || !isValidArray(listOfCodes)) {
        throw new Error ("Problem with the diagnosisCodes given!");
      }
      if ((listOfCodes as Array<Diagnosis['code']>).length === 0) {
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

const addNewHospitalEntryToPatient = ({date, specialist, diagnosisCodes, description, discharge}: DiagnosisFields): NewHospitalEntryWithoutId => {
    const newEntry: NewHospitalEntryWithoutId = {
        date: parseDate(date),
        type: 'Hospital',
        specialist: parseString(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        description: parseString(description),
        discharge: parseDischarge(discharge)
    };

    return newEntry;
};

export default {createNewEntryWithoutId, addNewHospitalEntryToPatient};