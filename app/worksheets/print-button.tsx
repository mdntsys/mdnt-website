"use client";

// The worksheets ship as pages rather than PDFs, so this is how a reader who
// wants paper gets it. The print stylesheet in globals.css inverts the dark
// screen theme to a light one, hides the chrome, and lets score boxes and
// tables break across pages sensibly.

export function PrintButton() {
  return (
    <button
      type="button"
      className="ws-print"
      onClick={() => {
        window.print();
      }}
    >
      Print or save as PDF
    </button>
  );
}
