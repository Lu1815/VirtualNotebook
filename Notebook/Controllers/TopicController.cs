using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Notebook.Data;
using Notebook.Models;

namespace Notebook.Controllers;


[EnableCors("_myAllowSpecificOrigins")]
[ApiController]
[Route("Topic")]
public class TopicController : ControllerBase
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