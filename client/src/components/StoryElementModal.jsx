import { useEffect, useState } from "react";
import { createStoryElement, updateStoryElement } from "../api/stories";

const typeLabels = {
  CHARACTER: "Character",
  LOCATION: "Location",
  EVENT: "Event",
  FACTION: "Faction",
  ITEM: "Item",
};

function StoryElementModal({
  storyId,
  elementType,
  element,
  onClose,
  onElementCreated,
  onElementUpdated,
}) {
  const isEditMode = Boolean(element);
  const label = typeLabels[elementType];

  const [form, setForm] = useState({
    name: element?.name || "",
    role: element?.role || "",
    status: element?.status || "",
    description: element?.description || "",
    notes: element?.notes || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(element?.image?.url || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(element?.image?.url || "");
      return;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile, element]);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("type", elementType);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEditMode) {
        const updatedElement = await updateStoryElement(
          storyId,
          element._id,
          formData,
        );

        onElementUpdated?.(updatedElement);
      } else {
        const createdElement = await createStoryElement(storyId, formData);

        onElementCreated?.(createdElement);
      }

      onClose();
    } catch (err) {
      setError(
        err.message ||
          `Unable to ${isEditMode ? "update" : "create"} story element.`,
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
              {label}
            </p>

            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              {isEditMode ? `Edit ${label}` : `Add ${label}`}
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
            {imagePreview && (
              <div>
                <span className="text-sm font-semibold">Image</span>

                <div className="mt-2 overflow-hidden border border-stone bg-ivory">
                  <img
                    src={imagePreview}
                    alt={`${form.name || label} preview`}
                    className="aspect-[16/7] w-full object-cover"
                  />
                </div>
              </div>
            )}

            <label className="block">
              <span className="text-sm font-semibold">
                {imagePreview ? "Replace image" : "Image"}
              </span>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm text-muted file:mr-4 file:border-0 file:bg-ivory file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink"
              />

              <p className="mt-2 text-xs leading-5 text-muted">
                Optional. Images must be 5 MB or smaller.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Name</span>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder={`Enter ${label.toLowerCase()} name`}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Role / Label</span>

              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder="Protagonist, Kingdom, Turning Point..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Status</span>

              <input
                type="text"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder="Active, planned, historical..."
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
                placeholder={`Describe this ${label.toLowerCase()}...`}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Notes</span>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                className="mt-2 w-full resize-none rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
                placeholder="Private notes about this element..."
              />
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
                    ? `Saving ${label.toLowerCase()}...`
                    : `Creating ${label.toLowerCase()}...`
                  : isEditMode
                    ? "Save changes"
                    : `Create ${label.toLowerCase()}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StoryElementModal;
