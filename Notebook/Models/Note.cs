using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notebook.Models;

[Table("Note")]
public partial class Note
{
    [Key]
    public Guid NoteId { get; set; }
    public string? Title { get; set; }
    public string? Body { get; set; }
    public DateTime StartDateTime { get; set; }

    public Guid TopicId { get; set; }
    public virtual Topic? IdTopicNavigation { get; set; }
}