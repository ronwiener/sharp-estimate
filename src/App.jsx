import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import imageLogo from "./assets/sharp.JPG";

export default function App() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    scopeOfWork: "",
    price: "",
  });

  const [viewMode, setViewMode] = useState("edit");

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const letterRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // High-Resolution Image Generation Engine
  const downloadImage = async () => {
    const originalMode = viewMode;
    setViewMode("preview");

    // Give the DOM a moment to paint the document view
    await new Promise((resolve) => setTimeout(resolve, 150));

    const element = letterRef.current;
    if (!element) {
      setViewMode(originalMode);
      return;
    }

    try {
      const clone = element.cloneNode(true);
      Object.assign(clone.style, {
        position: "absolute",
        top: "-9999px",
        left: "0",
        width: "750px", // Maintains a robust layout width for consistent rendering bounds
        height: "auto",
        display: "block",
        boxShadow: "none",
        margin: "0",
        padding: "50px",
      });

      document.body.appendChild(clone);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const canvas = await html2canvas(clone, {
        scale: 2, // Scales up pixel grid for razor-sharp text resolution on high-end smartphone displays
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(clone);

      // Convert structural canvas into a stream element download link
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      const safeName = (customer.name || "Customer")
        .trim()
        .replace(/[^a-z0-9]/gi, "_");

      link.download = `Sharp_Estimate_${safeName}.jpg`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error("Failed to generate estimate image file:", err);
    } finally {
      setViewMode(originalMode);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* ACTION BAR DESIGNED FOR PHONES */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #eef2f5",
          padding: "15px 15px 10px 15px",
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#27ae60",
                margin: 0,
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Sharp Estimate
            </h1>
          </div>

          <button
            onClick={downloadImage}
            style={{
              padding: "10px 18px",
              backgroundColor: "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow: "0 3px 6px rgba(39,174,96,0.2)",
            }}
          >
            Save Image
          </button>
        </div>

        {/* View Selection Tabs */}
        <div
          style={{
            display: "flex",
            background: "#f1f3f5",
            borderRadius: "8px",
            padding: "3px",
          }}
        >
          <button
            onClick={() => setViewMode("edit")}
            style={{
              flex: 1,
              padding: "8px 0",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px",
              backgroundColor: viewMode === "edit" ? "#ffffff" : "transparent",
              color: viewMode === "edit" ? "#27ae60" : "#7f8c8d",
            }}
          >
            1. Form Inputs
          </button>
          <button
            onClick={() => setViewMode("preview")}
            style={{
              flex: 1,
              padding: "8px 0",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px",
              backgroundColor:
                viewMode === "preview" ? "#ffffff" : "transparent",
              color: viewMode === "preview" ? "#27ae60" : "#7f8c8d",
            }}
          >
            2. Letter Preview
          </button>
        </div>
      </div>

      {/* MOBILE SCROLL CONTEXT CONTAINER */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* EDIT STATE GRID */}
        {viewMode === "edit" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#34495e",
                }}
              >
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={customer.name}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  fontSize: "15px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#34495e",
                }}
              >
                Customer Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Main St, Fort Lauderdale"
                value={customer.address}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  fontSize: "15px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#34495e",
                }}
              >
                Scope of Work
              </label>
              <textarea
                name="scopeOfWork"
                rows="10"
                placeholder="Describe the services being rendered..."
                value={customer.scopeOfWork}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  fontSize: "15px",
                  resize: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#34495e",
                }}
              >
                Total Price ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                name="price"
                placeholder="150.00"
                value={customer.price}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  fontSize: "15px",
                }}
              />
            </div>

            <button
              onClick={() => setViewMode("preview")}
              style={{
                padding: "14px",
                marginTop: "10px",
                backgroundColor: "#34495e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Review Finished Letter →
            </button>
          </div>
        )}

        {/* COMPACT IMAGE PREVIEW LAYER */}
        <div
          style={{
            display: viewMode === "preview" ? "block" : "none",
            width: "100%",
            overflowX: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
          }}
        >
          <div
            ref={letterRef}
            style={{
              width: "100%",
              minWidth: "650px",
              backgroundColor: "#ffffff",
              padding: "40px 30px",
              boxSizing: "border-box",
              lineHeight: "1.6",
              fontSize: "15px",
              color: "#2c3e50",
            }}
          >
            {/* Header Identity Layout */}
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Stack elements vertically
                alignItems: "center", // Center elements horizontally
                justifyContent: "center", // Extra safety centering
                textAlign: "center", // Center the text lines
                borderBottom: "2px solid #27ae60",
                paddingBottom: "15px",
                marginBottom: "25px",
                width: "100%", // Fill full sheet width
              }}
            >
              <div>
                <h2 style={{ textAlign: "center", margin: 0 }}>
                  <img
                    src={imageLogo}
                    alt="Logo"
                    style={{
                      height: "150px",
                      borderRadius: "12px",
                      border: "6px solid #27ae60",
                      padding: "25px",
                      mixBlendMode: "multiply",
                    }}
                  />
                </h2>
              </div>
            </div>

            {/* Target Client Metadata */}
            <div style={{ marginBottom: "25px" }}>
              <div
                style={{
                  textTransform: "uppercase",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#95a5a6",
                  marginBottom: "3px",
                }}
              >
                Prepared For:
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "2px",
                }}
              >
                {customer.name || "[Customer Name]"}
              </div>
              <div style={{ color: "#555" }}>
                {customer.address || "[Property Address]"}
              </div>
            </div>

            {/* Scope Layout Box */}
            <div style={{ marginBottom: "25px" }}>
              <div
                style={{
                  color: "#27ae60",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "4px",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Scope of Work
              </div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "#fafbfc",
                  padding: "15px",
                  borderRadius: "6px",
                  border: "1px solid #eaedf1",
                  minHeight: "120px",
                  color: "#34495e",
                }}
              >
                {customer.scopeOfWork || "[No scope defined yet...]"}
              </div>
            </div>

            {/* Financial Ledger Highlight Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ebf7ee",
                padding: "15px",
                borderRadius: "6px",
                border: "1px solid #c3e6cb",
                marginBottom: "25px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#155724",
                }}
              >
                Total:
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#27ae60",
                }}
              >
                $
                {customer.price
                  ? parseFloat(customer.price).toFixed(2)
                  : "0.00"}
              </span>
            </div>

            <p style={{ marginBottom: "35px" }}>Quote is valid for 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
