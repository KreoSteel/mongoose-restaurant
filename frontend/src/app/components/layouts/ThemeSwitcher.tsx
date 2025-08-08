import { useTheme } from "../../contexts/ThemeContexts";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="theme-switcher absolute bottom-4 right-4">
            {theme === "light" ? "Dark" : "Light"}
        </button>
    )
}
