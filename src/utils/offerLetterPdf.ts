import jsPDF from "jspdf";

export function downloadOfferLetterReport(result: any) {
  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.text("JobShield AI", 20, 20);

  pdf.setFontSize(16);
  pdf.text("Offer Letter Verification Report", 20, 35);

  pdf.setFontSize(12);

  pdf.text(`Company: ${result.company}`,20,55);

  pdf.text(`Trust Score: ${result.trustScore}/100`,20,70);

  pdf.text(`Risk Level: ${result.risk}`,20,85);

  pdf.text(`AI Confidence: ${result.aiConfidence}%`,20,100);

  pdf.text("Recommendation:",20,120);

  pdf.text(result.recommendation,20,130);

  pdf.text("Reasons:",20,150);

  let y = 160;

  result.reasons.forEach((reason:string)=>{

      pdf.text("• "+reason,25,y);

      y+=10;

  });

  pdf.save("OfferLetterReport.pdf");
}