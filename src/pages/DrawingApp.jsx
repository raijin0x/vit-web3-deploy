import React, { useRef, useState } from "react";

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("black"); // Default color
  const [tool, setTool] = useState("pencil"); // Default tool
  const [pencilSize, setPencilSize] = useState(2); // Default pencil size
  const [eraserSize, setEraserSize] = useState(20); // Default eraser size
  const [image, setImage] = useState(null); // State to store uploaded image

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (tool === "pencil") {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = color;
      ctx.lineWidth = pencilSize;
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.clearRect(
        e.nativeEvent.offsetX - eraserSize / 2,
        e.nativeEvent.offsetY - eraserSize / 2,
        eraserSize,
        eraserSize
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing the new image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setImage(img); // Save the image to state
      };
      img.src = event.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printPage = () => {
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL("image/png");
    const windowContent = `<img src="${imgData}" onload="window.print();window.close()" />`;
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(windowContent);
    printWindow.document.close();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React Drawing App</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: "10px" }}
        />
        <button onClick={() => setColor("black")} style={{ backgroundColor: "black", color: "white" }}>Black</button>
        <button onClick={() => setColor("red")} style={{ backgroundColor: "red", color: "white" }}>Red</button>
        <button onClick={() => setColor("blue")} style={{ backgroundColor: "blue", color: "white" }}>Blue</button>
        <button onClick={() => setColor("green")} style={{ backgroundColor: "green", color: "white" }}>Green</button>
        <button onClick={() => setTool("pencil")} style={{ marginLeft: "10px" }}>Pencil</button>
        <button onClick={() => setTool("eraser")} style={{ marginLeft: "10px" }}>Eraser</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Pencil Size:
          <input
            type="range"
            min="1"
            max="50"
            value={pencilSize}
            onChange={(e) => setPencilSize(parseInt(e.target.value, 10))}
            style={{ marginLeft: "10px", width: "200px" }}
          />
          <span>{pencilSize}</span>
        </label>
        <label style={{ marginLeft: "20px" }}>
          Eraser Size:
          <input
            type="range"
            min="10"
            max="100"
            value={eraserSize}
            onChange={(e) => setEraserSize(parseInt(e.target.value, 10))}
            style={{ marginLeft: "10px", width: "200px" }}
          />
          <span>{eraserSize}</span>
        </label>
      </div>
      <canvas
        ref={canvasRef}
        width={793} // A4 width in pixels
        height={1122} // A4 height in pixels
        style={{
          border: "2px solid black",
          cursor: tool === "eraser" ? "crosshair" : "crosshair",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={downloadImage}>Download as PNG</button>
        <button onClick={printPage} style={{ marginLeft: "10px" }}>
          Print Drawing
        </button>
      </div>
    </div>
  );
};

export default DrawingApp;
