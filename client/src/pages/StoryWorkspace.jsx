import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStory, getStoryElements } from "../api/stories";
import StoryElementCard from "../components/StoryElementCard";
import StoryElementModal from "../components/StoryElementModal";

function StoryWorkspace() {
  const { storyId } = useParams();

  const [story, setStory] = useState(null);
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("Overview");
  const [isElementModalOpen, setIsElementModalOpen] = useState(false);

  const elementTypeMap = {
    Characters: "CHARACTER",
    Locations: "LOCATION",
    Events: "EVENT",
    Factions: "FACTION",
    Items: "ITEM",
  };

  useEffect(() => {
    const loadStory = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getStory(storyId);
        const elementData = await getStoryElements(storyId);

        setStory(data);
        setElements(elementData);
      } catch (err) {
        setError(err.message || "Unable to load story.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStory();
  }, [storyId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-ivory px-6 py-12 text-ink">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-muted">Loading story...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-ivory px-6 py-12 text-ink">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm leading-6 text-burgundy" role="alert">
            {error}
          </p>

          <Link
            to="/stories"
            className="mt-4 inline-block text-sm font-semibold text-burgundy hover:text-burgundy-dark"
          >
            ← Back to stories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-stone bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/stories"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            Story Vault
          </Link>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-sm font-medium text-cream/80 transition-colors hover:text-cream"
            >
              User ▾
            </button>

            <button
              type="button"
              className="text-sm font-semibold text-cream/80 transition-colors hover:text-cream"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/stories"
          className="mb-8 inline-block text-sm font-semibold text-muted transition-colors hover:text-burgundy"
        >
          ← Your Stories
        </Link>
        <div className="flex flex-col gap-8 border-b border-stone pb-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="w-full shrink-0 sm:w-56">
              {story.image?.url ? (
                <div className="aspect-[4/3] overflow-hidden border border-stone bg-cream">
                  <img
                    src={story.image.url}
                    alt={story.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-end border border-stone bg-cream p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                    Story Vault
                  </span>
                </div>
              )}
            </div>

            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                {story.genre || "Uncategorized"}
              </p>

              <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
                {story.title}
              </h1>

              {story.description && (
                <p className="mt-4 text-base leading-7 text-muted">
                  {story.description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="self-start rounded-md border border-stone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Edit Story
          </button>
        </div>

        <nav className="mt-8 border-b border-stone">
          <div className="flex gap-7 overflow-x-auto">
            {[
              "Overview",
              "Characters",
              "Locations",
              "Events",
              "Factions",
              "Items",
            ].map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setActiveSection(section)}
                className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  activeSection === section
                    ? "border-burgundy text-burgundy"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </nav>

        <div className="pt-8">
          <div className="flex items-end justify-between border-b border-stone pb-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                {activeSection}
              </h2>

              <p className="mt-1 text-sm text-muted">
                Your story's {activeSection.toLowerCase()}.
              </p>
            </div>

            {activeSection !== "Overview" && (
              <button
                type="button"
                onClick={() => setIsElementModalOpen(true)}
                className="rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
              >
                + Add{" "}
                {activeSection === "Characters"
                  ? "Character"
                  : activeSection === "Locations"
                    ? "Location"
                    : activeSection === "Events"
                      ? "Event"
                      : activeSection === "Factions"
                        ? "Faction"
                        : "Item"}
              </button>
            )}
          </div>

          {activeSection === "Overview" ? (
            <div className="pt-8">
              <div className="border-b border-stone pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                  Your World
                </p>

                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  Story inventory
                </h3>

                <p className="mt-1 text-sm text-muted">
                  A quick look at what you've built inside this world.
                </p>
              </div>

              <div className="grid grid-cols-2 border-b border-stone md:grid-cols-5">
                {[
                  ["CHARACTER", "Characters"],
                  ["LOCATION", "Locations"],
                  ["EVENT", "Events"],
                  ["FACTION", "Factions"],
                  ["ITEM", "Items"],
                ].map(([type, label], index) => {
                  const count = elements.filter(
                    (element) => element.type === type,
                  ).length;

                  return (
                    <div
                      key={type}
                      className={`px-5 py-6 ${
                        index > 0 ? "border-l border-stone" : ""
                      }`}
                    >
                      <p className="font-display text-3xl font-semibold">
                        {count}
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {elements
                .filter(
                  (element) => element.type === elementTypeMap[activeSection],
                )
                .map((element) => (
                  <StoryElementCard key={element._id} element={element} />
                ))}
            </div>
          )}
        </div>
      </section>
      {isElementModalOpen && activeSection !== "Overview" && (
        <StoryElementModal
          storyId={storyId}
          elementType={elementTypeMap[activeSection]}
          onClose={() => setIsElementModalOpen(false)}
          onElementCreated={(createdElement) => {
            setElements((currentElements) => [
              ...currentElements,
              createdElement,
            ]);
          }}
        />
      )}
    </main>
  );
}

export default StoryWorkspace;
