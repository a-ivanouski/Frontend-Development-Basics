using RestApp.Models;
using RestApp.Repositories;
using RestApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

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
            return taskRepository.Read(id);
        }

        public void Create(Task task)
        {
            if (categoryRepository.Read(task.Category.Id) == null)
                throw new Exception(string.Format("The category {0} does not exist", task.Category.Name));

            taskRepository.Create(task);
        }

        public void Update(Task task)
        {
            if (categoryRepository.Read(task.Category.Id) == null)
                throw new Exception(string.Format("The category {0} does not exist", task.Category.Name));

            taskRepository.Update(task);
        }

        public void Delete(string id)
        {
            taskRepository.Delete(id);
        }

        public List<Task> Search(string searchParams = null)
        {
            return taskRepository.ReadAll(searchParams);
        }
    }
}
