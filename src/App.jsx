import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavInfo from './components/NavInfo';
const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task example writing something longer', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false },
    { id: 5, text: 'Task 5', completed: false },
    { id: 6, text: 'Task 6', completed: false },
    { id: 7, text: 'Task 7', completed: false }
  ]);

  const [selectedTodoIndex, setSelectedTodoIndex] = useState(0);
  const selectedTodoIndexRef = useRef(selectedTodoIndex);

  useEffect(() => {
    selectedTodoIndexRef.current = selectedTodoIndex;
  }, [selectedTodoIndex]);
  useEffect(() => {
    const handleSpace = (ind) => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo, index) => {
          return index === ind ? { ...todo, completed: !todo.completed } : todo;
        });
      });
    };

    const handleKeyDown = (e) => {
      const currentIndex = selectedTodoIndexRef.current;
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
        case ' ':
          handleSpace(currentIndex);
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className='h-full w-full'>
      <NavInfo />
      <br />
      <div className='bg-red w-full'>
        {todos.map((todo, index) => (
          <Todo selected={selectedTodoIndex === index} key={todo.id}>
            <>
              <span className='inline-block w-[13px]'>
                {selectedTodoIndex === index ? '*' : null}
              </span>

              <input
                className='w-[30px] m-1'
                type='checkbox'
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
              >
                {todo.text}
              </span>
            </>
          </Todo>
        ))}
      </div>
    </div>
  );
};

const Todo = ({selected, children}) => {
    const base = 'w-full my-1 flex flex-row gap-2 px-4 py-1';
  const t = selected ? base + ' bg-[#9c52b3] text-white rounded-md shadow-md' : base + '';
  return <div className={t}>{children}</div>;
};
export default App;
