using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar el puerto para Render (Vital)
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://*:{port}");

// 2. Servicios base
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 3. CORS (Mantenemos tu política pero le cambiamos el nombre a algo más general)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 4. Configuración del pipeline (Quitamos Redirection para Render)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// 5. ORDEN CRÍTICO: CORS siempre antes que Controllers
app.UseCors("AllowAll");

// 6. Servir archivos estáticos del frontend compilado
app.UseStaticFiles();

app.MapControllers();

// 7. Ruta de salud rápida
app.MapGet("/api/health", () => "Backend Funcionando");

// 8. Fallback a index.html para Client-Side Routing de React
app.MapFallbackToFile("index.html");

app.Run();