import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 border-b border-stone pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              Story Library
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Your Stories
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              Your private collection of fictional worlds.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="self-start rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark sm:self-auto"
          >
            New Story
          </button>
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

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-stone bg-transparent px-6 py-10 text-center transition-colors hover:border-burgundy hover:bg-cream"
              >
                <span className="font-display text-2xl font-semibold tracking-tight">
                  Create a New Story
                </span>

                <span className="mt-2 text-sm text-muted">
                  Start a new world.
                </span>

                <span className="mt-6 text-2xl font-light text-burgundy">
                  +
                </span>
              </button>
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
