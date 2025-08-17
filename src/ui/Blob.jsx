import React, { useEffect, useState } from "react";

const Blob = () => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [showBlob, setShowBlob] = useState(false);

  useEffect(() => {
    document.onpointermove = (event) => {
      setShowBlob(true);
      setTimeout(() => {
        setPosition({
          left: `${event.clientX}px`,
          top: `${event.clientY}px`,
        });
      }, 90);
    };

    document.onpointerleave = () => {
      setShowBlob(false);
    };
  }, []);

  return (
    <div
      style={{ ...position, display: showBlob ? "block" : "none" }}
      className={`w-28 aspect-square bg-secondary fixed -translate-x-1/2 -translate-y-1/2 blur-3xl rounded-full opacity-40 pointer-events-none`}
    />
  );
};

export default Blob;
