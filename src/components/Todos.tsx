import { type Todo, type TodoId } from "../types";
import TaskSvg from "../assets/task-svgrepo-com.svg";
import TodoItem from "./TodoItem";
import "../styles/components/Todos.scss";

interface Props {
  todos: Todo[];
  onToggleCompleted: (id: TodoId) => void;
  onDelete: (id: TodoId) => void;
  onStartEdit: (id: TodoId) => void;
}

export default function Todos({
  todos,
  onToggleCompleted,
  onDelete,
  onStartEdit,
}: Props) {
  return todos.length > 0 ? (
    <section className="todos">
      <ul className="todos__list">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onCompleted={onToggleCompleted}
            onDeleteItem={onDelete}
            onStartEdit={onStartEdit}
          />
        ))}
      </ul>
    </section>
  ) : (
    <div className="todos__empty">
      <img
        className="todos__empty-img"
        src={TaskSvg}
        alt="Pin a task vector svgrepo.com"
      />
      <p className="todos__empty-stm">Without todos, create one!</p>
    </div>
  );
}
