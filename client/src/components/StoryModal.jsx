import { useState } from "react";
import { createStory, updateStory } from "../api/stories";

function StoryModal({ story = null, onClose, onStoryCreated, onStoryUpdated }) {
  const isEditMode = Boolean(story);

  const [form, setForm] = useState({
    title: story?.title || "",
    description: story?.description || "",
    genre: story?.genre || "",
    status: story?.status || "PLANNING",
  });

  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("genre", form.genre);
      formData.append("status", form.status);

      if (image) {
        formData.append("image", image);
      }

      if (isEditMode) {
        const updatedStory = await updateStory(story._id, formData);
        onStoryUpdated(updatedStory);
      } else {
        const createdStory = await createStory(formData);
        onStoryCreated(createdStory);
      }

      onClose();
    } catch (err) {
      setError(
        err.message || `Unable to ${isEditMode ? "update" : "create"} story.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/40 px-6 py-8">
      <div className="flex max-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col border border-stone bg-cream">
        <div className="flex items-start justify-between border-b border-stone px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">
              Story
            </p>

            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              {isEditMode ? "Edit Story" : "New Story"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-muted transition-colors hover:text-ink"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold">Title</span>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder="Enter your story title"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Description</span>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="mt-2 w-full resize-none rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder="What is this story about?"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Genre</span>

              <input
                type="text"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder="Fantasy, science fiction, mystery..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Status</span>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
              >
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </label>

            {isEditMode && story.image?.url && (
              <div>
                <span className="text-sm font-semibold">Current cover</span>

                <img
                  src={story.image.url}
                  alt={`${story.title} cover`}
                  className="mt-2 h-32 w-48 border border-stone object-cover"
                />
              </div>
            )}

            <label className="block">
              <span className="text-sm font-semibold">
                {isEditMode ? "Replace cover image (optional)" : "Cover image"}
              </span>

              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-2 block w-full text-sm text-muted"
              />

              {image && (
                <p className="mt-2 text-sm text-muted">
                  Selected: {image.name}
                </p>
              )}

              {isEditMode && (
                <p className="mt-1 text-xs leading-5 text-muted">
                  Leave this empty to keep the current cover.
                </p>
              )}
            </label>

            {error && (
              <p className="text-sm leading-6 text-burgundy" role="alert">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3 border-t border-stone pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-stone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? isEditMode
                    ? "Saving changes..."
                    : "Creating story..."
                  : isEditMode
                    ? "Save changes"
                    : "Create story"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StoryModal;
