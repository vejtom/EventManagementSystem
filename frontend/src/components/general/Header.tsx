import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-secondary py-4 flex items-center px-6 sticky md:rounded-lg md:m-4 md:mx-20">
      <NavLink to="/">
        <span className="text-3xl">🎊</span>
      </NavLink>
      <NavLink to="/" className="flex-1">
        <h1 className="text-white text-2xl font-bold">Event Management System</h1>
      </NavLink>
    </header>
  );
}
