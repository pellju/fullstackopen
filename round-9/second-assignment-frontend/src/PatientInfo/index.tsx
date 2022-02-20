import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { State } from "../state";


import 'semantic-ui-css/semantic.min.css'  


const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const wantedPatient = patients[`${id}`]
    console.log(wantedPatient)

    if (wantedPatient === undefined) {
        return (
            <div>
                Unknown person...
            </div>
        )
    } else {
        return (
            <div>
                <p><h1>{wantedPatient.name}</h1></p>
                <p>Gender: {wantedPatient.gender}</p>
                <p>Birthday: {wantedPatient.dateOfBirth}</p>
                <p>Occupation: {wantedPatient.occupation}</p>
            </div>
        );
    }
};

export default PatientInfo;