import { useTodos } from '../contexts/TodoContext';

function Stat() {
  const { todos, sortBy, handleSortBy, handleClearCompletedTodo } = useTodos();

  const activeTodos = todos.slice().filter((todo) => todo.completed === false);
  const numActiveTodos = activeTodos.length;

  return (
    <div className='stat'>
      <p>{numActiveTodos} items left</p>
      <div>
        <span
          className={sortBy === 'all' ? 'active' : ''}
          onClick={() => handleSortBy('all')}
        >
          All
        </span>
        <span
          className={sortBy === 'active' ? 'active' : ''}
          onClick={() => handleSortBy('active')}
        >
          Active
        </span>
        <span
          className={sortBy === 'completed' ? 'active' : ''}
          onClick={() => handleSortBy('completed')}
        >
          Completed
        </span>
      </div>
      <p onClick={handleClearCompletedTodo}>Clear Completed</p>
    </div>
  );
}

export default Stat;
