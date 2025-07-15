import azure.functions as func
import requests
import datetime
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    lat = "59.91"
    lon = "10.75"
    url = f"https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"
    headers = {'User-Agent': 'MyWeatherApp/1.0 contact@example.com'}

    resp = requests.get(url, headers=headers)
    data = resp.json()

    current = data["properties"]["timeseries"][0]
    temp = current["data"]["instant"]["details"]["air_temperature"]

    return func.HttpResponse(
        json.dumps({"temperature": temp}),
        mimetype="application/json"
    )
