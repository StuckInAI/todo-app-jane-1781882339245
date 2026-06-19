import type { ReactElement } from 'react';
import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { CheckSquare, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

type TodoPageProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export default function TodoPage({ theme, onToggleTheme }: TodoPageProps): ReactElement {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  const themeLabel: string = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.themeBar}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={themeLabel}
            aria-pressed={theme === 'dark'}
            title={themeLabel}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'} theme</span>
          </button>
        </div>

        <header className={styles.header}>
          <div className={styles.logo}>
            <CheckSquare size={32} color="var(--color-primary)" />
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
        </header>

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} onToggleAll={toggleAll} hasTodos={todos.length > 0} />
          {filteredTodos.length > 0 || todos.length > 0 ? (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
              <TodoFooter
                activeCount={activeCount}
                completedCount={completedCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            </>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🎉</span>
              <p className={styles.emptyText}>No todos yet. Add one above!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
