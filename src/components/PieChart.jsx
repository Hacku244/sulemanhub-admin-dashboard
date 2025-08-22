import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableArcLabels={false}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      arcLinkLabelsTextColor={colors.grey[100]}
      theme={{
        legends: { text: { fill: colors.grey[100] } },
        tooltip: {
          container: {
            color: theme.palette.mode === "dark" ? "#000" : "#fff",
            background: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
        },
      }}
      defs={[
        { id: "dots", type: "patternDots", background: "inherit", color: "rgba(255,255,255,0.3)", size: 4, padding: 1, stagger: true },
        { id: "lines", type: "patternLines", background: "inherit", color: "rgba(255,255,255,0.3)", rotation: -45, lineWidth: 6, spacing: 10 },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: colors.grey[100],
          symbolSize: 18,
          effects: [{ on: "hover", style: { itemTextColor: theme.palette.mode === "dark" ? "#fff" : "#000" } }],
        },
      ]}
    />
  );
};

export default PieChart;


