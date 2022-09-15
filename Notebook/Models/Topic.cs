using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notebook.Models;

[Table("Topic")]
public partial class Topic
{
    [Key]
    public Guid TopicId { get; set; }
    public string? Name { get; set; }
    public virtual List<Note>? Notes { get; set; }
}