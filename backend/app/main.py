from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://0.0.0.0:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/recommendations")
def get_recommendations(country: str, season: str):
    valid_seasons = ['spring', 'summer', 'autumn', 'winter']
    if season.lower() not in valid_seasons:
        # raise ValueError("Invalid season")
        return { "recommendations": ["season must be spring, summer, autumn or winter"]}
    else:
        load_dotenv()
        api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = api_key
        prompt = f"What are three things to do in {country} during {season}?"

        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
            n=3,
            stop=None,
            temperature=0.5,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        recommendations = [choice['text'].strip() for choice in response.choices]
        return {
            "country": country,
            "season": season,
            "recommendations": recommendations
        }
  
