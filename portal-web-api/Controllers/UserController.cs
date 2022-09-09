﻿using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.Models;

namespace portal_web_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/user
        [HttpGet]
        [Route("getAll")]
        public IActionResult Get()
        {
            var tarefas = _userRepository.GetAll();
            return Ok(tarefas);
        }

        // GET api/user/{id}
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var tarefa = _userRepository.FindById(id);

            if (tarefa == null)
                return NotFound();

            return Ok(tarefa);
        }

        //POST api/user
        [HttpPost]
        public IActionResult Post([FromBody] User newUser)
        {
            _userRepository.Create(newUser);
            return Created("", newUser);
        }

        // DELETE api/user/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var tarefa = _userRepository.FindById(id);

            if (tarefa == null)
                return NotFound();

            _userRepository.Delete(tarefa);

            return NoContent();
        }
    }
}
