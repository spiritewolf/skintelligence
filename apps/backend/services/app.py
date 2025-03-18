import sys
import json
from recommendation import start

try:
    keywords = sys.argv[1]  # Passed from GraphQL resolverß
    results = start(keywords)
    print(json.dumps(results))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
