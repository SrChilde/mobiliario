# 1. Imagen del SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiamos el archivo del proyecto (asumiendo que está en la raíz del repo)
# Si está dentro de una carpeta, usa: COPY backend-api/*.csproj ./
COPY *.csproj ./
RUN dotnet restore

# Copiamos el resto de los archivos y publicamos
COPY . ./
RUN dotnet publish -c Release -o out

# 2. Imagen de ejecución (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Traemos lo compilado
COPY --from=build /app/out .

# Configuración de puerto para Render
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

# IMPORTANTE: Verifica que tu archivo se llame backend-api.csproj
# Si se llama distinto, cambia "backend-api.dll" por el nombre correcto.
ENTRYPOINT ["dotnet", "backend-api.dll"]