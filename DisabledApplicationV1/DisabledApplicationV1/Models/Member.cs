using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DisabledApplicationV1.Models
{
    public class Member
    {
        public int userId { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string username { get; set; }
        public int usertype { get; set; }
        public string story { get; set; }
    }
}