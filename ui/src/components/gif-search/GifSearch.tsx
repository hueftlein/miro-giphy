import * as React from "react";
import { GifOverlayProps, Grid } from "@giphy/react-components";
import {
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
} from "@giphy/react-components";
import { useContext } from "react";
import { gifPaginator } from "@giphy/js-fetch-api";

const Overlay: React.ElementType<GifOverlayProps> = ({
  gif,
}: GifOverlayProps) => (
  <div
    className="overlay"
    data-image-url={gif.embed_url}
    data-preview-url={gif.images.preview}
  ></div>
);

const GifSearchContent: React.FC = () => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const container = React.useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className={"search-bar-wrapper"}>
        <SearchBar autoFocus={true} />
      </div>
      <div ref={container}>
        <Grid
          key={searchKey}
          columns={2}
          width={272}
          fetchGifs={fetchGifs}
          noLink={true}
          // hideAttribution={true}
          overlay={Overlay}
          onGifVisible={() => {
            container.current &&
              miro &&
              miro.board.ui.initDraggableItemsContainer(container.current, {
                draggableItemSelector: "overlay",
                getDraggableItemPreview: (target) => ({
                  url: target.getAttribute("dataPreviewUrl") || "",
                }),
                onDrop: () => {
                  miro.showNotification("You dropped something");
                },
              });
          }}
        />
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
