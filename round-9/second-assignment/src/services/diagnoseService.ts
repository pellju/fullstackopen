/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import diagnosis from '../../data/diagnoses';
import { NonLatinDiagnoses, Diagnosis } from '../types';

const diagnoseData: Array<Diagnosis> = diagnosis ;

const getEntries = (): Array<Diagnosis> => {
  return diagnoseData;
};

const getNonLatinDiagnoses = (): NonLatinDiagnoses[] => {
    return diagnoseData.map(({code, name}) => ({
        code,
        name
    }));
  };

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonLatinDiagnoses
};