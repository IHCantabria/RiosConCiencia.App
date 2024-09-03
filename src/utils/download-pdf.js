export const downloadPDF = (PDF, PDFName) => {
  const link = document.createElement("a");
  link.download = `${PDFName}.pdf`;

  link.target = "_self";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};
