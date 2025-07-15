FROM mcr.microsoft.com/azure-functions/python:4-python3.10

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot/weather_function

# Install dependencies
RUN pip install --upgrade pip \
    && pip install -r /home/site/wwwroot/weather_function/requirements.txt
