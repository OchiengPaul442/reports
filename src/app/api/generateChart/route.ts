// app/api/generateChart/route.tsx
import { NextApiRequest, NextApiResponse } from "next";
import ChartJsImage from "chartjs-to-image";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { chartConfig, width, height } = req.body;

    // Validate the request body
    if (
      !chartConfig ||
      typeof width !== "number" ||
      typeof height !== "number"
    ) {
      console.error("Invalid request parameters", {
        chartConfig,
        width,
        height,
      });
      throw new Error("Invalid request parameters");
    }

    const myChart = new ChartJsImage();
    myChart.setConfig(chartConfig);
    myChart.setWidth(width);
    myChart.setHeight(height);

    const url = await myChart.toDataUrl();
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error generating chart image:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the chart image." });
  }
}
