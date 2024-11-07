import streamlit as st
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def get_gemini_response(question):
    response = chat.send_message(question, stream=True)
    full_response = ""
    for chunk in response:
        full_response += chunk.text
    return full_response

st.markdown("""
<style>
    .stApp {
        background-color: #111111;
    }
    
    .chat-area {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .stTextInput input {
        background-color: #222222 !important;
        border: 1px solid #333333 !important;
        border-radius: 4px !important;
        color: #FFFFFF !important;
        padding: 0.75rem !important;
        font-family: monospace !important;
    }
    
    .stButton button {
        background-color: #4CAF50 !important;
        color: #FFFFFF !important;
        border: none !important;
        padding: 0.5rem 1.5rem !important;
        border-radius: 4px !important;
        font-family: monospace !important;
        transition: background-color 0.3s;
    }
    
    .stButton button:hover {
        background-color: #45a049 !important;
    }
    
    .message {
        padding: 1.5rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-family: monospace;
        line-height: 1.6;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .user {
        background: linear-gradient(135deg, #2c3e50, #3498db);
        border-left: 4px solid #3498db;
        color: white;
    }
    
    .bot {
        background: linear-gradient(135deg, #1A1A1A, #2C2C2C);
        border-left: 4px solid #4CAF50;
        color: #E0E0E0;
    }
</style>
""", unsafe_allow_html=True)

st.title("JEEscape AI Assistant")
st.subheader("Your personalized JEE preparation guide")

if 'messages' not in st.session_state:
    st.session_state['messages'] = []

input_text = st.text_input("Query:", key="input_text", value="")
submit = st.button("Send")

if submit and input_text:
    st.session_state['messages'].append(("user", input_text))
    with st.spinner('Thinking...'):
        response = get_gemini_response(input_text)
        st.session_state['messages'].append(("bot", response))

st.markdown('<div class="chat-area">', unsafe_allow_html=True)
for message in st.session_state['messages']:
    role, text = message
    st.markdown(f'<div class="message {role}">{text}</div>', unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)
