using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Notebook.Data;

var builder = WebApplication.CreateBuilder(args);
{
    string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        options.UseSqlServer(connectionString);
    });

    builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

    builder.Services.AddCors();
}

var app = builder.Build();
{
    app.UseHttpsRedirection();
    //app cors
    app.UseCors(builder => builder
        .WithOrigins("*")
        .AllowAnyMethod()
        .AllowAnyHeader()
    );

    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();

    app.Run();
}

