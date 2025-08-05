const Course = ({course}) => {
    return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
  }
  
  const Header = ({course}) => {
    return <h1>{course}</h1>
  }
  
  const Content = ({parts}) => {
    return (
      parts.map(part => 
        <div key ={part.id}>
          <Part name={part.name} exercises={part.exercises} />
        </div>)
    )
  }
  
  const Part = ({name,exercises}) => {
    return (
          <p>{name} {exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((accumulator,currentItem) => {
      return accumulator + currentItem.exercises;
    },0)
  return (
    <b>Total of {total} exercises</b>
  )
  }
  
  const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
    return (
      <div>
        {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    )
  }
  
  export default App