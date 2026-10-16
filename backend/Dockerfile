FROM php:8.2-apache

# Install PDO MySQL extension, curl, and SSL CA certificates
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    ca-certificates \
    && update-ca-certificates \
    && docker-php-ext-install pdo pdo_mysql curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy backend files into Apache web root
COPY . /var/www/html/

# Fix permissions
RUN chown -R www-data:www-data /var/www/html

# Expose standard web port
EXPOSE 80
