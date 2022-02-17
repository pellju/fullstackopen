import express from 'express';
import patientService from '../services/patientService';
import {NewPatientWithoutId} from '../types'
import createNewEntryWithoutId from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSSNPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = createNewEntryWithoutId(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMsg = errorMsg + error.message;
    }
    res.status(400).send(errorMsg)
  }
  
});

export default router;