import { useEffect, useState, type ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoPage from '@/pages/TodoPage';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'todo-app-theme';

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    // Ignore storage errors and fall back to the system preference.
  }

  return null;
}

function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
}

export default function App(): ReactElement {
  const [theme, setTheme] = useState<Theme>((): Theme => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    return initialTheme;
  });

  useEffect((): void => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors; theme still works for the current session.
    }
  }, [theme]);

  function handleToggleTheme(): void {
    setTheme((currentTheme: Theme): Theme => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage theme={theme} onToggleTheme={handleToggleTheme} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
