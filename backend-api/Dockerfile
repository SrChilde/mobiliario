FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos el archivo del proyecto específicamente
COPY ["backend-api.csproj", "./"]
RUN dotnet restore "backend-api.csproj"

# Copiamos el resto de los archivos
COPY . .
RUN dotnet publish "backend-api.csproj" -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "backend-api.dll"]