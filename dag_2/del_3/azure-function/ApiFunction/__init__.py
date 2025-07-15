import azure.functions as func
import json
import random
import requests
import logging

def main(req: func.HttpRequest, endpoint: str) -> func.HttpResponse:
    logging.info(f"Endpoint triggered: {endpoint}")

    if endpoint == "health":
        return func.HttpResponse(
            json.dumps({
                "status": "Healthy!",
                "runtime": "Azure Functions - Python"
            }),
            mimetype="application/json"
        )

    elif endpoint == "random-number":
        number = random.randint(0, 999)
        return func.HttpResponse(
            json.dumps({"random_number": number}),
            mimetype="application/json"
        )

    elif endpoint == "quote":
        try:
            proxy_url = "https://corsproxy.io/?https://quotes.alakhpc.com/quotes"
            response = requests.get(proxy_url)
            response.raise_for_status()
            data = response.json()
            return func.HttpResponse(
                json.dumps(data),
                mimetype="application/json"
            )
        except requests.RequestException as e:
            logging.error(f"Error fetching quote: {e}")
            return func.HttpResponse(
                json.dumps({"error": "Feil ved henting av data"}),
                status_code=500,
                mimetype="application/json"
            )

    else:
        return func.HttpResponse(
            json.dumps({"error": "Invalid endpoint."}),
            status_code=404,
            mimetype="application/json"
        )
