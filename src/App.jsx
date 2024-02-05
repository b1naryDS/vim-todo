import React, { useState, useEffect } from 'react';
import './App.css'
const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false },
    { id: 5, text: 'Task 5', completed: false },
    { id: 6, text: 'Task 6', completed: false },
    { id: 7, text: 'Task 7', completed: false },
  ]);

  const [selectedTodoIndex, setSelectedTodoIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'j':
          setSelectedTodoIndex((prevIndex) =>
            prevIndex < todos.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case 'k':
          setSelectedTodoIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [todos]);

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
      <>

      j for down,<br/>
      k for up,<br/>
      space for checking,<br/>
      enter for more info<br/>
    n for new todo<br/>
      <br/>
    <div className="bg-red w-full" >
      {todos.map((todo, index) => (
        <div className="w-full"  key={todo.id}>
          {selectedTodoIndex === index ? <span className="inline-block w-[13px]">*</span> : <span className="inline-block w-[13px]"></span>}
          <input
            className="w-[30px]"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(index)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        </div>
      ))}
      <p>Selected Index: {selectedTodoIndex}</p>
    </div></>
  );
};
export default App
