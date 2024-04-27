"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { DatePickerWithRange } from "@/components/datePicker";
import { getGridData, getReportData } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setReportTitle,
  setReportTemplate,
  setReportData,
} from "@/lib/reduxSlices/reportSlice";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { RingLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

const reportTypes = [
  // { value: "airqo", label: "AirQo Template" },
  { value: "standard", label: "Standard Template" },
];

export default function ReportGenerator() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme } = useTheme();
  const loaderColor = theme === "dark" ? "#fff" : "#013ee6";
  const [grids, setGrids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [islLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    reportTemplate: "",
    location: "",
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
  });

  const handleClearForm = () => {
    setFormState({
      title: "",
      reportTemplate: "",
      location: "",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    });

    toast.success("Form cleared successfully", {
      style: {
        background: "green",
        color: "white",
        border: "none",
      },
    });
  };

  const handleChange = (name: string) => (value: any) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { grids, success } = await getGridData();
        if (!success) {
          throw new Error("Error fetching data");
        }
        setGrids(grids);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formState.title ||
      !formState.reportTemplate ||
      !formState.location ||
      !formState.dateRange.from ||
      !formState.dateRange.to
    ) {
      toast.error("All fields are required", {
        style: {
          background: "red",
          color: "white",
          border: "none",
        },
      });
      setIsLoading(false);
      return;
    }

    const data = {
      grid_id: formState.location,
      start_time:
        new Date(formState.dateRange.from).toISOString().split("T")[0] +
        "T00:00",
      end_time:
        new Date(formState.dateRange.to).toISOString().split("T")[0] + "T00:00",
    };

    getReportData(data)
      .then((response) => {
        dispatch(setStartDate(data.start_time));
        dispatch(setEndDate(data.end_time));
        dispatch(setReportTitle(formState.title));
        dispatch(setReportTemplate(formState.reportTemplate));
        dispatch(setReportData(response.airquality));

        toast.success("Finalizing report data", {
          style: {
            background: "green",
            color: "white",
            border: "none",
          },
        });

        // clear form
        setFormState({
          title: "",
          reportTemplate: "",
          location: "",
          dateRange: {
            from: new Date(),
            to: new Date(),
          },
        });

        // Generate a random ID of 16 characters without hyphens
        const uuid = uuidv4();
        const idWithoutHyphens = uuid.replace(/-/g, "");
        const randomId = idWithoutHyphens.substring(0, 16);

        return router.push(`/report/${randomId}`);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error fetching report data", {
          style: {
            background: "red",
            color: "white",
            border: "none",
          },
        });
      });
  };

  return (
    <div className="report-generator space-y-5">
      {loading ? (
        <>
          <Skeleton className="h-[50px] rounded-md w-[150px] bg-slate-300" />
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[50px] rounded-md w-full bg-slate-300"
            />
          ))}
          <div className="flex space-x-3">
            <Skeleton className="h-[50px] rounded-md w-[200px] bg-slate-300" />
            <Skeleton className="h-[50px] rounded-md w-[150px] bg-slate-300" />
          </div>
        </>
      ) : (
        !islLoading && (
          <div className="space-y-5">
            <h1 className="text-2xl font-semibold">Report Details</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="title">Enter report title</Label>
                <Input
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Enter report title"
                  value={formState.title}
                  onChange={(e) => handleChange("title")(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="reportTemplate">Select report template</Label>
                <Select
                  name="reportTemplate"
                  onValueChange={(value) =>
                    handleChange("reportTemplate")(value)
                  }
                  value={formState.reportTemplate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select report template" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Select location</Label>
                <Select
                  name="location"
                  onValueChange={(value) => handleChange("location")(value)}
                  value={formState.location}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {grids.map((type: { _id: string; long_name: string }) => (
                        <SelectItem key={type._id} value={type._id}>
                          {type.long_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Select date range</Label>
                <DatePickerWithRange
                  value={formState.dateRange} // Pass the selected date range as a prop
                  onChange={(value: any) => handleChange("dateRange")(value)} // Update the selected date range when it changes
                />
              </div>

              <div className="flex space-x-4 items-center">
                <Button
                  type="submit"
                  className="p-2 bg-blue-700 hover:bg-blue-800 text-white"
                >
                  <FaDownload className="mr-2 h-4 w-4" />
                  Fetch Report Data
                </Button>
                <Button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2"
                  onClick={handleClearForm}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>
        )
      )}
      {islLoading && (
        <div className="w-full h-[400px] flex justify-center items-center">
          <RingLoader color={loaderColor} />
        </div>
      )}
    </div>
  );
}
