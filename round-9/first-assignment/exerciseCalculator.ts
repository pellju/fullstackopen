export const calculateExercises = (dataArray: number[], target: number) => {

    if (dataArray.some(value => isNaN(value)) || isNaN(target)) {
        throw new Error ('Please use numbers.');
    }

    const trainingDays = dataArray.filter(day => day > 0);
    const sum = dataArray.reduce(function (a: number, b: number) {
        return a + b;
    }, 0);
    const average = sum / dataArray.length;

    let rating = 0;
    if (average > target){
        rating = 2;
    } else if (average > 1) {
        rating = 1;
    }

    let ratingDescription = "ooo this is bad t. Heavyweaponsguy";
    if (rating === 2) {
        ratingDescription = "Well done! You have exceeded your target per day!";
    } else if (rating === 1) {
        ratingDescription = "Well done! Over one hour per day!";
    }

    const extractedData = {
        periodLength: dataArray.length,
        trainingDays: trainingDays.length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };

    return extractedData;
};

//console.log(calculateExercises([3,0,2,4.5,0,3,1], 2))

interface exerciseData {
    data: number[]
    target: number
}

const parseInput = (args: Array<string>): exerciseData => {
    if (args.length < 2) {
        throw new Error ('Not enough arguments!');
    }

    if (!isNaN(Number(args[2]))) {
        const target = Number(args[2]);
        let data: number[] = [];
        if (args.length > 4){
            for (let i=3; i<args.length; i++) {
                data = data.concat(Number(args[i]));
            }
        }
        return {
            data: data,
            target: target
        };
    } else {
        throw new Error ('Please use numbers!');
    }
};

try {
    const {data, target} = parseInput(process.argv);
    console.log(calculateExercises(data, target));
} catch (e: unknown) {
    let errorMsg = 'oopise whoopsie: ';
    if (e instanceof Error){
        errorMsg += ' Error: ' + e.message;
    }
    console.log(errorMsg);
}