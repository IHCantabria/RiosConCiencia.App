export const downloadPDF = (PDF, PDFName) => {
  const link = document.createElement("a");
  link.href = PDF;
  link.download = `${PDFName}.pdf`;
  link.target = "_blank";
  link.click();
  link.remove();
};
