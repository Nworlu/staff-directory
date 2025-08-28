import { RouterProvider, type DataRouter } from "react-router-dom";
import { useAppStore } from "./stores/useAppStore";
import { useEffect } from "react";

function App({ router }: { router: DataRouter }) {
  const { initializeCountries } = useAppStore();

  useEffect(() => {
    initializeCountries();
  }, [initializeCountries]);

  return <RouterProvider router={router} />;
}

export default App;
