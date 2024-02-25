import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Checkbox } from './components/ui/Checkbox';
import { Input } from '@components/ui/Input';
import useTasks from '@hooks/use-task';
import { NavInfo } from '@components/NavInfo';
const App = () => {
  //TODO: get from local storage initial todos;
  //TODO: add todo, delete todo, update todo;
  //TODO: move to useTodos tsx;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setFocused] = useState(false);

  const handleFocus = () => {
    inputRef && inputRef.current
      ? (inputRef.current.placeholder = 'Type something and press Enter')
      : null;
    setFocused(true);
  };

  const handleBlur = () => {
    inputRef && inputRef.current
      ? (inputRef.current.placeholder = 'press N to add new')
      : null;
    setFocused(false);
  };
  const {} = useTasks();
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Shadcn ui checkbox instead of default input type checkbox',
      completed: false
    },
    { id: 2, text: 'Todo CRUD with localstorage', completed: false },
    { id: 3, text: 'move the crud to use tasks', completed: false },
    { id: 4, text: 'apstract use tasks with use crud?', completed: false },
    { id: 5, text: 'spar - rio mare tuna', completed: false },
    { id: 6, text: 'spar - riblji stapici', completed: false },
    { id: 7, text: 'spar - ecg kuhalo za vodu?', completed: false },
    {
      id: 8,
      text: 'spar - nivea gel za tusiranje, head and shoulders',
      completed: false
    }
  ]);

  const [selectedTodoIndex, setSelectedTodoIndex] = useState(0);
  const selectedTodoIndexRef = useRef(selectedTodoIndex);

  const handleEnter = (inputValue) => {
    console.log(inputValue);
  };

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
      if (inputFocused) return;
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
          if (!inputFocused) e.preventDefault();
          console.log(inputRef);
          inputRef.current.focus();
          break;
        case 'Enter':
          if (inputFocused) e.preventDefault();
          handleEnter(e.target.value);
        case ' ':
          handleSpace(currentIndex);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputFocused]);

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  return (
    <div className='mt-10 min-h-[34rem] w-full  rounded-xl border-[1px] border-black bg-[#dadbd0] p-4 shadow-xl'>
      <NavInfo />
      <br />
      <div className='bg-[#333333] w-full divide-y-[1px] divide-[#a8a8a8]'>
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
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              className='my-2 w-full border-[#9f9f9f] bg-[#dadbd0] text-black'
              ref={inputRef}
              placeholder={'press N to add new'}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </form>
        </div>
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
