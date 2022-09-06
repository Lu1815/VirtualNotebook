namespace Notebook.Models;

public partial class NoteViewModel
{
    public Guid NoteId { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public DateTime StartDateTime { get; set; }
    public string Topic { get; set; }
}