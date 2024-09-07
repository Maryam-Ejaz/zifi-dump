// src/components/ThemeToggleButton.tsx
import { useTheme } from './ThemeProvider';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggleButton;
