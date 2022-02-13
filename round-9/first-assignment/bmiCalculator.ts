const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100
    const bmi: number = weight / (heightInMeters^2)

    if (bmi < 16.0){
        return "Underweight (Severe thinness)"
    } else if (bmi < 17.0 && bmi >= 16.0) {
        return "Underweight (Moderate thinness)"
    } else if (bmi < 18.4 && bmi >= 17.0) {
        return "Underweight (Mild thiness)"
    } else if (bmi < 25.0 && bmi >= 18.4) {
        return "Normal (healthy weight)"
    } else if (bmi < 29.9 && bmi >= 25.0) {
        return "Overweight (Pre-obese)"
    } else if (bmi < 34.9 && bmi >= 29.9) {
        return "Obese (Class I)"
    } else if (bmi < 39.9 && bmi >= 34.9) {
        return "Obese (Class II)"
    } else {
        return "Obese (Class III)"
    }
}

//console.log(calculateBmi(180, 74))

interface bmiData {
    height: number
    weight: number
}

const parsingInput = (args: Array<String>): bmiData => {
    if (args.length !== 4) {
        throw new Error ('Too many or not enough arguments!')
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error ('Please use numbers!')
    }
}

try {
    const {height, weight} = parsingInput(process.argv)
    console.log(calculateBmi(height, weight))
} catch (e: unknown) {
    let errorMsg = 'oopise whoopsie: '
    if (e instanceof Error){
        errorMsg += ' Error: ' + e.message
    }
    console.log(errorMsg)
}