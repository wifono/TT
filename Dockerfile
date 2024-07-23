FROM ubuntu:20.04

# Set environment variables
ENV NODE_VERSION=20

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    wget \
    fontconfig \
    fonts-liberation \
    build-essential \
    libfreetype6-dev \
    libfontconfig1 \
    libssl-dev \
    libssl1.1 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn

# Ensure Fontconfig is configured correctly
RUN fc-cache -fv

# Set working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

RUN yarn

# Expose application port
EXPOSE 3033

ENV FONTCONFIG_PATH=/etc/fonts

# Start the application
CMD ["yarn", "run", "dev"]
