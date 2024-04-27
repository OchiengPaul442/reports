"use client";
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAppSelector } from "@/lib/hooks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PDFViewer, BlobProvider } from "@react-pdf/renderer";
import Template1 from "@/components/reportTemplates/template1";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IReport {
  reportID: string;
}

export default function ReportPage({ params }: { params: IReport }) {
  const reportData = useAppSelector((state) => state.report);

  // Function to format date in American format with full month
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-5">
        <Breadcrumb className="w-full py-4 px-2 border border-gray-400 rounded-md">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/report" className="text-blue-600">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Generate Report</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="text-gray-800 p-3 border border-gray-400 rounded-md">
          <div className="flex">
            <span className="font-semibold mr-2 w-[200px] text-xl">
              Report ID:
            </span>
            <span className="text-green-600">{params.reportID}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 w-[200px] text-xl">
              Report title:
            </span>
            <span>{reportData.reportTitle}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 w-[200px] text-xl">
              Report template:
            </span>
            <span>{reportData.reportTemplate}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 w-[200px] text-xl">From:</span>
            <span>{formatDate(reportData.startDate)}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 w-[200px] text-xl">To:</span>
            <span>{formatDate(reportData.endDate)}</span>
          </div>
        </div>
        <div>
          <BlobProvider document={<Template1 />}>
            {({ blob, url, loading, error }) => {
              return loading ? (
                "Loading document..."
              ) : (
                <div className="space-x-3">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <a
                      href={url ? url : "#"}
                      download={`${reportData.reportTitle.replace(
                        / /g,
                        ""
                      )}.pdf`}
                    >
                      Download Report
                    </a>
                  </Button>

                  <Dialog>
                    <DialogTrigger className="bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800 p-2">
                      Preview Report
                    </DialogTrigger>
                    <DialogContent className="text-red-500 bg-[#d4d4d7] p-4 font-bold max-w-[800px]">
                      <iframe
                        src={url as string}
                        className="w-full h-[800px] mt-6"
                        title={`${reportData.reportTitle}.pdf`}
                        allow="fullscreen"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              );
            }}
          </BlobProvider>
        </div>
      </div>
    </MainLayout>
  );
}
