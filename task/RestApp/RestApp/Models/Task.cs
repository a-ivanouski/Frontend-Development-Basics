using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace RestApp.Models
{
    [DataContract]
    public class Task
    {
        [DataMember]
        public string Id { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public DateTime Deadline { get; set; }

        [DataMember]
        public TaskPriorities Priority { get; set; }

        [DataMember]
        public Category Category { get; set; }

        [DataMember]
        public TaskStatuses Status { get; set; }

        [OnDeserialized]
        void OnDeserialized(StreamingContext context)
        {
            if (default(DateTime).Equals(Deadline))
            {
                Deadline = new DateTime(2000, 1, 1);
            }
        }
    }
}