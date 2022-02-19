export type NonLatinDiagnoses = Omit<Diagnoses, ''>;

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export type NonSSNPatients = Omit<Patients, 'ssn' | 'entries'>;
export type NewPatientWithoutId = Omit<Patients, 'id'>

export interface Entry {

}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}