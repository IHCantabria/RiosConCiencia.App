export const downloadPDF = (PDF, PDFName) => {
  return fetch(PDF)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `${PDFName}.pdf`;
      link.target = "_blank";
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
      return true;
    })
    .catch((error) => {
      console.error("Error al descargar el PDF:", error);
      throw error;
    });
};
