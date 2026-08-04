import { Link } from 'react-router-dom';
import { CheckSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <CheckSquare size={28} />
        <span>Smart Task Manager</span>
      </div>
      <div className="navbar__actions">
        <div className="navbar__user">
          <User size={18} />
          <span>{user?.fullName}</span>
        </div>
        <button className="btn btn--ghost btn--sm" onClick={logout} title="Logout">
          <LogOut size={18} />
          <span className="hide-mobile">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
