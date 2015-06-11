using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestApp.Repositories.Interfaces
{
    public interface IRepository<T>
    {
        string Create(T item);

        T Read(string id);

        List<T> ReadAll(string searchParams = null);

        void Update(T item);

        void Delete(string id);
    }
}
