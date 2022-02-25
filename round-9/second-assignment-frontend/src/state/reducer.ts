/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { State } from "./state";
import { Diagnosis, Patients } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patients[];
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis[];
    }
  |{
      type: "ADD_PATIENT";
      payload: Patients;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (code, name) => ({ ...code, [name.code]: name})
          )
        }
      };
    default:
      return state;
  }
};
