from flask import jsonify
import logging

# ==== Health Check API ====
def health_api(app):
    """
    إضافة endpoint لفحص حالة Mix Platform
    GET /health
    """
    @app.route("/health", methods=["GET"])
    def health():
        try:
            response = {
                "status": "Mix Platform Alive",
                "modules": {
                    "social": True,
                    "store": True,
                    "wallet": True,
                    "games": True,
                    "metaverse": True,
                    "matrix": True,
                    "gps": True,
                    "ai": True,
                    "tv_radio": True
                }
            }
            return jsonify(response), 200
        except Exception as e:
            logging.exception(e)
            return jsonify({"status": "error", "message": "Internal server error"}), 500
