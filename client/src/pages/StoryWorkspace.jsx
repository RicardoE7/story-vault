import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStory, getStoryElements } from "../api/stories";
import StoryElementCard from "../components/StoryElementCard";

function StoryWorkspace() {
  const { storyId } = useParams();

  const [story, setStory] = useState(null);
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("Overview");

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
      <header className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            to="/stories"
            className="text-sm font-semibold text-muted transition-colors hover:text-burgundy"
          >
            ← Your Stories
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 border-b border-stone pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              {story.genre || "Uncategorized"}
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              {story.title}
            </h1>

            {story.description && (
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                {story.description}
              </p>
            )}
          </div>

          <button
            type="button"
            className="self-start rounded-md border border-stone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Edit Story
          </button>
        </div>

        <nav className="mt-6 border-b border-stone">
          <div className="flex gap-6 overflow-x-auto">
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
                className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
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
                className="rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
              >
                + Add{" "}
                {activeSection === "Characters"
                  ? "Character"
                  : activeSection.slice(0, -1)}
              </button>
            )}
          </div>

          {activeSection === "Overview" ? (
            <div className="pt-8">
              <p className="text-sm text-muted">
                Your story workspace overview will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {elements
                .filter(
                  (element) =>
                    element.type === activeSection.slice(0, -1).toUpperCase(),
                )
                .map((element) => (
                  <StoryElementCard key={element._id} element={element} />
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default StoryWorkspace;
