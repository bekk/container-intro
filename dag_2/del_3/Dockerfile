FROM mcr.microsoft.com/azure-functions/python:4-python3.10

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY weather_function /home/site/wwwroot/weather_function
COPY host.json /home/site/wwwroot/host.json
COPY requirements.txt .

RUN pip install --upgrade pip \
    && pip install -r requirements.txt
