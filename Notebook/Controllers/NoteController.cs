using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Notebook.Data;
using Notebook.Models;

namespace Notebook.Controllers;
[EnableCors()]
[ApiController]
[Route("Note")]
public class NotebookController : Controller
{
    private List<NoteViewModel> noteList;
    Guid emptyGuidId = new Guid();
    protected readonly ApplicationDbContext _db;
    public NotebookController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [Route("one")]
    public IActionResult GetNote(Guid id)
    {

        string noteId = id.ToString();
        Note note = _db.Note.FirstOrDefault(note => note.NoteId.ToString().Equals(noteId));

        if (note != null)
        {
            return Ok(note);
        }
        else
        {
            return Ok("NO EXISTE UNA NOTA CON EL ID ESPECIFICADO!!");
        }
    }

    [HttpGet]
    [Route("all")]
    public IActionResult GetAllNotes(
        Boolean orderByTopic,
        Boolean orderByTitle,
        Boolean orderByDate
    )
    {
        noteList = _db.Note.ToList().Join(
            _db.Topic,
            note => note.TopicId,
            topic => topic.TopicId,
            (note, topic) => new NoteViewModel()
            {
                NoteId = note.NoteId,
                Title = note.Title,
                Body = note.Body,
                StartDateTime = note.StartDateTime,
                Topic = topic.Name
            }
        ).ToList();

        if (orderByTopic)
        {
            return Ok(noteList.OrderBy(x => x.Topic));
        }
        else if (orderByTitle)
        {
            return Ok(noteList.OrderBy(x => x.Title));
        }
        else if (orderByDate)
        {
            return Ok(noteList.OrderBy(x => x.StartDateTime));
        }

        return Ok(noteList);
    }

    [HttpGet]
    public IActionResult GetNotes(
        Guid topicId,
        Boolean orderByTopic,
        Boolean orderByTitle,
        Boolean orderByDate,
        string? searchTerm
    )
    {
        noteList = _db.Note.Where(note =>
            note.TopicId.ToString().Equals(topicId.ToString())
        ).Join(
            _db.Topic,
            note => note.TopicId,
            topic => topic.TopicId,
            (note, topic) => new NoteViewModel()
            {
                NoteId = note.NoteId,
                Title = note.Title,
                Body = note.Body,
                StartDateTime = note.StartDateTime,
                Topic = topic.Name
            }
        ).ToList();

        if (orderByTitle)
        {
            return Ok(noteList.OrderBy(x => x.Topic));
        }
        else if (orderByDate)
        {
            return Ok(noteList.OrderBy(x => x.StartDateTime));
        }
        else if (searchTerm != null)
        {
            return Ok(noteList.Where(x =>
                x.Title.Contains(searchTerm) ||
                x.Body.Contains(searchTerm)
            ));
        }

        return Ok(noteList);
    }

    [HttpPost]
    public IActionResult CreateNote(Note note)
    {
        try
        {
            note.StartDateTime = DateTime.Now;
            _db.Note.Add(note);
            _db.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine("ERROR AL GUARDAR NOTA: " + e);
        }

        return Ok(note);
    }

    [HttpPut]
    public IActionResult EditNote(Note note)
    {
        Note? noteObj = new Note();
        noteObj = _db.Note.FirstOrDefault(x => x.NoteId.ToString().Equals(note.NoteId.ToString()));
        noteObj.Title = note.Title;
        noteObj.Body = note.Body;

        if (noteObj != null)
        {
            try
            {
                _db.Note.Update(noteObj);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine("ERROR AL ACTUALIZAR NOTA: " + noteObj + " - " + e);
            }
        }

        return Ok(noteObj);
    }

    [HttpDelete]
    public IActionResult DeleteNote(Note note)
    {
        Note? noteObj = new Note();
        noteObj = _db.Note.FirstOrDefault(x => x.NoteId.ToString().Equals(note.NoteId.ToString()));

        try
        {
            _db.Note.Remove(noteObj);
            _db.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine("ERROR DELETING THE NOTE: " + noteObj + " - " + e);
        }
        return Ok(noteObj);
    }
}