import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStory, getStories } from "../api/stories";
import StoryCard from "../components/StoryCard";
import StoryModal from "../components/StoryModal";

function StoryLibrary() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [storyToDelete, setStoryToDelete] = useState(null);
  const [isDeletingStory, setIsDeletingStory] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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

  const handleDeleteStory = (story) => {
    setDeleteError("");
    setStoryToDelete(story);
  };

  const confirmDeleteStory = async () => {
    if (!storyToDelete || isDeletingStory) return;

    setIsDeletingStory(true);
    setDeleteError("");

    try {
      await deleteStory(storyToDelete._id);

      setStories((current) =>
        current.filter((story) => story._id !== storyToDelete._id),
      );

      setStoryToDelete(null);
    } catch (err) {
      setDeleteError(err.message || "Unable to delete this story.");
    } finally {
      setIsDeletingStory(false);
    }
  };

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
            <div className="flex min-h-64 flex-col items-center justify-center border-y border-stone px-6 py-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                A place for what comes next
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Every world begins somewhere.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                Create your first story to start collecting its characters,
                places, events, and ideas.
              </p>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-6 border border-burgundy px-5 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
              >
                Create your first story
              </button>
            </div>
          )}

          {!isLoading && !error && stories.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {stories.map((story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  onEdit={setEditingStory}
                  onDelete={handleDeleteStory}
                />
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

      {editingStory && (
        <StoryModal
          story={editingStory}
          onClose={() => setEditingStory(null)}
          onStoryUpdated={(updatedStory) => {
            setStories((current) =>
              current.map((story) =>
                story._id === updatedStory._id ? updatedStory : story,
              ),
            );
            setEditingStory(null);
          }}
        />
      )}

      {storyToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-6 py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeletingStory) {
              setStoryToDelete(null);
              setDeleteError("");
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className="w-full max-w-lg border border-stone bg-cream p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-burgundy">
                Confirm deletion
              </p>

              <button
                type="button"
                onClick={() => {
                  if (!isDeletingStory) {
                    setStoryToDelete(null);
                    setDeleteError("");
                  }
                }}
                disabled={isDeletingStory}
                aria-label="Close confirmation"
                className="text-sm text-muted transition-colors hover:text-ink disabled:opacity-50"
              >
                Close
              </button>
            </div>

            <h2
              id="delete-dialog-title"
              className="mt-5 font-display text-3xl font-semibold tracking-tight"
            >
              Delete story?
            </h2>

            <p
              id="delete-dialog-description"
              className="mt-3 text-sm leading-7 text-muted"
            >
              You are about to permanently delete{" "}
              <span className="font-semibold text-ink">
                {storyToDelete.title}
              </span>
              . Its saved details and image will be removed. This action cannot
              be undone.
            </p>

            {deleteError && (
              <p
                role="alert"
                className="mt-4 border-l-2 border-burgundy pl-3 text-sm leading-6 text-burgundy"
              >
                {deleteError}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!isDeletingStory) {
                    setStoryToDelete(null);
                    setDeleteError("");
                  }
                }}
                disabled={isDeletingStory}
                className="border border-stone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeletingStory}
                onClick={confirmDeleteStory}
                className="border border-burgundy bg-burgundy px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletingStory ? "Deleting..." : "Delete story"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default StoryLibrary;
