{
  /* COMPACT IMAGE PREVIEW LAYER - AUTO-SCALED FOR IPHONE SCREEN POP */
}
{
  viewMode === "preview" && (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        padding: "10px 0",
      }}
    >
      {/* 
              This container calculates a dynamic scaling percentage based on the device width.
              It locks the 700px element perfectly inside a container that fits your screen!
            */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          // Fits exactly into mobile windows without left/right scrolling friction
          height: `calc(700px * ${typeof window !== "undefined" ? Math.min((window.innerWidth - 30) / 700, 1) : 1})`,
        }}
      >
        <div
          ref={letterRef}
          style={{
            width: "700px",
            backgroundColor: "#ffffff",
            padding: "40px 35px",
            boxSizing: "border-box",
            lineHeight: "1.6",
            fontSize: "15px",
            color: "#2c3e50",
            transform: `scale(${typeof window !== "undefined" ? Math.min((window.innerWidth - 30) / 700, 1) : 1})`,
            transformOrigin: "top center",
            flexShrink: 0,
          }}
        >
          {/* Header Identity Layout */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderBottom: "2px solid #27ae60",
              paddingBottom: "15px",
              marginBottom: "25px",
              width: "100%",
            }}
          >
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
              style={{ fontSize: "15px", fontWeight: "bold", color: "#155724" }}
            >
              Total:
            </span>
            <span
              style={{ fontSize: "22px", fontWeight: "bold", color: "#27ae60" }}
            >
              ${customer.price ? parseFloat(customer.price).toFixed(2) : "0.00"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#7f8c8d",
              fontSize: "13px",
            }}
          >
            <span>Quote is valid for 7 days.</span>
            <strong>Date: {currentDate}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
