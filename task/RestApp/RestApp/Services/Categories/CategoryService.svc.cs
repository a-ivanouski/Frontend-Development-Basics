using RestApp.Models;
using RestApp.Repositories;
using RestApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

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
            return categoryRepository.Read(id);
        }

        public void Create(Category category)
        {
            categoryRepository.Create(category);
        }

        public void Update(Category category)
        {
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
            return categoryRepository.ReadAll();
        }
    }
}
