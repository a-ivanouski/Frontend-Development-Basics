using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace RestApp.Models
{
    [DataContract]
    public class RestModel
    {
        [DataMember]
        public List<ItemAction> Actions { get; set; }
    }
}
