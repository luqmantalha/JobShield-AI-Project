import jsPDF from "jspdf";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function addTextWrapped(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = doc.splitTextToSize(String(text ?? ""), maxWidth);
  lines.forEach((line: string) => {
    if (y > PAGE_HEIGHT - 20) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > PAGE_HEIGHT - 15) {
    doc.addPage();
    return 20;
  }
  return y;
}

export function downloadOfferLetterReport(result: any) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // ── Header Banner ──────────────────────────────────────────────
  doc.setFillColor(29, 78, 216); // blue-700
  doc.rect(0, 0, PAGE_WIDTH, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("JobShield AI", MARGIN, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Offer Letter Verification Report", MARGIN, 28);

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated: ${date}`, PAGE_WIDTH - MARGIN, 28, { align: "right" });

  let y = 55;

  // ── Summary ────────────────────────────────────────────────────
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("VERIFICATION SUMMARY", MARGIN, y);
  y += 3;

  doc.setDrawColor(29, 78, 216);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);

  const rows = [
    ["Company", result.company ?? "Unknown"],
    ["Trust Score", `${result.trustScore}/100`],
    ["Risk Level", result.risk ?? "N/A"],
    ["AI Confidence", `${result.aiConfidence ?? "N/A"}%`],
    ["Verdict", result.scamDetected ? "FAKE OFFER LETTER" : "LEGITIMATE"],
  ];

  rows.forEach(([label, value]) => {
    y = checkPageBreak(doc, y, 10);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`${label}:`, MARGIN, y);

    doc.setFont("helvetica", "normal");
    if (label === "Verdict") {
      doc.setTextColor(result.scamDetected ? 220 : 22, result.scamDetected ? 38 : 163, result.scamDetected ? 38 : 74);
    } else if (label === "Trust Score") {
      const score = result.trustScore;
      doc.setTextColor(score >= 80 ? 22 : score >= 50 ? 161 : 220, score >= 80 ? 163 : score >= 50 ? 105 : 38, score >= 80 ? 74 : score >= 50 ? 36 : 38);
    } else {
      doc.setTextColor(50, 50, 50);
    }

    doc.text(value, MARGIN + 55, y);
    doc.setTextColor(50, 50, 50);
    y += 9;
  });

  y += 6;

  // ── Recommendation ─────────────────────────────────────────────
  y = checkPageBreak(doc, y, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);
  doc.text("AI RECOMMENDATION", MARGIN, y);
  y += 3;
  doc.setDrawColor(29, 78, 216);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;

  const bgColor = result.scamDetected ? [254, 242, 242] : [240, 253, 244];
  doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
  const recLines = doc.splitTextToSize(result.recommendation ?? "", CONTENT_WIDTH - 10);
  const boxH = recLines.length * 7 + 14;
  doc.roundedRect(MARGIN, y - 4, CONTENT_WIDTH, boxH, 3, 3, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  y = addTextWrapped(doc, result.recommendation ?? "", MARGIN + 5, y + 3, CONTENT_WIDTH - 10, 7);
  y += 10;

  // ── Reasons ────────────────────────────────────────────────────
  if (result.reasons?.length) {
    y = checkPageBreak(doc, y, 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 30, 30);
    doc.text("ANALYSIS DETAILS", MARGIN, y);
    y += 3;
    doc.setDrawColor(29, 78, 216);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);

    result.reasons.forEach((reason: string, i: number) => {
      y = checkPageBreak(doc, y, 15);
      const bullet = `${i + 1}.  ${reason}`;
      y = addTextWrapped(doc, bullet, MARGIN + 4, y, CONTENT_WIDTH - 8, 6.5);
      y += 2;
    });
  }

  // ── Footer ─────────────────────────────────────────────────────
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `JobShield AI — Confidential Offer Letter Report  •  Page ${p} of ${pageCount}`,
      PAGE_WIDTH / 2,
      PAGE_HEIGHT - 8,
      { align: "center" }
    );
  }

  doc.save(`OfferLetter_Report_${result.company ?? "Unknown"}.pdf`);
}