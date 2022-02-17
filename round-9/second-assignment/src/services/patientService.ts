import patientEntries from '../../data/patients';
import { Patients, NonSSNPatients } from '../types';

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSSNPatients
};