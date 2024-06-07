using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.AddDbContext<AppContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=dbforweb;Username=postgres;Password=postgres;"));

var app = builder.Build();

app.UseCors(builder => builder.AllowAnyOrigin());

app.MapGet("/", async (AppContext dbContext) =>
{
    var guitars = await dbContext.Guitars.OrderBy(g => g.guitar_id).ToListAsync();
    return Results.Json(guitars);
});

app.MapGet("/strings", async (AppContext dbContext) =>
{
    var strings = await dbContext.Strings.OrderBy(s => s.string_id).ToListAsync();
    return Results.Json(strings);
});

app.MapGet("/categories", async (AppContext dbContext) =>
{
    var categories = await dbContext.Categories.OrderBy(s => s.category_id).ToListAsync();
    return Results.Json(categories);
});

app.Run();

public class AppContext : DbContext
{
    public DbSet<Guitar> Guitars { get; set; }
    public DbSet<String> Strings { get; set; }
    public DbSet<Category> Categories { get; set; }

    public AppContext(DbContextOptions<AppContext> options) : base(options)
    {
    }
}

[Table("guitar")]
public class Guitar
{
    [Key]
    public int guitar_id { get; set; }
    public string guitar_name { get; set; }
    public int guitar_price { get; set; }
    public string guitar_img { get; set; }
    public int guitar_category { get; set; }
}

[Table("string")]
public class String
{
    [Key]
    public int string_id { get; set; }
    public string string_name { get; set; }
    public int string_price { get; set; }
    public string string_img { get; set; }
    public int string_category { get; set; }
}

[Table("category")]
public class Category
{
    [Key]
    public int category_id { get; set; }
    public string category_name { get; set; }
}
