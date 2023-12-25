import { useTodos } from '../contexts/TodoContext';

function Todo({ todo, index }) {
  const {
    handleDeleteTodo,
    handleCheckTodo,
    dragItem,
    dragOverItem,
    handleSortDraggedTodos,
  } = useTodos();

  const { id, value, completed } = todo;

  return (
    <li
      draggable
      onDragStart={() => (dragItem.current = index)}
      onDragEnter={() => (dragOverItem.current = index)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={handleSortDraggedTodos}
    >
      {completed ? (
        <i className='checked-todo-circle' onClick={() => handleCheckTodo(id)}>
          <svg xmlns='http://www.w3.org/2000/svg' width='11' height='9'>
            <path
              fill='none'
              stroke='#FFF'
              strokeWidth='2'
              d='M1 4.304L3.696 7l6-6'
            />
          </svg>
        </i>
      ) : (
        <i className='todo-circle' onClick={() => handleCheckTodo(id)}></i>
      )}

      <p className={completed ? 'completed' : ''}>{value}</p>

      {!completed && (
        <i onClick={() => handleDeleteTodo(id)}>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'>
            <path
              fill='#494C6B'
              fillRule='evenodd'
              d='M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z'
            />
          </svg>
        </i>
      )}
    </li>
  );
}

export default Todo;
