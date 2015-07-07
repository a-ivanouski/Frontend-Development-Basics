using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestApp.Models
{
    public class ItemAction
    {
        public string Action { get; set; }

        public string Url { get; set; }

        public string HttpMethod { get; set; }
    }
}
