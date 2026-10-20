import aprilPdf from "@/assets/april-newsletter.pdf";
import mayDocx from "@/assets/may-newsletter.docx";
import julyDocx from "@/assets/july-newsletter.docx";
import augustPdf from "@/assets/august-newsletter.pdf";
import septDocx from "@/assets/sept-newsletter.docx";

export interface NewsletterItem {
  id: string;
  serial: number;
  title: string;
  month: string;
  year: string;
  fileUrl: string;
  format: "pdf" | "docx";
  edition: string;
}

export const newslettersData: NewsletterItem[] = [
  {
    id: "nl-01",
    serial: 1,
    title: "April Newsletter",
    month: "April",
    year: "2026",
    fileUrl: aprilPdf,
    format: "pdf",
    edition: "Issue 01",
  },
  {
    id: "nl-02",
    serial: 2,
    title: "May Newsletter",
    month: "May",
    year: "2026",
    fileUrl: mayDocx,
    format: "docx",
    edition: "Issue 02",
  },
  {
    id: "nl-03",
    serial: 3,
    title: "July Newsletter",
    month: "July",
    year: "2026",
    fileUrl: julyDocx,
    format: "docx",
    edition: "Issue 03",
  },
  {
    id: "nl-04",
    serial: 4,
    title: "August Newsletter",
    month: "August",
    year: "2026",
    fileUrl: augustPdf,
    format: "pdf",
    edition: "Issue 04",
  },
  {
    id: "nl-05",
    serial: 5,
    title: "September Newsletter",
    month: "September",
    year: "2026",
    fileUrl: septDocx,
    format: "docx",
    edition: "Issue 05",
  },
];
