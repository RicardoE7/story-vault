import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StoryLibrary from "./pages/StoryLibrary";
import StoryWorkspace from "./pages/StoryWorkspace";
import StoryElementDetails from "./pages/StoryElementDetails";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/stories" element={<StoryLibrary />} />
        <Route path="/stories/:storyId" element={<StoryWorkspace />} />
        <Route
          path="/stories/:storyId/elements/:elementId"
          element={<StoryElementDetails />}
        />
      </Route>

      <Route path="/" element={<Navigate to="/stories" replace />} />
      <Route path="*" element={<Navigate to="/stories" replace />} />
    </Routes>
  );
}

export default App;
