import { useState, useEffect, useRef, createContext, useContext } from 'react';
import initialTodos from './initialTodos';

const TodosContext = createContext();

function TodosProvider({ children }) {
  const [todos, setTodos] = useState(function () {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos === '[]') return initialTodos;

    return storedTodos ? JSON.parse(storedTodos) : initialTodos;
  });

  const [todo, setTodo] = useState('');

  const [sortBy, setSortBy] = useState('all');

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [lightMode, setLightMode] = useState(function () {
    const lightMode = localStorage.getItem('lightMode') === 'true';
    return lightMode ? lightMode : false;
  });

  useEffect(() => {
    const body = document.querySelector('body');

    if (lightMode === true) {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('lightMode', true);
    } else {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('lightMode', false);
    }
  }, [lightMode]);

  useEffect(
    function () {
      localStorage.setItem('todos', JSON.stringify(todos));
    },
    [todos]
  );

  function handleToggleTheme() {
    const darkMode = !lightMode;

    setLightMode((lightMode) => !lightMode);

    localStorage.setItem('darkMode', darkMode);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleAddTodo(todo);
    setTodo('');
  }

  function handleAddTodo(todo) {
    if (todo.trim() === '') return alert('Todo cannot be empty');

    const newTodo = {
      id: Date.now(),
      value: todo,
      completed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
  }

  function handleCheckTodo(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleClearCompletedTodo() {
    setTodos((todos) => todos.filter((todo) => todo.completed !== true));
  }

  const draggableTodos = [...todos];

  function handleSortDraggedTodos() {
    const draggedItemContent = draggableTodos.splice(dragItem.current, 1)[0];

    draggableTodos.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setTodos(draggableTodos);
  }

  function handleSortBy(type) {
    setSortBy(type);
  }

  let sortedTodos = draggableTodos;

  if (sortBy === 'all') sortedTodos = draggableTodos;

  if (sortBy === 'active')
    sortedTodos = draggableTodos.slice().filter((todo) => !todo.completed);

  if (sortBy === 'completed')
    sortedTodos = draggableTodos.slice().filter((todo) => todo.completed);

  return (
    <TodosContext.Provider
      value={{
        todo,
        todos,
        setTodo,

        handleSubmit,
        handleAddTodo,
        handleCheckTodo,
        handleDeleteTodo,
        handleClearCompletedTodo,

        sortBy,
        handleSortBy,
        sortedTodos,

        lightMode,
        handleToggleTheme,

        dragItem,
        dragOverItem,
        handleSortDraggedTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error('TodosContext was used outside the TodosProvider');

  return context;
}

export { TodosProvider, useTodos };
