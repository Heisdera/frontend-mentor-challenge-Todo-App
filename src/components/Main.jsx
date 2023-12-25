import Input from "./Input";
import TodoList from "./TodoList";
import Stat from "./Stat";
import { useTodos } from "../contexts/TodoContext";

function Main() {
  const { todos } = useTodos();
  
  return (
    <main>
      <Input />
      <TodoList />
      {todos.length > 0 && <Stat />}
    </main>
  );
}

export default Main;
