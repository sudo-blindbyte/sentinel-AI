from flask import Flask, request, jsonify

# CREATE APP FIRST (IMPORTANT)
app = Flask(__name__)

# HOME ROUTE
@app.route("/")
def home():
    return "AI Running 🚀"

# ANALYZE URL
@app.route("/analyze-url", methods=["POST"])
def analyze():
    data = request.json
    url = data.get("url", "").lower()

    risk = 0
    reasons = []

    # 🔴 Suspicious keywords
    keywords = ["login", "verify", "bank", "secure", "account", "update", "free", "hack", "movies"]

    for word in keywords:
        if word in url:
            risk += 25
            reasons.append(f"Keyword detected: {word}")

    # 🔴 Fake domain tricks (basic homoglyph)
    fake_patterns = ["g00gle", "paypaI", "faceb00k"]

    for pattern in fake_patterns:
        if pattern in url:
            risk += 50
            reasons.append(f"Fake domain detected: {pattern}")

    # 🔴 Symbols used in phishing
    if "@" in url:
        risk += 40
        reasons.append("Contains @ symbol")

    if "-" in url:
        risk += 10
        reasons.append("Contains '-' (common in fake domains)")

    # 🔴 Long URL
    if len(url) > 50:
        risk += 10
        reasons.append("URL too long")

    # Clamp risk
    if risk > 100:
        risk = 100

    return jsonify({
        "risk": risk,
        "reasons": reasons
    })

# RUN SERVER
if __name__ == "__main__":
    app.run(port=5001)