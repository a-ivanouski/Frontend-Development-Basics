using RestApp.Models;
using RestApp.Repositories;
using RestApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using RestApp.Extensions;

namespace RestApp.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private IRepository<Category> categoryRepository;

        private IRepository<Task> taskRepository;

        public CategoryService()
        {
            categoryRepository = new CategoryRepository();
            taskRepository = new TaskRepository();
        }

        public Category Read(string id)
        {
            var item = categoryRepository.Read(id);

            var serviceUrl = GetServiceUrl();

            item.AddBaseActions(serviceUrl.Substring(0, serviceUrl.LastIndexOf('/') + 1), item.Id);

            return item;
        }

        public void Create(Category category)
        {
            categoryRepository.Create(category);
        }

        public void Update(string id, Category category)
        {
            category.Id = id;

            categoryRepository.Update(category);

            foreach (var task in new List<Task>(taskRepository.ReadAll().Where(t => t.Category.Id.Equals(category.Id))))
            {
                task.Category = category;

                taskRepository.Update(task);
            }
        }

        public void Delete(string id)
        {
            categoryRepository.Delete(id);

            foreach (var task in new List<Task>(taskRepository.ReadAll().Where(t => t.Category.Id.Equals(id))))
            {
                taskRepository.Delete(task.Id);
            }
        }

        public List<Category> Search(string searchParams)
        {
            var items = categoryRepository.ReadAll();

            foreach (var item in items)
            {
                item.AddBaseActions(GetServiceUrl(), item.Id);
            }

            return categoryRepository.ReadAll();
        }

        private static string GetServiceUrl()
        {
            var serviceUrl = OperationContext.Current.RequestContext.RequestMessage.Headers.To.AbsoluteUri;

            if (serviceUrl.Contains('?'))
                serviceUrl = serviceUrl.Substring(0, serviceUrl.LastIndexOf('?'));

            return serviceUrl;
        }
    }
}
