import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

const StackBlitzIframe = ({ src }: { src: string }) => {
  const { colorMode } = useColorMode();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const baseUrl = `https://stackblitz.com/edit/${src}?embed=1&file=README.md`;
    const theme = colorMode === "dark" ? "dark" : "light";
    if (iframeRef.current) {
      iframeRef.current.src = `${baseUrl}&theme=${theme}`;
    }
  }, [colorMode]);

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height="800"
      style={{ border: "none", borderRadius: "8px" }}
      title="StackBlitz Demo"
    />
  );
};

export default StackBlitzIframe;
