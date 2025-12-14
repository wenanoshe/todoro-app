import { type TodoId, type Todo } from "../types";

import "../styles/components/TodoItem.scss";

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface Props {
  item: Todo;
  onDeleteItem: (id: TodoId) => void;
  onCompleted: (id: TodoId) => void;
  onStartEdit: (id: TodoId) => void;
}

export default function TodoItem({
  item,
  onDeleteItem,
  onCompleted,
  onStartEdit,
}: Props) {
  const handleChecked = () => {
    onCompleted(item.id);
  };

  return (
    <li className={`task ${item.completed ? "task--completed" : ""}`}>
      <label className="task__checkLabel">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleChecked}
        />
        <span></span>
      </label>

      <p className="task__body">{item.body}</p>

      <div className="task__actions">
        <button
          className="task__btn task__edit"
          onClick={() => onStartEdit(item.id)}
        >
          <PencilIcon />
        </button>
        <button
          className="task__btn task__delete"
          onClick={() => onDeleteItem(item.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
