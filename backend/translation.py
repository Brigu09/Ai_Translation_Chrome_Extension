import os
import re
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

# load environment variables from .env file
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize the ChatGroq model with the Groq API Key
llm = ChatGroq(model_name="qwen-qwq-32b", api_key=GROQ_API_KEY)

# AI-powered translation tool
def translate_text(text, target_language):
    
    """Translate text to the target language using LangChain and Groq."""
    
    prompt = ChatPromptTemplate.from_template(
        "Translate the following text to {language}. Return ONLY the translation, nothing else. Do not include any thinking or explanation:\n\n{text}"
    )

    chain = LLMChain(llm=llm, prompt=prompt)

    response = chain.run(text=text, language=target_language)
    
    # Clean up the response to remove any thinking tags or other artifacts
    clean_response = clean_translation_output(response)
    
    return clean_response.strip()

def clean_translation_output(text):

    """Remove thinking tags and other potential artifacts from the model output."""

    # Remove content inside <think> tags
    text = re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL)
    
    # Remove any other common XML/HTML-like tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Remove potential prefixes like "Translation:" or "Here's the translation:"
    text = re.sub(r'^(Translation:|Here\'s the translation:|Translated text:)\s*', '', text, flags=re.IGNORECASE)
    
    return text.strip()