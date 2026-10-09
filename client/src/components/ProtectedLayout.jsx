import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import AppHeader from "./AppHeader";

function ProtectedLayout() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let isActive = true;

    const validateSession = async () => {
      const token = localStorage.getItem("storyVaultToken");

      if (!token) {
        if (isActive) {
          setShouldRedirect(true);
          setIsLoading(false);
        }
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        if (isActive) {
          setUser(currentUser);
        }
      } catch {
        localStorage.removeItem("storyVaultToken");

        if (isActive) {
          setShouldRedirect(true);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    validateSession();

    return () => {
      isActive = false;
    };
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-ivory px-6 py-12 text-ink">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-muted">Verifying your session...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <AppHeader user={user} />
      <Outlet context={{ user }} />
    </div>
  );
}

export default ProtectedLayout;
