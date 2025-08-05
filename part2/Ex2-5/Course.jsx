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