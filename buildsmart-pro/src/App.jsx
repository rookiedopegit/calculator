import { useState } from "react";

export default function App() {
  const [type, setType] = useState("house");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("Chennai");
  const [selectedCompanies, setSelectedCompanies] = useState({});
  const [result, setResult] = useState(null);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");


  const companies = {
    cement: {
      Chennai: { UltraTech: 350, ACC: 360, Ramco: 340 },
      Trichy: { UltraTech: 355, ACC: 365, Ramco: 345 },
      Tanjore: { UltraTech: 352, ACC: 362, Ramco: 342 },
      Coimbatore: { UltraTech: 358, ACC: 368, Ramco: 348 },
    },
    steel: {
      Chennai: { "TATA Steel": 70, "JSW Steel": 72, SAIL: 68 },
      Trichy: { "TATA Steel": 71, "JSW Steel": 73, SAIL: 69 },
      Tanjore: { "TATA Steel": 70, "JSW Steel": 72, SAIL: 68 },
      Coimbatore: { "TATA Steel": 72, "JSW Steel": 74, SAIL: 70 },
    },
    sand: {
      Chennai: { "M-Sand": 50, "River Sand": 55 },
      Trichy: { "M-Sand": 52, "River Sand": 57 },
      Tanjore: { "M-Sand": 51, "River Sand": 56 },
      Coimbatore: { "M-Sand": 53, "River Sand": 58 },
    },
    aggregate: {
      Chennai: { "20mm": 60, "40mm": 65 },
      Trichy: { "20mm": 62, "40mm": 67 },
      Tanjore: { "20mm": 61, "40mm": 66 },
      Coimbatore: { "20mm": 63, "40mm": 68 },
    },
    water: {
      Chennai: { "Clean Water": 10 },
      Trichy: { "Clean Water": 12 },
      Tanjore: { "Clean Water": 11 },
      Coimbatore: { "Clean Water": 13 },
    },
  };

  const materialKeys = Object.keys(companies);

 
  const handleCompanyChange = (material, company) => {
    setSelectedCompanies({ ...selectedCompanies, [material]: company });
  };

 
  const optimizeCost = () => {
    let optimized = {};
    materialKeys.forEach((material) => {
      const districtCompanies = companies[material][district];
      const cheapestCompany = Object.keys(districtCompanies).reduce((a, b) =>
        districtCompanies[a] < districtCompanies[b] ? a : b
      );
      optimized[material] = cheapestCompany;
    });
    setSelectedCompanies(optimized);
  };

 
  const calculate = () => {
    const a = parseFloat(area);
    if (!a) return alert("Enter valid area");

    const multiplier = {
      house: 1,
      pool: 1.3,
      garden: 0.7,
      rooftop: 0.9,
    }[type];

    let breakdown = {};
    let total = 0;

    materialKeys.forEach((material) => {
      const company = selectedCompanies[material];
      if (!company) return alert(`Select company for ${material}`);
      const rate = companies[material][district][company];

      const qtyMultiplier = {
        cement: 0.4,
        sand: 0.6,
        steel: 0.2,
        aggregate: 0.5,
        water: 0.3,
      }[material];

      const cost = a * qtyMultiplier * multiplier * rate;
      breakdown[material] = { cost: Math.round(cost), company };
      total += cost;
    });

    setResult({
      total: Math.round(total),
      manpower: Math.ceil(a / 100),
      duration: Math.ceil(a / 50),
      breakdown,
    });
  };


  const sendMessage = () => {
    if (!input) return;
    let reply = "Try optimizing materials for cost efficiency.";

    if (input.toLowerCase().includes("cement")) {
      reply = "Use PPC cement or check local suppliers to reduce cost.";
    }

    setChat([...chat, { role: "user", text: input }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20, background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1>🏗️ BuildSmart Pro</h1>

      {/* DISTRICT SELECT */}
      <div style={{ marginBottom: 10 }}>
        <label>District: </label>
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option>Chennai</option>
          <option>Trichy</option>
          <option>Tanjore</option>
          <option>Coimbatore</option>
        </select>
      </div>

  
      <div style={{ marginBottom: 20 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="house">House</option>
          <option value="pool">Pool</option>
          <option value="garden">Garden</option>
          <option value="rooftop">Rooftop</option>
        </select>

        <input
          type="number"
          placeholder="Enter area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </div>


      <div style={{ marginBottom: 20 }}>
        {materialKeys.map((material) => (
          <div key={material} style={{ marginBottom: 10 }}>
            <label>{material.toUpperCase()}: </label>
            <select
              value={selectedCompanies[material] || ""}
              onChange={(e) => handleCompanyChange(material, e.target.value)}
            >
              <option value="" disabled>
                Select Company
              </option>
              {Object.keys(companies[material][district]).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* OPTIMIZE & CALCULATE BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={optimizeCost} style={{ marginRight: 10 }}>
          Optimize Cost 💰
        </button>
        <button onClick={calculate}>Calculate</button>
      </div>

      {/* RESULT / STATISTICS */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>💰 Total Cost: ₹{result.total}</h2>
          <p>👷 Manpower: {result.manpower} workers</p>
          <p>⏳ Duration: {result.duration} days</p>

          <h3>📊 Breakdown by Material & Company:</h3>
          {Object.keys(result.breakdown).map((m) => (
            <p key={m}>
              {m.toUpperCase()}: ₹{result.breakdown[m].cost} ({result.breakdown[m].company})
            </p>
          ))}
        </div>
      )}

      {/* CHATBOT */}
      <div style={{ marginTop: 30 }}>
        <h2>Chat</h2>
        <div style={{ background: "black", padding: 10, height: 150, overflowY: "auto" }}>
          {chat.map((msg, i) => (
            <p key={i} style={{ color: msg.role === "user" ? "lightblue" : "lightgreen" }}>
              {msg.role}: {msg.text}
            </p>
          ))}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ marginTop: 5 }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}