function StoryElementCard({ element }) {
  const typeLabels = {
    CHARACTER: "Character",
    LOCATION: "Location",
    EVENT: "Event",
    FACTION: "Faction",
    ITEM: "Item",
  };

  return (
    <article className="border border-stone bg-cream transition-colors hover:border-muted">
      {element.image?.url ? (
        <div className="aspect-[4/3] overflow-hidden border-b border-stone bg-ivory">
          <img
            src={element.image.url}
            alt={element.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-end border-b border-stone bg-ivory p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
            {typeLabels[element.type]}
          </span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              {element.role || typeLabels[element.type]}
            </p>

            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {element.name}
            </h3>
          </div>

          <button
            type="button"
            className="text-lg leading-none text-muted transition-colors hover:text-ink"
            aria-label={`More actions for ${element.name}`}
          >
            ...
          </button>
        </div>

        {element.status && (
          <p className="mt-3 text-sm text-muted">{element.status}</p>
        )}
      </div>
    </article>
  );
}

export default StoryElementCard;
