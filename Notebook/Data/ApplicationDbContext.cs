using Microsoft.EntityFrameworkCore;
using Notebook.Models;

namespace Notebook.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public virtual DbSet<Note> Note { get; set; }
    public virtual DbSet<Topic> Topic { get; set; }
}