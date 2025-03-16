import sys
import json
import os
from recommendation import start  

try:
    keywords = sys.argv[1]  # Passed from GraphQL resolverß
    results = start(keywords)

    # #construct response
    # response = {
    #     "results": results,
    #     "message": "Recommendations generated successfully",
    # }

    print(json.dumps(results))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)  
