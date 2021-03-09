import React from "react";
import "./App.css";
import { GifSearch } from "./components/gif-search/GifSearch";

function App() {
  const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
  if (apiKey) {
    return <GifSearch apiKey={apiKey} />;
  }
  throw new Error(`missing "REACT_APP_GIPHY_API_KEY" env var`);
}

export default App;
