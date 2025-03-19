import json
import os
import re
import logging
import pandas as pd
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


# Compute TF-IDF cosine similarity
def compute_similarity(keywords: str, goals_list: list):
    try:
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([keywords] + goals_list)
        cosine_similarities = cosine_similarity(
            tfidf_matrix[0:1], tfidf_matrix[1:]
        ).flatten()
        return cosine_similarities
    except Exception as e:
        logging.error(f"Error computing similarity: {e}")
        return [0] * len(goals_list)


# Get recommendations using TF-IDF and cosine similarity
def get_recommendations(keywords: str) -> list:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, "data.csv")
    df = pd.read_csv(csv_path)
    categories = ["CLEANSER", "SERUM", "MOISTURIZER", "SUNSCREEN"]

    df["score"] = compute_similarity(keywords, df["goals"].astype(str).tolist())

    recommendations = []
    for category in categories:
        cat_df = df[df["category"] == category].nlargest(1, "score")
        if not cat_df.empty:
            top_product = cat_df.iloc[0]
            recommendations.append(
                {
                    "name": top_product.get("name", "Unknown"),
                    "description": top_product.get("details", "No details available"),
                    "category": category,
                }
            )
    return recommendations


def start(keywords):
    """
    Execute the recommendation process: compute recommendations based
    on keywords and return a formatted dictionary of results.
    """
    recommendations = get_recommendations(keywords)
    # print(f"Here are the recommendations {recommendations}")
    # final_result = get_results(recommendations_json)
    return recommendations
