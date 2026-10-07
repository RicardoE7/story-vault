import { useEffect, useState } from "react";
import { getStories } from "../api/stories";
import StoryCard from "../components/StoryCard";
import StoryModal from "../components/StoryModal";

function StoryLibrary() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getStories();

        setStories(data);
      } catch (err) {
        setError(err.message || "Unable to load your stories.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-stone">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              Story Vault
            </p>

            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              Your Stories
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
          >
            New story
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="border-b border-stone pb-4">
          <h2 className="font-display text-2xl font-semibold">Story library</h2>

          <p className="mt-1 text-sm text-muted">
            Your worlds, characters, places, and stories in one private
            workspace.
          </p>
        </div>

        <div className="mt-8">
          {isLoading && (
            <p className="text-sm text-muted">Loading your stories...</p>
          )}

          {!isLoading && error && (
            <p className="text-sm leading-6 text-burgundy" role="alert">
              {error}
            </p>
          )}

          {!isLoading && !error && stories.length === 0 && (
            <p className="text-sm text-muted">
              You haven't created a story yet.
            </p>
          )}

          {!isLoading && !error && stories.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          )}
        </div>
      </section>
      {isModalOpen && (
        <StoryModal
          onClose={() => setIsModalOpen(false)}
          onStoryCreated={(story) => {
            setStories((currentStories) => [story, ...currentStories]);
          }}
        />
      )}
    </main>
  );
}

export default StoryLibrary;
