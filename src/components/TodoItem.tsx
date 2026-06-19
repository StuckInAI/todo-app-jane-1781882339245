import { useState, useRef, useEffect } from 'react';
import styles from './TodoItem.module.css';
import { Todo } from '@/types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit(): void {
    onEdit(todo.id, editValue);
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditing(false);
    }
  }

  function handleStartEdit(): void {
    setEditValue(todo.text);
    setEditing(true);
  }

  function handleCancelEdit(): void {
    setEditValue(todo.text);
    setEditing(false);
  }

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed, editing && styles.editing)}>
      {!editing ? (
        <>
          <button
            className={styles.checkbox}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <span className={clsx(styles.checkCircle, todo.completed && styles.checkCircleActive)}>
              {todo.completed && <Check size={13} strokeWidth={3} />}
            </span>
          </button>
          <span className={styles.text}>{todo.text}</span>
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={handleStartEdit}
              aria-label="Edit todo"
            >
              <Pencil size={15} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete todo"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={handleEditSubmit}
          />
          <div className={styles.actions}>
            <button
              className={styles.confirmBtn}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={handleEditSubmit}
              aria-label="Confirm edit"
            >
              <Check size={15} />
            </button>
            <button
              className={styles.cancelBtn}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={handleCancelEdit}
              aria-label="Cancel edit"
            >
              <X size={15} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
