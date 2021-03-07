import React from "react";
import "./App.css";
import { GifSearch } from "./components/gif-search/GifSearch";

function App() {
  if (process.env.REACT_APP_SEARCH_URL) {
    return <GifSearch searchBasePath={process.env.REACT_APP_SEARCH_URL} />;
  }
  throw new Error(`missing env var "REACT_APP_SEARCH_URL"`);
}

export default App;
