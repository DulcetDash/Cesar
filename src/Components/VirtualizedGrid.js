import React, { useState, useEffect } from "react";
import { AutoSizer, Grid } from "react-virtualized";
import ProductCard from "./ProductCard";
import Loader from "react-loader-spinner";

const gapSize = 20; // Gap size in pixels
const itemWidth = 220; // Width of each item
const itemHeight = 300; // Height of each item
const FIXED_PRODUCT_CARD_HEIGHT = 485;

const VirtualizedGrid = ({ items, hideScrollbar, isLoadingMore = false }) => {
  const [gridHeight, setGridHeight] = useState(300); // Default height

  useEffect(() => {
    const handleResize = () => {
      const newHeight = calculateGridHeight();

      if (newHeight !== gridHeight) {
        setGridHeight(calculateGridHeight());
      }
    };

    const calculateGridHeight = () => {
      const columnCount = Math.max(
        1,
        Math.floor((window.innerWidth + gapSize) / (itemWidth + gapSize))
      );
      const rowCount = Math.ceil(items.length / columnCount);
      const moduloCompensation =
        !(items.length % 2 !== 0) && items.length > 20
          ? items.length > 100
            ? 1 / 6
            : 1
          : 1.5;

      return (
        rowCount * (FIXED_PRODUCT_CARD_HEIGHT + gapSize) +
        (window.innerHeight + window.outerHeight) / moduloCompensation
      );
    };

    window.addEventListener("resize", handleResize);
    setGridHeight(calculateGridHeight());

    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Array.isArray(items) || items.length === 0) {
    return <div>No items to display</div>;
  }

  const cellRenderer =
    (columnCount) =>
    ({ columnIndex, rowIndex, key, style }) => {
      const index = rowIndex * columnCount + columnIndex;
      const isLastItem = index === items.length - 1;
      const product = items[index];

      if (product) {
        return (
          <div key={key} style={{ ...style, padding: gapSize / 2 }}>
            <ProductCard product={product} />
            {isLastItem && isLoadingMore && (
              <div style={{ position: "absolute", right: -50, top: 235 }}>
                <Loader
                  type="TailSpin"
                  color="#000"
                  height={50}
                  width={50}
                  timeout={300000000} //3 secs
                />
              </div>
            )}
          </div>
        );
      }
      return null;
    };

  const width = 1000;

  const columnCount = Math.max(
    1,
    Math.floor((width + gapSize) / (itemWidth + gapSize))
  );
  const rowCount = Math.ceil(items.length / columnCount);

  return (
    <Grid
      cellRenderer={cellRenderer(columnCount)}
      columnCount={columnCount}
      columnWidth={itemWidth + gapSize}
      height={gridHeight}
      rowCount={rowCount}
      rowHeight={itemHeight + gapSize + 200}
      width={width}
      style={{
        overflowY: "hidden",
        // backgroundColor: "pink",
        height: "100%",
      }}
    />
  );
};

export default VirtualizedGrid;
