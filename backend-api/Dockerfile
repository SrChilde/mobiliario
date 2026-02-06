# STAGE 1: Compilar Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /src
COPY frontend-web/package*.json ./frontend-web/
RUN cd frontend-web && npm install
COPY frontend-web ./frontend-web/
RUN cd frontend-web && npm run build

# STAGE 2: Compilar Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY backend-api/backend-api.csproj ./backend-api/
RUN cd backend-api && dotnet restore "backend-api.csproj"

COPY backend-api ./backend-api/
RUN cd backend-api && dotnet publish "backend-api.csproj" -c Release -o /app/out

# STAGE 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/out .
COPY --from=frontend-build /src/frontend-web/build ./wwwroot

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "backend-api.dll"]