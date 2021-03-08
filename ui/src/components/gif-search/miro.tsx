import * as React from "react";

const createImage = (x: number, y: number, url: string) => {
  miro.board.widgets
    .create({
      type: "image",
      url,
      x,
      y,
    })
    .catch((e) => {
      alert(e);
    });
};

const getDraggableItemPreview = (target: HTMLElement) => ({
  url: target.getAttribute("data-preview-url") || "",
  width: parseInt(target.getAttribute("data-preview-width") || "") || 100,
  height: parseInt(target.getAttribute("data-preview-height") || "") || 100,
});

const onDrop = (canvasX: number, canvasY: number, target: HTMLElement) => {
  createImage(canvasX, canvasY, target.getAttribute("data-image-url") || "");
};

export const useDraggableItemContainer = (container: HTMLDivElement | null) => {
  const [miroReady, setMiroReady] = React.useState(false);
  miro.onReady(() => {
    setMiroReady(true);
  });
  React.useEffect(() => {
    if (miroReady && container) {
      miro.board.ui.initDraggableItemsContainer(container, {
        draggableItemSelector: ".overlay",
        getDraggableItemPreview,
        onDrop,
      });
    }
  }, [miroReady, container]);
};
