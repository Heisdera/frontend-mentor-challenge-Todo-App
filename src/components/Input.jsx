import { useTodos } from '../contexts/TodoContext';

function Input() {
  const { todo, setTodo, handleSubmit } = useTodos();

  return (
    <form className='input' onSubmit={handleSubmit}>
      <i className='input-circle'></i>

      <input
        type='text'
        placeholder='Create a new todo...'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </form>
  );
}

export default Input;
