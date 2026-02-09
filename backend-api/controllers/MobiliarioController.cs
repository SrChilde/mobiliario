using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace backend_api.Controllers;

[ApiController]
[Route("api/mobiliario")]
public class MobiliarioController : ControllerBase
{
    private static readonly List<MobiliarioDto> _mobiliario = new()
    {
        new MobiliarioDto { Id = 1, Codigo = "MOB-001", Titulo = "Mesa de sala", Descripcion = "Mesa de madera redonda pensada para centro de sala", Estado = "Disponible", Ubicacion = "Almacen 1", Cantidad = 5, Observaciones = "Ninguna" },
        new MobiliarioDto { Id = 2, Codigo = "ESC-001", Titulo = "Silla de Oficina", Descripcion = "Silla para oficina negra de 4 patas con soporte para cuello y columna", Estado = "Disponible", Ubicacion = "Almacen 1", Cantidad = 5, Observaciones = "Ninguna" },
        new MobiliarioDto { Id = 3, Codigo = "ARM-001", Titulo = "Armario", Descripcion = "Armario de madera con puertas corredizas", Estado = "Asignado", Ubicacion = "Almacen 1", Cantidad = 5, Observaciones = "Ninguna" }
    };

    // GET: Traer todos los muebles
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_mobiliario);
    }

    public class CrearMobiliarioRequest
    {
        public string? Codigo { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        public string? Ubicacion { get; set; }
        public int? Cantidad { get; set; }
        public string Observaciones { get; set; }
    }

    // POST: Crear nuevo mueble
    [HttpPost]
    public IActionResult Post([FromBody] CrearMobiliarioRequest req)
    {
        if (req == null || string.IsNullOrWhiteSpace(req.Codigo) || 
            string.IsNullOrWhiteSpace(req.Titulo) || 
            string.IsNullOrWhiteSpace(req.Descripcion) ||
            string.IsNullOrWhiteSpace(req.Estado) ||
            string.IsNullOrWhiteSpace(req.Ubicacion) ||
            string.IsNullOrWhiteSpace(req.Cantidad) ||
            string.IsNullOrWhiteSpace(req.Cantidad))
            return BadRequest("Todos los campos son obligatorios.");

        var estadosValidos = new[] { "Disponible", "Asignado", "Dañado", "En Proceso" };
        if (!estadosValidos.Contains(req.Estado))
            return BadRequest($"Estado inválido. Valores permitidos: {string.Join(", ", estadosValidos)}");

        var nuevoId = _mobiliario.Count == 0 ? 1 : _mobiliario.Max(m => m.Id) + 1;

        var nuevo = new MobiliarioDto
        {
            Id = nuevoId,
            Codigo = req.Codigo.Trim().ToUpper(),
            Titulo = req.Titulo.Trim(),
            Descripcion = req.Descripcion.Trim(),
            Estado = req.Estado.Trim(),
            Ubicacion = req.Ubicacion.Trim(),
            Cantidad = req.Cantidad,
            Observaciones = req.Observaciones.Trim()
        };

        _mobiliario.Add(nuevo);

        return Ok(nuevo);
    }

    public class ActualizarMobiliarioRequest
    {
        public string? Codigo { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        public string? Ubicacion { get; set; }
        public int? Cantidad { get; set; }
        public string Observaciones { get; set; }
    }

    // PUT: Actualizar un mueble existente
    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] ActualizarMobiliarioRequest req)
    {
        var existente = _mobiliario.FirstOrDefault(m => m.Id == id);
        if (existente == null) return NotFound("Mueble no encontrado.");

        if (req == null || string.IsNullOrWhiteSpace(req.Codigo) || 
            string.IsNullOrWhiteSpace(req.Titulo) || 
            string.IsNullOrWhiteSpace(req.Descripcion) ||
            string.IsNullOrWhiteSpace(req.Estado) ||
            string.IsNullOrWhiteSpace(req.Ubicacion) ||
            string.IsNullOrWhiteSpace(req.Cantidad) ||
            string.IsNullOrWhiteSpace(req.Cantidad))
            return BadRequest("Todos los campos son obligatorios.");
            return BadRequest("Código, título, descripción y estado son obligatorios.");

        var estadosValidos = new[] { "Disponible", "Asignado", "Dañado", "En Proceso" };
        if (!estadosValidos.Contains(req.Estado))
            return BadRequest($"Estado inválido. Valores permitidos: {string.Join(", ", estadosValidos)}");

        existente.Codigo = req.Codigo.Trim().ToUpper();
        existente.Titulo = req.Titulo.Trim();
        existente.Descripcion = req.Descripcion.Trim();
        existente.Estado = req.Estado.Trim();
        existente.Ubicacion = req.Ubicacion.Trim();
        existente.Cantidad = req.Cantidad;
        existente.Observaciones = req.Observaciones.Trim();

        return Ok(existente);
    }

    public class MobiliarioDto
    {
        public int Id { get; set; }
        public string Codigo { get; set; } = "";
        public string Titulo { get; set; } = "";
        public string Descripcion { get; set; } = "";
        public string Estado { get; set; } = "";
        public string Ubicacion { get; set; } = "";
        public int Cantidad { get; set; } = "" ;
        public string Observaciones { get; set; } = "";
    }
}
