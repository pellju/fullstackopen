import patientEntries from '../../data/patients';
import { Patients, NonSSNPatients, NewPatientWithoutId } from '../types';
import {v1 as uuid} from 'uuid';

const patientData: Array<Patients> = patientEntries ;

const getEntries = (): Array<Patients> => {
  return patientData;
};

const getNonSSNPatients = (): NonSSNPatients[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (newPatient: NewPatientWithoutId): Patients => {
  
  const newEntry: Patients = {
    id: uuid(),
    ...newPatient
  } 
  patientEntries.push(newEntry)
  return newEntry;
};

const getPatientData = (id: string) => {
  const wantedPatient = patientData.find(patient => patient.id === id)

  if (!wantedPatient || wantedPatient === undefined) {
    throw new Error ('Patient not found!');
  }

  return wantedPatient;
} 

export default {
  getEntries,
  addEntry,
  getNonSSNPatients,
  getPatientData
};