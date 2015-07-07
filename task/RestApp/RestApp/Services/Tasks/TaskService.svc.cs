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

namespace RestApp.Services.Tasks
{
    public class TaskService : ITaskService
    {
        private IRepository<Task> taskRepository;

        private IRepository<Category> categoryRepository;

        public TaskService()
        {
            taskRepository = new TaskRepository();
            categoryRepository = new CategoryRepository();
        }

        public void CheckTask(string id)
        {
            var item = taskRepository.Read(id);

            item.Status = TaskStatuses.Completed;

            taskRepository.Update(item);
        }

        public Task Read(string id)
        {
            var item = taskRepository.Read(id);

            var serviceUrl = GetServiceUrl();

            item.AddBaseActions(serviceUrl.Substring(0, serviceUrl.LastIndexOf('/') + 1), item.Id);
            item.AddSpecificAction(serviceUrl.Substring(0, serviceUrl.LastIndexOf('/') + 1), "Check/", item.Id, "PUT", "Check");

            return taskRepository.Read(id);
        }

        public void Create(Task task)
        {
            if (categoryRepository.Read(task.Category.Id) == null)
                throw new Exception(string.Format("The category {0} does not exist", task.Category.Name));

            taskRepository.Create(task);
        }

        public void Update(string id, Task task)
        {
            if (categoryRepository.Read(task.Category.Id) == null)
                throw new Exception(string.Format("The category {0} does not exist", task.Category.Name));

            task.Id = id;

            taskRepository.Update(task);
        }

        public void Delete(string id)
        {
            taskRepository.Delete(id);
        }

        public List<Task> Search(string searchParams = null)
        {
            var items = taskRepository.ReadAll(searchParams);

            var serviceUrl = GetServiceUrl();

            foreach (var item in items)
            {
                item.AddBaseActions(serviceUrl, item.Id);

                item.AddSpecificAction(serviceUrl, "Check/", item.Id, "PUT", "Check");
            }

            return items;
        }

        public void BulkUpdate(List<Task> tasks)
        {
            foreach (var task in tasks)
            {
                if (categoryRepository.Read(task.Category.Id) == null)
                    throw new Exception(string.Format("The category {0} does not exist", task.Category.Name));

                taskRepository.Update(task);
            }
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
