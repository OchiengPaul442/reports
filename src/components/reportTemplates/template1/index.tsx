/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface Template1Props {
  data: any;
}

const Header: React.FC = () => {
  return (
    <View style={styles.header} fixed>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/templateLogo.png`}
        style={{
          width: "auto",
          height: 60,
        }}
      />
    </View>
  );
};

export default function Template1({ data }: Template1Props) {
  const startDate = new Date(data.period.startTime).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const endDate = new Date(data.period.endTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const tableData1 = [
    {
      healthConcern: "Good",
      pm25: "0 - 12",
      precautions:
        "None: Air quality is satisfactory; and air pollution poses little or no risk.",
      bgColor: "#00e400",
    },
    {
      healthConcern: "Moderate",
      pm25: "12.1 - 35.4",
      precautions:
        "Unusually sensitive people should consider reducing prolonged or heavy exertion.",
      bgColor: "#ff0",
    },
    {
      healthConcern: "Unhealthy for Sensitive Groups",
      pm25: "35.5 - 55.4",
      precautions:
        "Sensitive groups should reduce prolonged or heavy exertion.",
      bgColor: "#f90",
    },
    {
      healthConcern: "Unhealthy",
      pm25: "55.5 - 150.4",
      precautions:
        "Everyone should reduce prolonged or heavy exertion, take more breaks during outdoor activities.",
      bgColor: "#f00",
    },
    {
      healthConcern: "Very Unhealthy",
      pm25: "150.5 - 250.4",
      precautions:
        "Everyone should avoid prolonged or heavy exertion, move activities indoors or reschedule.",
      bgColor: "#90f",
    },
    {
      healthConcern: "Hazardous",
      pm25: "250.5 - 500.4",
      precautions: "Everyone should avoid all physical activities outdoors.",
      bgColor: "#600",
    },
  ];

  return (
    <Document
      title="Air Quality Report"
      author="AirQo"
      subject="Air Quality"
      language="en"
      pdfVersion="1.5"
    >
      {/* page 1 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>
            Air Quality Report from {startDate} to {endDate}
            {"\n"} for {data.sites["grid name"].join(", ")}
          </Text>
        </View>
        <Text style={styles.subTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          This report summarises the temporal air quality profiles observed by
          the AirQo monitors installed at {data.sites["grid name"].join(", ")}{" "}
          between {startDate} and {endDate}. The AirQo monitor measures
          particulate matter(PM2.5) concentration, one of the primary air
          pollutants. PM2.5 are fine inhalable particles with diameters
          generally 2.5 micrometres and smaller. The data from the site
          indicates that the air quality at this location during the monitored
          period mainly alternated between moderate and unhealthy.
        </Text>
        <Text style={styles.subTitle}>Introduction</Text>
        <Text style={styles.text}>
          Air quality is a vital aspect of human health, well-being, and
          environmental sustainability. Prolonged exposure to air pollution can
          cause various adverse effects, such as respiratory infections,
          cardiovascular diseases, lung cancer, and premature death. Other
          associated effects due to short-term exposure are asthma attacks and
          chronic bronchitis.
          {"\n"} {"\n"}
          Among the various pollutants monitored, one key metric of interest is
          PM2.5. PM2.5 refers to particulate matter with a diameter of 2.5
          micrometres or smaller. These microscopic particles, often generated
          from various sources such as vehicle emissions, industrial processes,
          rubbish and biomass burning, construction activities, mining
          activities, dust from unpaved roads, etc, can pose significant health
          risks when inhaled. Due to their small size, PM2.5 particles can
          penetrate deep into the lungs, potentially causing respiratory and
          cardiovascular issues. The sources of PM2.5 pollution in Kampala may
          include traffic emissions, biomass burning, industrial processes, dust
          from unpaved roads and construction activities.
        </Text>
        <Text style={styles.text}>
          This report encapsulates the findings from meticulous data analysis
          from {startDate} and {endDate}. The focus of this investigation
          revolved around the values of PM2.5, a critical parameter in
          evaluating air quality. It aims to provide an insightful overview of
          this locale&rsquo;s air quality conditions and neighbourhood.
        </Text>
        <View></View>
        <Text style={styles.subTitle}>Data Presentation</Text>
        <Text style={styles.text}>
          Data for this report is presented and visualised using the US-EPA Air
          Quality Index (AQI) to communicate the health risks associated with
          PM2.5 exposure. The data visualisation is based on a simplified
          approach that adopts the raw concentration categorisation with the
          corresponding AQI colour codes.
        </Text>
        <View>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Health Concern</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>PM2.5 (µgm⁻³)</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Precautions</Text>
              </View>
            </View>
            {/* Table Rows */}
            {/* Repeat below View for each row */}
            {tableData1.map((row, index) => (
              <View
                key={index}
                style={{
                  ...styles.tableRow,
                  backgroundColor: row.bgColor,
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.healthConcern}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.pm25}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.precautions}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text
            style={{
              ...styles.figureCaption,
              marginBottom: 20,
            }}
          >
            Table 1: Air Quality Index (US-EPA)
          </Text>
        </View>
        <View>
          <Text
            style={{
              ...styles.figureCaption,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Figure 1: Figure showing the monthly mean PM2.5 for different sites
            in
          </Text>
        </View>
        <Text style={styles.text}>
          The top five locations with the highest PM2.5 calibrated values in the
          dataset for the specified period include Nansana west ward in Wakiso,
          recording a PM2.5 value of 76.02 µg/m³. Following closely is Rushoroza
          Hill in Kabale with a value of 71.98 µg/m³, followed by Kasubi in
          Rubaga at 70.44 µg/m³. Kawempe comes in fourth with a PM2.5 value of
          67.95 µg/m³, while Mpanga in Fort Portal rounds out the top five with
          a recorded value of 66.06 µg/m³. Despite the variation in readings,
          there was a noticeable reduction in the highest value compared to
          January.
        </Text>
        <Text style={styles.text}>
          Conversely, the locations with the lowest mean PM2.5 that have less
          than 20 µg/m³ values in February as shown in figure 2:
        </Text>
        <View>
          <Text style={styles.figureCaption}>
            Figure 2: Figure showing the daily mean PM2.5 for{" "}
          </Text>
        </View>
        <Text style={styles.text}>
          Among the recorded PM2.5 calibrated values, a few sites exhibited
          particularly low levels, all measuring below 20 µg/m³. Notably, the
          site at Bahai in Kawempe, Kampala reported the lowest value at 10.75
          µg/m³, indicating a relatively clean air environment. Following
          closely, the site at Jinja Main Street in Jinja city registered a
          PM2.5 value of 19.87 µg/m³, slightly higher than the Bahai site but
          still well below the 20 threshold. Similarly, the site at Njeru also
          displayed a notably low PM2.5 level, recording at 18.80 µg/m³. This
          was an improvement from January levels where there was no location
          with values less than 20 µg/m³.
        </Text>
        <View>
          <Text style={styles.subTitle}>Diurnal</Text>

          <Text style={styles.figureCaption}>
            Figure 3: Diurnal PM2.5 for . (The time was in GMT)
          </Text>
        </View>
        <Text style={styles.text}>
          The hourly variation of PM2.5 concentrations, revealing insights into
          air quality patterns. The highest PM2.5 value occurs at 21:00 (9:00
          PM), while the lowest is at 16:00 (4:00 PM). Peak concentrations are
          observed at night and in the morning, indicating potential
          contributing sources or activities. Daytime hours generally show lower
          PM2.5 levels, suggesting improved air quality during the day.
          {"\n"}
          {"\n"}
          The PM2.5 value in uganda is higher than the WHO recommended standard
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <View>
          <Text style={styles.subTitle}>Conclusion</Text>
          <Text style={styles.text}>
            The data from the site indicates that the air quality at this
            location during the monitored period mainly alternated between
            moderate and unhealthy. During the end of 2023, the air quality was
            largely moderate, and in January 2024, the air quality was largely
            unhealthy. This calls for several interventions to be adopted in the
            long run to ensure air quality remains at the recommended levels
            that don{"'"}t pose a severe threat to the health of the residents
            and visitors. Season variations might also have played a part in the
            observed patterns (washout effect in the rainy season, i.e.,
            September-November).
            {"\n"}
            {"\n"}
          </Text>
          <View>
            <Text style={styles.text}>
              To protect yourself from air pollution, we suggest the following
              measures:
            </Text>
            <View style={{ ...styles.listItem2 }}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                Check the air quality in your area at different hours of the
                day.
              </Text>
            </View>
            <View style={{ ...styles.listItem2 }}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                If the air quality is high outdoors, avoid outdoor activities to
                reduce exposure.
              </Text>
            </View>
            <View style={{ ...styles.listItem2 }}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                Limit the use of fans that might stir up dust and other
                particles.
              </Text>
            </View>
            <View style={{ ...styles.listItem2 }}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                If possible, use an air purifier to remove particulate
                pollutants from the air in your office.
              </Text>
            </View>
            <View style={{ ...styles.listItem2 }}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                Avoid burning rubbish, firewood, etc.
              </Text>
            </View>
            <View style={{ ...styles.listItem2 }}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                Wear a pollution mask if you can{"'"}t avoid outdoor activities;
                pollution masks help filter out most particulate matter from the
                air you breathe.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontWeight: "normal",
    lineHeight: 1.5,
    margin: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 12,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  figureCaption: {
    textAlign: "center",
    fontSize: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    padding: 0,
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "33%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    alignItems: "center",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    padding: 5,
    fontSize: 10,
  },
  listItem2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    textAlign: "left",
    fontFamily: "Times-Roman",
    fontWeight: "normal",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    marginLeft: 25,
    marginRight: 5,
    textAlign: "center",
  },
  itemContent: {
    flex: 1,
    fontSize: 12,
    textAlign: "left",
    fontFamily: "Times-Roman",
    fontWeight: "normal",
    lineHeight: 1.5,
  },
});
