import React, { useImperativeHandle, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Html2Pdf from "js-html2pdf";

/**
 * Wrapper component to print or directly download its children elements.
 * Wrapper component that provides `print` and `download` function
 * to its parent component to handle printing and downloading its
 * wrapped children elements. Functions are called through the
 * ref provided to the component.
 *
 * @param children - Children elements
 * @param documentTitle - Title of the downloaded pdf
 * @param ref - Ref provided to PrintComponent. Used to access `print` and `download` function
 *
 * Usage: Add `print-show` class to elements that has to be visible
 * only while downloading and invisible during rendering onscreen.
 *
 * Add `print-hide`  class to elements that has to be hidden during
 * downloading and visible during rendering.
 *
 * Use CSS `@media print` query to control the visiblity of elements
 * while printing.
 * */

const PrintComponent = React.forwardRef(({ children, documentTitle }, ref) => {
  const printRef = useRef();

  // download file directly
  const download = useReactToPrint({
    onPrintError: (error) => console.log(error),
    content: () => printRef.current,
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
          filename: documentTitle || "document.pdf",
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
