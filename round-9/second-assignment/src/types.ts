export type NonLatinDiagnoses = Omit<Diagnosis, ''>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type NonSSNPatients = Omit<Patients, 'ssn' | 'entries'>;
export type NewPatientWithoutId = Omit<Patients, 'id'>;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }

}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
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

export enum Types {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck',
}

/*export enum DiagnosisCodes {
    "M24.2" = "Disorder of ligament",
    "M51.2" = "Other specified intervertebral disc displacement",
    "S03.5" = "Sprain and strain of joints and ligaments of other and unspecified parts of head",
    "J10.1" = "Influenza with other respiratory manifestations, other influenza virus codeentified",
    "J06.9" = "Acute upper respiratory infection, unspecified",
    "Z57.1" = "Occupational exposure to radiation",
    "N30.0" = "Acute cystitis",
    "H54.7" = "Unspecified visual loss",
    "J03.0" = "Streptococcal tonsillitis",
    "L60.1" = "Onycholysis",
    "Z74.3" = "Need for continuous supervision",
    "L20" = "Atopic dermatitis",
    "F43.2" = "Adjustment disorders",
    "S62.5" = "Fracture of thumb",
    "H35.29" = "Other proliferative retinopathy",
    "J12.82" = "Pneumonia due to coronavirus disease"
}*/
//Discharge, NewDiagnosisWithOutId