import azure.functions as func
import requests
import json
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Weather function triggered.")

    lat = "59.91"
    lon = "10.75"
    url = f"https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"
    headers = {'User-Agent': 'MyWeatherApp/1.0 contact@example.com'}

    try:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        data = resp.json()

        current = data["properties"]["timeseries"][0]
        temp = current["data"]["instant"]["details"]["air_temperature"]

        logging.info(f"Temperature fetched: {temp}")
        return func.HttpResponse(
            json.dumps({"temperature": temp}),
            mimetype="application/json"
        )

    except requests.RequestException as e:
        logging.error(f"HTTP error fetching weather data: {e}")
        return func.HttpResponse(
            "Error fetching weather data.",
            status_code=500
        )

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return func.HttpResponse(
            "An unexpected error occurred.",
            status_code=500
        )
