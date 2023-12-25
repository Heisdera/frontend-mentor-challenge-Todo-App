import Todo from './Todo';
import { useTodos } from '../contexts/TodoContext';

function TodoList() {
  const { sortedTodos } = useTodos();

  return (
    <ul className='box'>
      {sortedTodos.map((todo, index) => (
        <Todo todo={todo} index={index} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
