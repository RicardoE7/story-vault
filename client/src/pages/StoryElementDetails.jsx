import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStoryElement, getStoryElement } from "../api/stories";
import StoryElementModal from "../components/StoryElementModal";
import storyPlaceholder from "../assets/story-placeholder.jpg";

const typeLabels = {
  CHARACTER: "Character",
  LOCATION: "Location",
  EVENT: "Event",
  FACTION: "Faction",
  ITEM: "Item",
};

const sectionByType = {
  CHARACTER: "Characters",
  LOCATION: "Locations",
  EVENT: "Events",
  FACTION: "Factions",
  ITEM: "Items",
};

function StoryElementDetails() {
  const { storyId, elementId } = useParams();
  const navigate = useNavigate();

  const [element, setElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const loadElement = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getStoryElement(storyId, elementId);
        setElement(data);
      } catch (err) {
        setError(err.message || "Unable to load story element.");
      } finally {
        setIsLoading(false);
      }
    };

    loadElement();
  }, [storyId, elementId]);

  const label = element ? typeLabels[element.type] : "";
  const parentSection = element ? sectionByType[element.type] : null;

  const storyWorkspacePath = parentSection
    ? `/stories/${storyId}?section=${element.type}`
    : `/stories/${storyId}`;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-ivory text-ink">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-sm text-muted">Loading element...</p>
        </section>
      </main>
    );
  }

  if (error || !element) {
    return (
      <main className="min-h-screen bg-ivory text-ink">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-sm text-burgundy">
            {error || "Story element not found."}
          </p>

          <Link
            to={storyWorkspacePath}
            className="mt-6 inline-block text-sm font-semibold text-muted transition-colors hover:text-burgundy"
          >
            ← Back to story
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to={storyWorkspacePath}
          className="text-sm font-semibold text-muted transition-colors hover:text-burgundy"
        >
          ← Back to story
        </Link>

        <div className="mt-8 flex flex-col gap-8 border-b border-stone pb-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="w-full shrink-0 sm:w-64">
              <div className="aspect-[4/3] overflow-hidden border border-stone bg-cream">
                <img
                  src={element.image?.url || storyPlaceholder}
                  alt={
                    element.image?.url ? element.name : `${label} placeholder`
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                {label}
              </p>

              <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
                {element.name}
              </h1>

              {element.role && (
                <p className="mt-3 text-base text-muted">{element.role}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="rounded-md border border-stone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                setDeleteError("");
                setIsDeleteModalOpen(true);
              }}
              className="rounded-md border border-stone px-5 py-3 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-[220px_1fr]">
          <aside className="border-b border-stone pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              Details
            </p>

            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                  Type
                </dt>
                <dd className="mt-1 text-sm">{label}</dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                  Role / Label
                </dt>
                <dd className="mt-1 text-sm">
                  {element.role || "Not specified"}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                  Status
                </dt>
                <dd className="mt-1 text-sm">
                  {element.status || "Not specified"}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="max-w-3xl space-y-10">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                Description
              </p>

              <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-ink">
                {element.description || "No description has been added."}
              </p>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                Notes
              </p>

              <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-ink">
                {element.notes || "No notes have been added."}
              </p>
            </section>
          </div>
        </div>
      </section>

      {isEditModalOpen && (
        <StoryElementModal
          storyId={storyId}
          elementType={element.type}
          element={element}
          onClose={() => setIsEditModalOpen(false)}
          onElementUpdated={(updatedElement) => {
            setElement(updatedElement);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-6 py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setIsDeleteModalOpen(false);
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
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
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
              Delete {label.toLowerCase()}?
            </h2>

            <p
              id="delete-dialog-description"
              className="mt-3 text-sm leading-7 text-muted"
            >
              You are about to permanently delete{" "}
              <span className="font-semibold text-ink">{element.name}</span>.
              Its saved details and image will be removed. This action cannot be
              undone.
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
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="border border-stone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    setDeleteError("");

                    await deleteStoryElement(storyId, elementId);
                    navigate(storyWorkspacePath);
                  } catch (err) {
                    setDeleteError(
                      err.message || "Unable to delete story element.",
                    );
                    setIsDeleting(false);
                  }
                }}
                className="border border-burgundy bg-burgundy px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : `Delete ${label.toLowerCase()}`}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default StoryElementDetails;
