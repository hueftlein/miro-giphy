import * as React from "react";
import {
  GifOverlayProps,
  Grid,
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
} from "@giphy/react-components";
import { useContext } from "react";
import * as miro from "./miro";
import giphyAttributionIcon from "../../icons/giphy-attribution.png";

const Overlay: React.ElementType<GifOverlayProps> = ({
  gif,
}: GifOverlayProps) => (
  <div
    className="overlay"
    data-image-url={gif.images.original.url}
    data-preview-url={gif.images.downsized_still.url}
    data-preview-width={gif.images.downsized_still.width}
    data-preview-height={gif.images.downsized_still.height}
  ></div>
);

const GifSearchContent: React.FC = () => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const container = React.useRef<HTMLDivElement | null>(null);
  miro.useDraggableItemContainer(container.current);
  return (
    <>
      <div className={"search-bar-wrapper"}>
        <SearchBar autoFocus={true} />
      </div>
      <div ref={container} className={"grid-wrapper"}>
        <Grid
          key={searchKey}
          columns={2}
          width={272}
          fetchGifs={fetchGifs}
          noLink={true}
          overlay={Overlay}
        />
      </div>
      <div className={"giphy-attribution"}>
        <a
          href="https://giphy.com/"
          target="_blank"
          rel={"noopener noreferrer"}
        >
          <img
            src={giphyAttributionIcon}
            alt="Powered by Giphy"
            height={22}
            width={200}
          />
        </a>
      </div>
    </>
  );
};

interface GifSearchProps {
  apiKey: string;
}

export const GifSearch: React.FC<GifSearchProps> = ({
  apiKey,
}: GifSearchProps) => {
  return (
    <SearchContextManager
      apiKey={apiKey}
      theme={{
        condensedMode: true,
        mode: "light",
      }}
    >
      <GifSearchContent />
    </SearchContextManager>
  );
};
