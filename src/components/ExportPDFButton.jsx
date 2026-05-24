import jsPDF
from "jspdf";

const ExportPDFButton = ({
  title,
}) => {

  const exportPDF = () => {

    const doc =
      new jsPDF();

    doc.text(
      title,
      20,
      20
    );

    doc.save(
      "report.pdf"
    );
  };



  return (
    <button
      onClick={exportPDF}
      className="
        bg-indigo-600
        text-white
        px-5
        py-3
        rounded-xl
      "
    >
      Export PDF
    </button>
  );
};

export default
ExportPDFButton;