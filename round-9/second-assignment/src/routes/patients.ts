import express from 'express';
import patientService from '../services/patientService';
import createNewEntryWithoutId from '../utils'

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patientData = patientService.getPatientData(id);
    res.send(patientData);
  } catch (error: unknown) {
    let errorMsg = 'Misspelled id?';
    if (error instanceof Error) {
      errorMsg = errorMsg + error.message;
    }
    res.status(400).send(errorMsg);
  }
})

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
    res.status(400).send(errorMsg);
  }
  
});

export default router;