import React from 'react';
import { coursePartList } from '../types/types';

const Total = (props: coursePartList) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {props.list.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>
    )
}

export default Total