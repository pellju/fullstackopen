/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Diagnosis, Patients } from "../types";
import { State } from "../state";


import 'semantic-ui-css/semantic.min.css';  


const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnosis }, _dispatch] = useStateValue();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const wantedPatient: Patients = patients[`${id}`];

    if (wantedPatient === undefined) {
        return (
            <div>
                Unknown person...
            </div>
        );
    } else {
        const diagnoseCodes: string[] = [];
        wantedPatient.entries.forEach(entry => {
            entry.diagnosisCodes?.forEach(code => {
                diagnoseCodes.push(code);
            });
        });
        
        const validDiagnoses: Diagnosis[] = [];
        for (const i in diagnosis) {
            if (diagnoseCodes.includes(diagnosis[i].code)) {
                validDiagnoses.push(diagnosis[i]);
            }
        }

        return (
            <div>
                <h1>{wantedPatient.name}</h1>
                <p>Gender: {wantedPatient.gender}</p>
                <p>Birthday: {wantedPatient.dateOfBirth}</p>
                <p>Occupation: {wantedPatient.occupation}</p>
                <h3>Entries:</h3>
                {wantedPatient.entries.map(entry =>
                    <div key={entry.id}> 
                        <div>{entry.date} - <i>{entry.description}</i></div>
                        <ul>
                            {validDiagnoses.map(diagnose => 
                                <li key={diagnose.code}>{diagnose.code} - {diagnose.name}</li>
                            )}
                        </ul>
                    </div>  
                )}
            </div>
        );
    }
};

export default PatientInfo;