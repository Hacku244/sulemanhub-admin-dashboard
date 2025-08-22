import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import { mockGeographyData as data } from "../data/mockData";
import { useState, useEffect, useRef } from "react";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 400, height: 300 });

  // ✅ ResizeObserver to auto update size
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ auto scale calculation based on width
  const scale = isDashboard
    ? Math.max(40, size.width / 10) // dashboard → smaller scale
    : Math.max(120, size.width / 5); // full page → bigger scale

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <ResponsiveChoropleth
        data={data}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[0, 1000000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={scale}
        projectionTranslation={[0.5, 0.55]}
        borderWidth={1.5}
        borderColor="#ffffff"
        colors="BuGn" // ✅ your requested color
        theme={{
          legends: { text: { fill: colors.grey[100] } },
          tooltip: {
            container: {
              color: theme.palette.mode === "dark" ? "#000" : "#fff",
              background:
                theme.palette.mode === "dark" ? "#fff" : "#000",
            },
          },
        }}
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-left",
                  direction: "column",
                  translateX: 20,
                  translateY: -100,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemTextColor: colors.grey[100],
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor:
                          theme.palette.mode === "dark" ? "#fff" : "#000",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : undefined
        }
      />
    </div>
  );
};

export default GeographyChart;
