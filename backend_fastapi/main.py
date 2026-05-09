from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI(title="FitIn AI Stylist API", version="1.0.0")

class BodyAnalysisResponse(BaseModel):
    height: int
    weight: int
    body_type: str
    skin_tone: str
    measurements: dict

class OutfitContext(BaseModel):
    body_type: str
    skin_tone: str
    event: str
    style_preference: str
    budget_max: int

class Product(BaseModel):
    id: str
    name: str
    brand: str
    price: int
    image_url: str
    match_score: int
    match_reason: str

@app.post("/analyze-body", response_model=BodyAnalysisResponse)
async def analyze_body(file: UploadFile = File(...)):
    # Mocking MediaPipe / Computer Vision processing
    return {
        "height": 168,
        "weight": 62,
        "body_type": "Rectangle",
        "skin_tone": "Medium Warm",
        "measurements": {
            "chest": 92,
            "waist": 78,
            "shoulder": 43,
            "arm_length": 60,
            "thigh": 52,
            "leg_length": 98,
            "shoe_size": 42,
            "wrist": 17
        }
    }

@app.post("/recommend-outfit", response_model=List[Product])
async def recommend_outfit(context: OutfitContext):
    # Mocking AI Recommendation logic
    return [
        {
            "id": "m1",
            "name": "Kemeja Batik Danar Hadi Klasik",
            "brand": "Danar Hadi",
            "price": 285000,
            "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
            "match_score": 95,
            "match_reason": "Warna earth tone sangat cocok untuk kulit medium warm, dan motif vertikal menyamarkan bagian perut."
        }
    ]

@app.post("/virtual-tryon")
async def virtual_tryon(product_id: str, file: UploadFile = File(...)):
    # Mocking Replicate IDM-VTON API
    return {"status": "success", "image_url": "https://example.com/vton_result.jpg"}

@app.post("/recommend-pose")
async def recommend_pose(body_type: str, outfit_style: str):
    # Mocking Pose Recommendation Generation
    return {
        "poses": [
            {"name": "Pose Tiga Perempat", "description": "Menonjolkan lebar bahu."},
            {"name": "Pose Tangan di Saku", "description": "Elegan dan confidence."}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
