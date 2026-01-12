import { NavLink } from "react-router-dom";

export default function Header() {
  const linkBase =
    "px-3 py-2 rounded-lg text-sm font-medium transition";
  const active =
    "bg-black text-white dark:bg-white dark:text-black";
  const inactive =
    "text-gray-700 hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-zinc-900";

  return (
    <header className="border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">Internship Tracker</span>
          <span className="text-xs text-gray-500">CRM</span>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/applications/new"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Add
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
