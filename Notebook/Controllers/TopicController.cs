using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Notebook.Data;
using Notebook.Models;
namespace Notebook.Controllers;
[EnableCors()]
[ApiController]
[Route("Topic")]
public class TopicController : Controller
{
    protected readonly ApplicationDbContext _db;

    public TopicController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetTopics()
    {
        List<Topic> topicList = _db.Topic.ToList();
        return Ok(topicList);
    }

    [HttpGet]
    [Route("topicNotes")]
    public JsonResult GetTopicNotes(Guid topicId)
    {
        int notesExistInTopic = _db.Note.Where(note => note.TopicId.ToString().Equals(topicId)).Count();

        if (notesExistInTopic == 0)
        {
            return Json(notesExistInTopic);
        }
        else
        {
            return Json(notesExistInTopic);
        }
    }

    [HttpPost]
    public IActionResult CreateTopic(Topic topic)
    {
        _db.Topic.Add(topic);
        _db.SaveChanges();
        return Ok(topic);
    }

    [HttpDelete]
    public IActionResult DeleteTopic(Topic topic)
    {
        string topicId = topic.TopicId.ToString();
        List<Note> note = _db.Note.Where(x => x.TopicId.ToString().Equals(topicId)).ToList();

        if (note.Count > 0)
        {
            return Ok("No se puede borrar el tema, debido a que existen notas que pertenecer a este tema: " + topic.TopicId);
        }
        else
        {
            _db.Topic.Remove(topic);
            _db.SaveChanges();
            return Ok(topic);
        }
    }
}