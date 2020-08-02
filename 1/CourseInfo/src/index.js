import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.title}</h1>;

const Part = (props) => {
  return (
    <p>
      {props.title} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((p) => (
        <Part title={p.name} exercises={p.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const totals = props.parts.reduce((sum, p) => sum + p.exercises, 0);
  return <p>Number of exercises {totals}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
