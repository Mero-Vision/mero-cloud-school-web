import React, { useImperativeHandle, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Html2Pdf from "js-html2pdf";

const PrintComponent = React.forwardRef(({ children, documentTitle }, ref) => {
  const printRef = useRef();

  // download file directly
  const download = useReactToPrint({
    onPrintError: (error) => console.log(error),
    content: () => printRef.current,
    // documentTitle: `${documentTitle}.pdf`,
    copyStyles: true,
    removeAfterPrint: true,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.querySelector("#print-item");
        html.style.padding = "25px";
        // console.log(html);

        const visibleElements = html.querySelectorAll(".print-show");
        visibleElements?.forEach(
          (element) => (element.style.display = "block"),
        );
        const shiftElements = html.querySelectorAll(".shift");
        shiftElements?.forEach(
          (element) => (element.style.marginRight = "235px"),
        );

        const invisibleElements = html.querySelectorAll(".print-hide");
        invisibleElements?.forEach(
          (element) => (element.style.display = "none"),
        );

        const options = {
          margin: 10,
          filename: documentTitle || "users.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            logging: true,
            dpi: 192,
            letterRendering: true,
          },
          jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
        };
        const exporter = new Html2Pdf(html, options);
        await exporter.getPdf(true);
      }
    },
  });

  // open print dialog box
  const print = useReactToPrint({
    content: () => printRef.current,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        download() {
          download();
        },
        print() {
          print();
        },
      };
    },
    [download, print],
  );

  return (
    <div ref={printRef} id="print-item">
      {children}
    </div>
  );
});

PrintComponent.displayName = "Print";

export default PrintComponent;
