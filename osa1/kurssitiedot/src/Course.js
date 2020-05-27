import React from 'react'


const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = (props) => {

  const total = props.course.parts.reduce((s, p) => {
    // console.log('s: ', s, '---', 'p: ', p.exercises);
    return s + p.exercises
  }, 0)
  // console.log('total: ', total)
  return <p><strong>Number of exercises {total}</strong></p>;
};

const Course = ({ courses }) => {
  return (
    <div>
    {courses.map(course => {
      return (
        <div key={course.id}>
      
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
        </div>)
    })}
    </div>
  );
};

export default Course;