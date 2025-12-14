import "./styles/App.scss";
import { useState } from "react";
import Todos from "./components/Todos";
import { type FilterValue, type Todo, type TodoId } from "./types";
import { TODO_FILTERS } from "./consts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import { useLocalStorage } from "./hooks/useLocalStorage";

const DEFAULT_TODOS: Todo[] = [
  {
    id: crypto.randomUUID(),
    body: "Grow",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    body: "Plan",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    body: "Code",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", DEFAULT_TODOS);
  const [filter, setFilter] = useState<FilterValue>(TODO_FILTERS.ALL);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<TodoId | null>(null);

  const handleFilterChange = (filter: FilterValue) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filter === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  const handleTodoSubmit = (body: string) => {
    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                body,
              }
            : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          body,
          completed: false,
        },
      ]);
    }
    setInputValue("");
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleStartEdit = (id: TodoId) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;
    setEditingId(id);
    setInputValue(todoToEdit.body);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setInputValue("");
  };

  const handleToggleCompleted = (id: TodoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: TodoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <Header selectedFilter={filter} onFilterChange={handleFilterChange} />
      <Todos
        todos={filteredTodos}
        onToggleCompleted={handleToggleCompleted}
        onDelete={handleDeleteTodo}
        onStartEdit={handleStartEdit}
      />
      <AddTodo
        value={inputValue}
        isEditing={editingId !== null}
        onChange={handleInputChange}
        onSubmit={handleTodoSubmit}
        onCancelEdit={handleCancelEdit}
      />
      <Footer
        completedCount={completedTodos}
        totalCount={totalTodos}
        onRemoveAllCompleted={handleRemoveAllCompleted}
      />
    </div>
  );
}

export default App;
