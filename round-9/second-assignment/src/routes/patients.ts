/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientService from '../services/patientService';
import { NewPatientWithoutId, Patients } from '../types';
import {createNewPatientWithoutId, } from '../utils';

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
});

router.get('/', (_req, res) => {
    res.send(patientService.getNonSSNPatients());
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    //tarkista että potilas löytyy tältä ID:ltä
    console.log(req.body); //ok, toimii
    res.send("!!");
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMsg = errorMsg + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry: NewPatientWithoutId = createNewPatientWithoutId(req.body);
    const addedEntry: Patients = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMsg = errorMsg + error.message;
    }
    res.status(400).send(errorMsg);
  }
  
});

export default router;