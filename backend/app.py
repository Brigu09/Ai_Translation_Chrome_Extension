from flask import Flask, request, jsonify
from flask_cors import CORS
from translation import translate_text

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome extension

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    if not data or 'text' not in data or 'target_language' not in data:
        return jsonify({'error': 'Missing text or target language'}), 400
    
    text = data['text']
    target_language = data['target_language']
    
    try:
        translated_text = translate_text(text, target_language)
        return jsonify({'translated_text': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)