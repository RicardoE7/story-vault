import { Link } from "react-router-dom";

const statusLabels = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const formatLastEdited = (date) => {
  if (!date) {
    return "Last edited recently";
  }

  return `Last edited ${new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

function StoryCard({ story }) {
  const counts = story.elementCounts || {};

  return (
    <article className="overflow-hidden border border-stone bg-cream">
      {story.image?.url ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-stone bg-ivory">
          <img
            src={story.image.url}
            alt={story.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-end border-b border-stone bg-ivory p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
            Story Vault
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              {story.genre || "Uncategorized"}
            </p>

            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {story.title}
            </h3>
          </div>

          <button
            type="button"
            className="text-lg leading-none text-muted transition-colors hover:text-ink"
            aria-label={`More actions for ${story.title}`}
          >
            ...
          </button>
        </div>

        {story.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
            {story.description}
          </p>
        )}

        <div className="mt-5 grid grid-cols-3 border-y border-stone py-4">
          <div>
            <p className="text-lg font-semibold">{counts.CHARACTER || 0}</p>
            <p className="mt-1 text-xs font-medium text-muted">Characters</p>
          </div>

          <div className="border-l border-stone pl-4">
            <p className="text-lg font-semibold">{counts.LOCATION || 0}</p>
            <p className="mt-1 text-xs font-medium text-muted">Locations</p>
          </div>

          <div className="border-l border-stone pl-4">
            <p className="text-lg font-semibold">{counts.EVENT || 0}</p>
            <p className="mt-1 text-xs font-medium text-muted">Events</p>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted">
              {statusLabels[story.status] || "Planning"}
            </p>

            <p className="mt-1 text-xs text-muted">
              {formatLastEdited(story.updatedAt)}
            </p>
          </div>

          <Link
            to={`/stories/${story._id}`}
            className="text-sm font-semibold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            Open story
          </Link>
        </div>
      </div>
    </article>
  );
}

export default StoryCard;
