import { Link } from "react-router-dom";
import storyPlaceholder from "../assets/story-placeholder.jpg";

function StoryElementCard({ element, storyId }) {
  const typeLabels = {
    CHARACTER: "Character",
    LOCATION: "Location",
    EVENT: "Event",
    FACTION: "Faction",
    ITEM: "Item",
  };

  return (
    <Link
      to={`/stories/${storyId}/elements/${element._id}?section=${element.type}`}
      className="block border border-stone bg-cream transition-colors hover:border-muted"
    >
      <div className="aspect-[4/3] overflow-hidden border-b border-stone bg-ivory">
        <img
          src={element.image?.url || storyPlaceholder}
          alt={
            element.image?.url
              ? element.name
              : `${typeLabels[element.type]} placeholder`
          }
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              {element.role || typeLabels[element.type]}
            </p>

            <h3 className="mt-2 break-words font-display text-2xl font-semibold tracking-tight">
              {element.name}
            </h3>
          </div>
        </div>

        {element.status && (
          <p className="mt-3 text-sm text-muted">{element.status}</p>
        )}
      </div>
    </Link>
  );
}

export default StoryElementCard;
