import { request } from "./client";

const getStories = () => {
  return request("/api/stories");
};

const getStory = (storyId) => {
  return request(`/api/stories/${storyId}`);
};

const getStoryElements = (storyId) => {
  return request(`/api/stories/${storyId}/elements`);
};

const getStoryElement = (storyId, elementId) => {
  return request(`/api/stories/${storyId}/elements/${elementId}`);
};

const createStoryElement = (storyId, data) => {
  return request(`/api/stories/${storyId}/elements`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const updateStoryElement = (storyId, elementId, data) => {
  return request(`/api/stories/${storyId}/elements/${elementId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

const deleteStoryElement = (storyId, elementId) => {
  return request(`/api/stories/${storyId}/elements/${elementId}`, {
    method: "DELETE",
  });
};

const createStory = (formData) => {
  return request("/api/stories", {
    method: "POST",
    body: formData,
  });
};

const updateStory = (storyId, formData) => {
  return request(`/api/stories/${storyId}`, {
    method: "PUT",
    body: formData,
  });
};

const deleteStory = (storyId) => {
  return request(`/api/stories/${storyId}`, {
    method: "DELETE",
  });
};

export {
  getStories,
  getStory,
  getStoryElements,
  getStoryElement,
  createStory,
  updateStory,
  deleteStory,
  createStoryElement,
  updateStoryElement,
  deleteStoryElement,
};
