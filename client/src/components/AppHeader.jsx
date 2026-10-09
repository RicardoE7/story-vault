import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AppHeader({ user }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("storyVaultToken");
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-stone bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/stories"
          className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight"
        >
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden="true"
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span>Story Vault</span>
        </Link>
        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((open) => !open)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
              className="text-sm font-medium text-cream/80 transition-colors hover:text-cream"
            >
              {user.username} ▾
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full z-40 mt-3 w-64 border border-stone bg-cream p-4 text-ink shadow-lg">
                <p className="font-semibold">{user.username}</p>
                <p className="mt-1 break-all text-sm text-muted">
                  {user.email}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-semibold text-cream/80 transition-colors hover:text-cream"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
