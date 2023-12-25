import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { TodosProvider } from "./contexts/TodoContext";

export default function App() {
  return (
    <TodosProvider>
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    </TodosProvider>
  );
}
