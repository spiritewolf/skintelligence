import json
import os
import re
import math
import pandas as pd
from collections import Counter


def cosine_similarity_of(text1, text2):
    """
    Compute cosine similarity between two text strings, returning
    the similarity as an integer percentage.
    """
    # Normalize and tokenize the texts
    tokens1 = re.findall(r"[\w']+", text1.lower())
    tokens2 = re.findall(r"[\w']+", text2.lower())

    vector1, vector2 = Counter(tokens1), Counter(tokens2)
    common_tokens = set(vector1) & set(vector2)
    dot_product = sum(vector1[token] * vector2[token] for token in common_tokens)

    magnitude1 = math.sqrt(sum(count**2 for count in vector1.values()))
    magnitude2 = math.sqrt(sum(count**2 for count in vector2.values()))

    return int((dot_product / (magnitude1 * magnitude2)) * 100) if magnitude1 and magnitude2 else 0

def get_recommendations(keywords: str) -> list:
    """
    Reads product data from CSV, computes similarity scores, and returns a structured dictionary
    containing the top recommendation per category.
    """
    # Locate CSV file dynamically
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, "data.csv")

    # Load data
    df = pd.read_csv(csv_path)
    categories = ["CLEANSER", "SERUM", "MOISTURIZER", "SUNSCREEN"]

    # Compute similarity scores
    df["score"] = df["goals"].astype(str).apply(lambda x: cosine_similarity_of(x, keywords))

    # Filter products with scores > 30 and pick the top 15 overall
    filtered_df = df[df["score"] > 30].nlargest(15, "score")

    # Extract the top recommended product per category
    recommendations = []
    for category in categories:
        cat_df = filtered_df[filtered_df["category"] == category]
        if not cat_df.empty:
            top_product = cat_df.loc[cat_df["score"].idxmax()]
            rec = {
                "name": top_product.get("name", "Unknown"),
                "description": top_product.get("details", "No details available"),
                "category": category
            }
            recommendations.append(rec)

    return recommendations

def get_results(json_string):
    """
    Parse the JSON string of recommendations and build a dictionary
    mapping each category to its top product's name and details.
    """
    recommendations_list = json.loads(json_string)
    results = {'cleanser': [], 'serum': [], 'moisturizer': [], 'sunscreen': []}
    
    for item in recommendations_list:
        cat = item.get('category')
        if cat in results:
            results[cat] = [item.get('name'), item.get('details')]
    
    return results

def start(keywords):
    """
    Execute the recommendation process: compute recommendations based
    on keywords and return a formatted dictionary of results.
    """
    recommendations = get_recommendations(keywords)
    # print(f"Here are the recommendations {recommendations}")
    # final_result = get_results(recommendations_json)
    return recommendations
