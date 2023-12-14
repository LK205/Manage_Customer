using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MesWeb.IRepo
{
    public interface IRepo<T> where T:class
    {
        IEnumerable<T> GetAll();
        T GetByID(long id);
        int Create(T item);
        int Update(T item);
        int Delete(long id);
        int RemoveRange(IEnumerable<T> items);
    }
}
