import jsPDF from "jspdf";

export const downloadReport = (result: any) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("JobShield AI", 20, 20);

  doc.setFontSize(16);
  doc.text("Job Verification Report", 20, 32);

  doc.setDrawColor(120);
  doc.line(20, 38, 190, 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  let y = 50;

  doc.text(`Company: ${result.company}`, 20, y);
  y += 10;

  doc.text(`Trust Score: ${result.trustScore}/100`, 20, y);
  y += 10;

  doc.text(`Risk Level: ${result.risk}`, 20, y);
  y += 10;

  doc.text(`AI Confidence: ${result.aiConfidence}%`, 20, y);
  y += 10;

  doc.text(
    `Domain Verified: ${
      result.domainVerified ? "Yes" : "No"
    }`,
    20,
    y
  );
  y += 10;

  doc.text(
    `Recruiter Verified: ${
      result.recruiterVerified ? "Yes" : "No"
    }`,
    20,
    y
  );
  y += 10;

  doc.text(
    `Salary Normal: ${
      result.salaryNormal ? "Yes" : "No"
    }`,
    20,
    y
  );
  y += 10;

  doc.text(
    `Scam Detected: ${
      result.scamDetected ? "Yes" : "No"
    }`,
    20,
    y
  );

  y += 18;

  doc.setFont("helvetica", "bold");
  doc.text("Recommendation", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");

  const recommendation = doc.splitTextToSize(
    result.recommendation,
    170
  );

  doc.text(recommendation, 20, y);

  y += recommendation.length * 8 + 10;

  if (result.reasons?.length) {

    doc.setFont("helvetica", "bold");
    doc.text("Reasons", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");

    result.reasons.forEach((reason: string) => {
      doc.text(`• ${reason}`, 25, y);
      y += 8;
    });
  }

  doc.save("JobShield_Report.pdf");
};