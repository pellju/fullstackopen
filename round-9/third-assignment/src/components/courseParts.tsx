import React from "react";
import { CoursePart, coursePartList } from "../types/types";

const assertNever = (value: never): never => {
    throw new Error (
      `There seems to be an error with the given value: ${JSON.stringify(value)}`
    );
}

const switchFunction = (item: CoursePart) => {
    switch (item.type) {
      case "normal":
        return (<div>
          <p><b>{item.name} {item.exerciseCount}</b></p>
          <p>{item.description}</p>
        </div>)
  
      case "groupProject":
        return(<div>
          <p><b>{item.name} {item.exerciseCount}</b></p>
          <p>Project exercises: {item.groupProjectCount}</p>
        </div>)
      
      case "submission":
        return(<div>
          <p><b>{item.name} {item.exerciseCount}</b></p>
          <p>{item.description} {item.exerciseSubmissionLink}</p>
        </div>)
      case "special":
        return(<div>
          <p><b>{item.name} {item.exerciseCount}</b></p>
          <p>{item.description}</p>
          required skills:
            {item.requirements.map(requirement => 
              <div key={requirement}>{requirement}</div>  
            )}
        </div>)
  
      default:
          return assertNever(item);
    }
}
  
export const CourseParts = (props: coursePartList) => {
    return (
      <div>
        {props.list.map(item => 
          <div key={item.name}>{switchFunction(item)}</div>
        )}
      </div>
    )
}