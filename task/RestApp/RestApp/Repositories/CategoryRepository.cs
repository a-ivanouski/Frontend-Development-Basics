using RestApp.Models;
using RestApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using System.Text;
using RestApp.DataContext;

namespace RestApp.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        const string ConnectionStringKey = "CategoryRepositoryContectionString";

        private SimpleDataContext<Category> dataContext;

        public CategoryRepository()
        {
            dataContext = new SimpleDataContext<Category>(ConfigurationManager.AppSettings[ConnectionStringKey]);
        }

        public string Create(Category item)
        {
            item.Id = Guid.NewGuid().ToString();

            dataContext.Data.Add(item);

            dataContext.Save();

            return item.Id;
        }

        public Category Read(string id)
        {
            return dataContext.Data.FirstOrDefault(i => i.Id.Equals(id));
        }

        public List<Category> ReadAll(string searchParams = null)
        {
            return dataContext.Data;
        }

        public void Update(Category item)
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
    }
}