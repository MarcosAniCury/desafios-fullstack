﻿using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class ClientGetByNameRequest
    {
        public ClientGetByNameRequest(string research, int pageIndex)
        {
            Research = research;
            PageIndex = pageIndex;
        }

        [Required(ErrorMessage = "O campo de pesquisa é obrigatório")]
        public string Research { get; private set; }

        [Range(1, int.MaxValue, ErrorMessage = "O campo página deve ter o valor minimo de 1")]
        [Required(ErrorMessage = "O campo página é obrigatório")]
        public int PageIndex { get; set; }
    }
}
