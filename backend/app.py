# from flask import Flask, request, Response
# from flask_cors import CORS
# import os
# import google.generativeai as genai
# from dotenv import load_dotenv

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# @app.route("/api/gemini", methods=["POST"])
# def gemini_stream():
#     data = request.get_json()
#     prompt = data.get("prompt", "")

#     model = genai.GenerativeModel("gemini-2.5-pro")
#     config = genai.GenerationConfig(
#         response_mime_type="text/plain"
#     )

#     try:
#         response = model.generate_content(
#             [prompt],
#             generation_config=config,
#             stream=True,
#         )

#         def generate():
#             for chunk in response:
#                 if chunk.text:
#                     yield chunk.text

#         return Response(generate(), content_type='text/plain')

#     except Exception as e:
#         print("Error:", e)
#         return {"error": "Something went wrong"}, 500

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, Response
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load .env file from backend folder
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

app = Flask(__name__)
CORS(app)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/api/gemini", methods=["POST"])
def gemini_stream():
    data = request.get_json()
    prompt = data.get("prompt", "")

    model = genai.GenerativeModel("gemini-2.5-pro")
    config = genai.GenerationConfig(
        response_mime_type="text/plain"
    )

    try:
        response = model.generate_content(
            [prompt],
            generation_config=config,
            stream=True,
        )

        def generate():
            for chunk in response:
                if chunk.text:
                    yield chunk.text

        return Response(generate(), content_type='text/plain')

    except Exception as e:
        print("Error:", e)
        return {"error": "Something went wrong"}, 500



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render will provide PORT env var
    app.run(host="0.0.0.0", port=port, debug=True)

