FROM python:3.9

# Install build dependencies: gcc, pkg-config, netcat, and MySQL/MariaDB development libraries
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    netcat-openbsd \
    pkg-config \
    libmariadb-dev-compat \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/* && apt-get clean

WORKDIR /app

COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 4000

# For development
#CMD ["sh", "-c", "until nc -z mysql 3306; do echo 'Waiting for mysql...'; sleep 1; done; uvicorn main:app --host 0.0.0.0 --port 4000"]

# For production
CMD ["gunicorn", "-w", "3", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:4000", "main:app"]
