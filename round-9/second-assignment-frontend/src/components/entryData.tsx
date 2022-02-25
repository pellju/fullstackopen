/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-for-in-array */
import React from "react";
import { Diagnosis, Entry } from "../types";

import 'semantic-ui-css/semantic.min.css';  

const getEntryArray: Diagnosis[] = (wantedEntry: Entry, diagnosis: Diagnosis[]) => {
    const diagnoseCodes: string[] = [];
    wantedEntry.diagnosisCodes?.forEach(code => {
        diagnoseCodes.push(code);
    });
    
    const validDiagnoses: Diagnosis[] = [];
    for (const i in diagnosis) {
        if (diagnoseCodes.includes(diagnosis[i].code)) {
            validDiagnoses.push(diagnosis[i]);
        }
    }
    /*diagnosis.forEach(diagnose => {
        if (diagnoseCodes.includes(diagnose.code)) {
            validDiagnoses.push(diagnose);
        }
    });*/

    return validDiagnoses;
};

const BasicData = (props: { givenEntryArray: Diagnosis[]; entry: Entry; }) => {
    const givenEntryArray: Diagnosis[] = props.givenEntryArray;
    const entry: Entry = props.entry;
    return ( 
        <div class='ten wide column'>
            <div>{entry.type} - {entry.date} - <i>{entry.description}</i></div>
            <ul>
                {givenEntryArray.map(diagnose => 
                    <li key={diagnose.code}>{diagnose.code} - {diagnose.name}</li>
                )}
            </ul>
        </div>
    );
};

const HospitalEntry = (entry: Entry, diagnosis: Diagnosis[]) => {
    const entryArray: Diagnosis[] = getEntryArray(entry, diagnosis);

    return (
        <div key={entry.id} class='ui padded centered black grid'>
            <div class="grey column">
                <BasicData givenEntryArray={entryArray} entry={entry} />
            </div>
        </div>
    );
};

const OccupationalEntry = (entry: Entry, diagnosis: Diagnosis[]) => {
    const entryArray: Diagnosis[] = getEntryArray(entry, diagnosis);

    return (
        <div key={entry.id} class='ui padded centered grid'>
            <div class="olive column">
                <BasicData givenEntryArray={entryArray} entry={entry} />
            </div>
        </div>
    );
};

const HealthCheckEntry = (entry: Entry, diagnosis: Diagnosis[]) => {
    const entryArray: Diagnosis[] = getEntryArray(entry, diagnosis);

    return (
        <div key={entry.id} class='ui padded centered grid'>
            <div class="blue column">
                <BasicData givenEntryArray={entryArray} entry={entry} />
            </div>
        </div>
    );
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EntryDetails = ( entry: Entry, diagnosis: Diagnosis[] ) => {
    switch (entry.type) {
        case "Hospital":
            return HospitalEntry(entry, diagnosis);
        case "OccupationalHealthcare":
            return OccupationalEntry(entry, diagnosis);
        case "HealthCheck":
            return HealthCheckEntry(entry, diagnosis);
        default:  
            return assertNever(entry);
    }
};

export default EntryDetails;