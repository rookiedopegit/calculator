## Project Concept
BuildSmart Pro is a construction planning app designed for non-technical clients. It helps users:

- Plan and calculate material requirements for projects like houses, pools, gardens, and rooftops.
- Select companies for materials** (cement, steel, sand, aggregate, water) with district-specific pricing.
- Optimize project costs automatically with a  cheapest company selection**.
- Calculate total budget, manpower, and duration.
- Get AI suggestions via a chatbot for material and cost optimization.

💡 Goal: Empower clients to make informed construction decisions without needing an engineer.

---

Technical Implementation

-Frontend: React.js (JavaScript)
  - Interactive UI with dropdowns, input fields, buttons, and result display.
- Logic & Calculations:
  - Calculates material quantities using area multipliers per project type.
  - Computes total cost, individual material cost, manpower, and duration.
  - Implements Optimize Cost** feature to automatically select cheapest companies per district.
- Chatbot:
  - Provides simple AI suggestions based on user input keywords.
- Styling: Inline CSS + React components.

---

## Features

-  Select **project type**: House, Pool, Garden, Rooftop
-  Enter **area in m²**
-  Choose **district**: Chennai, Trichy, Tanjore, Coimbatore
- Select **company for each material** or use **Optimize Cost**
- Click **Calculate** to view:
  - Total budget
  - Material-wise cost breakdown
  - Estimated manpower
  - Estimated duration
- Chatbot for AI suggestions




## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/buildsmart-pro.git
cd buildsmart-pro
````

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```
http://localhost:5173
```

---

## Usage Instructions

1. Select district
2. Select project type
3. Enter area in m²
4. Choose companies for each material or click Optimize Cost
5. Click Calculate to see total cost, material breakdown, manpower, and duration
6. Usechatbot for suggestions

---

