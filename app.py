from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calc', methods=['POST'])
def calc():
    data = request.json

    area = float(data['area'])
    floors = int(data['floors'])
    btype = data['type']

    # Materials
    cement = int(area * floors * 0.3)
    sand = int(area * floors * 0.5)
    aggregate = int(area * floors * 0.8)
    steel = int(area * floors * 0.4)

    # Workers
    workers = max(3, int(area / 400))
    days = max(10, int(area / 100))

    # Equipment
    if area < 1000:
        equipment = "Basic tools (manual work)"
    elif area < 3000:
        equipment = "Concrete mixer machine"
    else:
        equipment = "Mixer + Excavator"

    # Cost
    if btype == "Residential":
        cost = int(area * floors * 1500)
    else:
        cost = int(area * floors * 2500)

    # Smart insight (UNIQUE BUT SIMPLE)
    if area > 3000:
        insight = "Large project: consider phased construction to manage cost."
    elif floors > 2:
        insight = "Multi-floor structure: ensure strong foundation planning."
    else:
        insight = "Standard construction: balanced cost and resources."

    return jsonify({
        "cement": cement,
        "sand": sand,
        "aggregate": aggregate,
        "steel": steel,
        "workers": workers,
        "days": days,
        "equipment": equipment,
        "cost": cost,
        "insight": insight
    })

app.run(debug=True)