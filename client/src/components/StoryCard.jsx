import { Link } from "react-router-dom";

const statusLabels = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

function StoryCard({ story }) {
  return (
    <article className="border border-stone bg-cream">
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
          {story.genre || "Uncategorized"}
        </p>

        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          {story.title}
        </h3>

        {story.description && (
          <p className="mt-3 text-sm leading-6 text-muted">
            {story.description}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-stone pt-4">
          <span className="text-xs font-medium text-muted">
            {statusLabels[story.status] || "Planning"}
          </span>

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
