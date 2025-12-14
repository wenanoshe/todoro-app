import { type FormEvent } from "react";
import "../styles/components/AddTodo.scss";

interface Props {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onSubmit: (body: string) => void;
  onCancelEdit: () => void;
}

export default function AddTodo({
  value,
  isEditing,
  onChange,
  onSubmit,
  onCancelEdit,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = value.trim();
    if (!body) return;
    onSubmit(body);
  };

  return (
    <section className="add-todo">
      <form className="add-todo__form" onSubmit={handleSubmit}>
        <input
          className="add-todo__input"
          type="text"
          placeholder="What do you want to do?"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <div className="add-todo__actions">
          {isEditing && (
            <button
              type="button"
              className="add-todo__cancel"
              onClick={onCancelEdit}
            >
              Cancel edit
            </button>
          )}
          <button className="add-todo__submit" type="submit">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
