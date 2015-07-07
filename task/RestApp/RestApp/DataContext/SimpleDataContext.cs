using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace RestApp.DataContext
{
    public class SimpleDataContext<T>
    {
        private readonly string connectionString;

        private List<T> data;

        public List<T> Data
        { 
            get{
                if (data == null)
                {
                    if (!File.Exists(connectionString))
                        using (File.Create(connectionString)) { }

                    var s = Path.GetFullPath(connectionString);

                    using (var sr = new StreamReader(connectionString))
                    {
                        data = JsonConvert.DeserializeObject<List<T>>(sr.ReadToEnd());
                    }
                }

                if (data == null)
                    data = new List<T>();

                return data;
            }
            private set{
                data = value;
            }
        }

        private string RepositoryPath {
            get {
                var path = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["RepositoriesPath"]);

                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                return path;
            } 
        }

        public SimpleDataContext(string connectionString)
        {
            this.connectionString = Path.Combine(RepositoryPath, connectionString);
        }

        public void Save()
        {
            using (var sw = new StreamWriter(connectionString))
            {
                sw.Write(JsonConvert.SerializeObject(Data));
            }

            Data = null;
        }
    }
}