FROM python:3.9

WORKDIR /app

# Dependencies
COPY requirements.txt /app
RUN pip install -r requirements.txt

# Copy Structure 
COPY api /app
COPY scripts /app/scripts
COPY .flaskenv /app

EXPOSE 5000

CMD scripts/run_server.sh
