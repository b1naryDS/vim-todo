import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavInfo from './components/NavInfo';
import { Checkbox } from '@/components/ui/Checkbox';
const App = () => {
  //TODO: get from local storage initial todos;
  //TODO: add todo, delete todo, update todo;
  //TODO: move to useTodos tsx;
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Shadcn ui checkbox instead of default input type checkbox',
      completed: false
    },
    { id: 2, text: 'Todo CRUD with localstorage', completed: false },
    { id: 3, text: 'move the crud to use tasks', completed: false },
    { id: 4, text: 'apstract use tasks with use crud?', completed: false }
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
        case 'n':
          //TODO: add new
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
    <div className='mt-10 min-h-[34rem] w-full  rounded-xl border-[1px] border-black bg-[#dadbd0] p-4 shadow-xl'>
      <NavInfo />
      <br />
      <div className='bg-red w-full divide-y-[1px] divide-[#a8a8a8]'>
        {todos.map((todo, index) => (
          <div key={todo.id}>
            <Todo selected={selectedTodoIndex === index}>
              <Checkbox
                id={todo.id}
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
            </Todo>
          </div>
        ))}
        <Todo selected={false}>
          <div>
            press <strong>N</strong> to add new
          </div>
        </Todo>
      </div>
    </div>
  );
};

const Todo = ({ selected, children }) => {
  const base = 'w-full my-1 flex flex-row items-center gap-2 px-4 py-1';
  const t = selected
    ? base + ' bg-[#9c52b3] text-white rounded-md shadow-md'
    : base + '';
  return <div className={t}>{children}</div>;
};
export default App;
