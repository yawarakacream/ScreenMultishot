// // import fs from "fs";
// // import PDFDocument from "pdfkit";

// // import { jsPDF } from "jspdf";

// let beforePath: string | null = null;
// let i = 0;

// export const createPdf = async (path: string, photos: string[]) => {
//   let output = path + ".pdf";
//   if (path === beforePath) {
//     const j = ++i;
//     output = `${path} (${j}).pdf`;
//   } else {
//     beforePath = path;
//     i = 0;
//   }
//   console.log("output", output);

//   // const pdf = new PDFDocument({
//   //   autoFirstPage: false,
//   //   info: {
//   //     Creator: "ScreenMultishot",
//   //   },
//   // });
//   // pdf.pipe(fs.createWriteStream(output));
//   // photos.forEach((p) => {
//   //   pdf.addPage();
//   //   pdf.image(p);
//   // });
//   // pdf.end();

//   // const doc = new jsPDF();
//   // doc.text("Hello world!", 10, 10);
//   // doc.save(path);
// };

import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import sharp from "sharp";

let beforePath: string | null = null;
let i = 0;

export const createPdf = async (path: string, photos: string[]) => {
  let output = path + ".pdf";
  if (path === beforePath) {
    const j = ++i;
    output = `${path} (${j}).pdf`;
  } else {
    beforePath = path;
    i = 0;
  }

  const pdf = await PDFDocument.create();
  pdf.setCreator("ScreenMultishot");

  const parsedPhotos = await Promise.all(
    photos.map(async (p) => {
      const bytes = await fs.readFile(p);
      const metadata = await sharp(bytes).metadata();
      const embedded = await pdf.embedPng(bytes);
      return {
        embedded,
        width: metadata.width!,
        height: metadata.height!,
      };
    })
  );
  parsedPhotos.forEach(({ embedded, width, height }) => {
    const page = pdf.addPage([width, height]);
    page.drawImage(embedded);
  });
  const pdfBytes = await pdf.save();
  await fs.writeFile(output, pdfBytes);
};
