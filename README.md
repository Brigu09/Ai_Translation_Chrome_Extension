# AI-Powered Translation Chrome Extension

A Chrome extension that translates selected text on web pages using AI language models through a Python backend service.

## Features

- Translate selected text directly within web pages
- In-place translation that replaces the original text
- Support for multiple languages
- Open-source AI model integration via Groq API
- LangChain integration for flexible model switching

## Project Architecture

```
├── backend/               # Python Flask server
│   ├── app.py             # Main Flask application
│   ├── translation.py     # LangChain + Groq integration
│   └── requirements.txt   # Python dependencies
└── extension/             # Chrome extension
    ├── manifest.json      # Extension configuration
    ├── popup/             # Extension popup UI
    │   ├── popup.html
    │   ├── popup.css
    │   └── popup.js
    ├── background.js      # Background script
    └── content.js         # Content script for webpage interaction
```

## Prerequisites

- Python 3.8 or higher
- Chrome browser
- Groq API key (for open-source model access)

## Installation & Setup

### Backend Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ai-translator-extension.git
   cd ai-translator-extension
   ```

2. Set up a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

### Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked" and select the `extension` directory from this project

## Usage

1. Start the backend server:
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python app.py
   ```
   The server will run at `http://localhost:5000`

2. Using the extension:
   - Click the extension icon to set your target language
   - Go to any webpage
   - Select text you want to translate
   - Right-click and select "Translate Selection" from the context menu
   - The selected text will be replaced with its translation

## Key Components

### Backend

- **app.py**: Flask server with API endpoint for translation
- **translation.py**: Integration with LangChain and Groq API

### Chrome Extension

- **manifest.json**: Defines permissions and extension structure
- **background.js**: Handles context menu and backend communication
- **content.js**: Manipulates webpage content for translation
- **popup/**: Contains settings UI for language selection

## How It Works

1. The user selects text on a webpage and uses the context menu to translate
2. The extension captures the selected text and sends it to the Python backend
3. The backend uses LangChain with Groq to translate the text with the specified model
4. The translated text is cleaned and returned to the extension
5. The extension replaces the original text with the translation directly on the webpage

## Model Configuration

The system currently uses Qwen-QWQ-32B through Groq's API. You can modify `translation.py` to use different models:

```python
# Example of switching models
llm = ChatGroq(model_name="llama3-8b-8192", api_key=GROQ_API_KEY)
```

## Customization

### Adding Languages

To add more language options, edit `popup.html` in the extension directory:

```html
<select id="targetLanguage">
  <option value="Spanish">Spanish</option>
  <option value="French">French</option>
  <!-- Add more languages here -->
</select>
```

### Changing Translation Style

Modify the prompt template in `translation.py` to adjust translation style:

```python
prompt = ChatPromptTemplate.from_template(
    "Translate the following text to {language} in a [formal/casual/literary] style. Return ONLY the translation, nothing else:\n\n{text}"
)
```

## Troubleshooting

- **CORS errors**: Ensure Flask-CORS is properly configured in your backend
- **Translation failures**: Check your Groq API key and quota limits
- **Extension not working**: Verify the backend server is running and accessible


## License

MIT License - see LICENSE file for details.

## Acknowledgments

- LangChain for the flexible AI integration
- Groq for hosting open-source language models
- All the developers of open-source models like Qwen, Llama, and others
