import React from "react"

const Total = ({ parts }) => {
    const sum = parts.reduce((acc,part)=>acc+=part.exercises,0)
    return(
      <b>Number of exercises {sum}</b>
    ) 
  }

  export default Total
