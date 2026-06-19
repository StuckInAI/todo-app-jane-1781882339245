import styles from './TodoFooter.module.css';
import { FilterType } from '@/types';
import clsx from 'clsx';

type TodoFooterProps = {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <footer className={styles.footer}>
      <span className={styles.count}>
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={clsx(styles.filterBtn, filter === f.value && styles.active)}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
