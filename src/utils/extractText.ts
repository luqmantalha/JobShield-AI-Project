import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractText(file: File): Promise<string> {

  if (file.type === "application/pdf") {

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;
    console.log("Pages:", pdf.numPages);

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {

      const page = await pdf.getPage(i);

      console.log("Reading page:", i);

      const content = await page.getTextContent();

      console.log(content.items);

      text += content.items
        .map((item: any) => item.str)
        .join(" ");

      text += "\n";

    }

    return text;

  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {

    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return result.value;

  }

  throw new Error("Unsupported file format.");

}