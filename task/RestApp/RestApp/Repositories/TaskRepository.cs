using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestApp.DataContext;
using RestApp.Models;
using RestApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace RestApp.Repositories
{
    public class TaskRepository : IRepository<Task>
    {
        const string ConnectionStringKey = "TaskRepositoryContectionString";

        private SimpleDataContext<Task> dataContext;

        const string innerObjectSearchKey = "Name";

        public TaskRepository()
        {
            dataContext = new SimpleDataContext<Task>(ConfigurationManager.AppSettings[ConnectionStringKey]);
        }

        public string Create(Task item)
        {
            item.Id = Guid.NewGuid().ToString();

            dataContext.Data.Add(item);

            dataContext.Save();

            return item.Id;
        }

        public Task Read(string id)
        {
            return dataContext.Data.FirstOrDefault(i => i.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        }

        public List<Task> ReadAll(string searchParams = null)
        {
            if (string.IsNullOrEmpty(searchParams))
                return dataContext.Data;

            return Search(searchParams);
        }

        public void Update(Task item)
        {
            var isDeleteSuccess = dataContext.Data.RemoveAll(i => i.Id.Equals(item.Id)) == 1 ? true : false;

            if (!isDeleteSuccess)
                throw new Exception("There is no elements to update");

            dataContext.Data.Add(item);

            dataContext.Save();
        }

        public void Delete(string id)
        {
            dataContext.Data.RemoveAll(i => i.Id.Equals(id));

            dataContext.Save();
        }

        private List<Task> Search(string searchParams)
        {
            var filters = ParseSearchParams(searchParams);

            var jObject = JArray.FromObject(dataContext.Data);

            return jObject.Where(x =>
            {
                foreach (var filter in filters)
                {
                    var jToken = x[filter.Key];

                    if (jToken == null)
                        throw new NullReferenceException("Invalid search key");

                    if ((jToken.Type.Equals(JTokenType.Object) && string.Equals(jToken[innerObjectSearchKey].Value<string>(), filter.Value)) ||
                        (!jToken.Type.Equals(JTokenType.Object) && string.Equals(jToken.Value<string>(), filter.Value)))
                    {
                        return true;
                    }
                }

                return false;
            }).Select(i => 
                    JsonConvert.DeserializeObject <Task>(i.ToString())
                ).ToList();
        }

        private static IEnumerable<KeyValuePair<string, string>> ParseSearchParams(string searchParams)
        {
            var filters = searchParams.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).Select(f => 
                new KeyValuePair<string, string>(f.Split(new char[] { ':' })[0], 
                    f.Split(new char[] { ':' })[1]));
            return filters;
        }
    }
}