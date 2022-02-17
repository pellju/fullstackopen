export type NonLatinDiagnoses = Omit<Diagnoses, ''>;

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export type NonSSNPatients = Omit<Patients, ''>;
export type NewPatientWithoutId = Omit<Patients, 'id'>

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}