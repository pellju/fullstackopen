import diagnoses from '../../data/diagnoses';
import { NonLatinDiagnoses, Diagnoses } from '../types';

const diagnoseData: Array<Diagnoses> = diagnoses ;

const getEntries = (): Array<Diagnoses> => {
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