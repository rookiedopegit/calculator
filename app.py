from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calc', methods=['POST'])
def calc():
    data = request.json

    area = float(data['area'])
    floors = int(data['floors'])
    cement_company = data['cement']
    sand_company = data['sand']
    district = data['district']

    # --- Company price mapping ---
    cement_prices = {
        "UltraTech": 420,
        "ACC": 400,
        "Ramco": 380
    }

    sand_prices = {
        "Premium": 1500,
        "Standard": 1200,
        "Local": 900
    }

    # --- District factor ---
    district_factor = {
        "Chennai": 1.2,
        "Trichy": 1.0,
        "Tanjore": 0.9,
        "Coimbatore": 1.1
    }

    factor = district_factor[district]

    # --- Quantity estimation ---
    cement_qty = area * floors * 0.3
    sand_qty = area * floors * 0.5

    # --- Cost calculation ---
    cement_cost = cement_qty * cement_prices[cement_company] * factor
    sand_cost = sand_qty * sand_prices[sand_company] * factor

    total_cost = int(cement_cost + sand_cost)

    # --- Smart suggestion ---
    suggestion = ""

    if cement_company == "UltraTech":
        suggestion += "High quality but expensive. "
    if sand_company == "Premium":
        suggestion += "Premium sand increases cost. "
    if total_cost > 1000000:
        suggestion += "Consider switching to cost-effective materials."
    else:
        suggestion += "Good balance of cost and quality."

    return jsonify({
        "cement_qty": int(cement_qty),
        "sand_qty": int(sand_qty),
        "total_cost": total_cost,
        "suggestion": suggestion
    })

app.run(debug=True)