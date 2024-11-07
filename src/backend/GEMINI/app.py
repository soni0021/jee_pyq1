import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Custom theme
st.markdown("""
<style>
    .stApp {
        background-color: #0F172A;
    }
    .main-container {
        background-color: #1E293B;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        margin: 1rem;
    }
    .gradient-header {
        background: linear-gradient(135deg, #4F46E5, #3730A3);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        color: white;
    }
    .stTextInput input {
        background-color: #1E293B !important;
        border: 2px solid #4F46E5 !important;
        border-radius: 8px !important;
        color: white !important;
        padding: 1rem !important;
    }
    .stButton button {
        background: linear-gradient(45deg, #4F46E5, #818CF8) !important;
        color: white !important;
        border: none !important;
        padding: 0.75rem 2rem !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        transition: transform 0.2s ease !important;
    }
    .stButton button:hover {
        transform: translateY(-2px) !important;
    }
    .response-box {
        background-color: #1E293B;
        border: 1px solid rgba(79, 70, 229, 0.2);
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
    }
</style>
""", unsafe_allow_html=True)

def get_gemini_response(question):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(question)
    return response.text

# Main app
st.markdown('<div class="main-container">', unsafe_allow_html=True)

# Header
st.markdown('<div class="gradient-header">', unsafe_allow_html=True)
st.title("JEEscape AI Assistant")
st.markdown("Your intelligent study companion for JEE preparation")
st.markdown('</div>', unsafe_allow_html=True)

# Input section
input_text = st.text_input("What would you like to know about JEE preparation?", key="input")
submit = st.button("Get Answer")

# Response section
if submit:
    if input_text.strip():
        with st.spinner('Generating response...'):
            try:
                response = get_gemini_response(input_text)
                st.markdown('<div class="response-box">', unsafe_allow_html=True)
                st.markdown("### Response")
                st.write(response)
                st.markdown('</div>', unsafe_allow_html=True)
            except Exception as e:
                st.error("Sorry, there was an error generating the response. Please try again.")
    else:
        st.warning("Please enter a question first.")

st.markdown('</div>', unsafe_allow_html=True)