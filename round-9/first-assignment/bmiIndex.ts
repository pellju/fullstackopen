import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  
  if (weight === undefined || height === undefined) {
      res.status(400).send({ Error: "Please use correct parameters only!"});
  }

  const resultData = calculateBmi(Number(height), Number(weight));
  const result = {
      weight: weight,
      height: height,
      bmi: resultData
  };
  res.send(result);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body;
    const daily_exercises: number[] = body.daily_exercises;
    const target: number = body.target;

    if (target === undefined || daily_exercises === undefined){
        res.status(400).send({ error: "parameters missing"});
    }

    function checkIfNaN(element: number) {
        return isNaN(element);
    }

    if (isNaN(target) || daily_exercises.some(checkIfNaN)) {
        res.status(400).send({ error: "malformatted parameters"});
    } else {
        const calculatedExercises = calculateExercises(daily_exercises,target);
        res.send(calculatedExercises);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});