using MesWeb.IRepo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TTCSN_CustomerManage.Data;

namespace API.Repository
{
    public class GenericRepo<T> : IRepo<T> where T : class
    {
        protected ApplicationDbContext db { get; set; }
        protected DbSet<T> table = null;

        public GenericRepo()
        {
            db = new ApplicationDbContext();
            table = db.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }

        public T GetByID(long id)
        {
            return table.Find(id);
        }

        public int Create(T item)
        {
            table.Add(item);
            return db.SaveChanges();
        }

        public int Update(T item)
        {
            table.Attach(item);
            db.Entry(item).State = EntityState.Modified;
            return db.SaveChanges();
        }


        public int Delete(long id)
        {
            table.Remove(table.Find(id));
            return db.SaveChanges();
        }

        public int Delete(List<T> item)
        {
            table.RemoveRange(item);
            return db.SaveChanges();

        }

        public async Task<int> CreateAsync(T item)
        {
            table.Add(item);
            return await db.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(T item)
        {
            table.Attach(item);
            db.Entry(item).State = EntityState.Modified;
            return await db.SaveChangesAsync();
        }

        public int RemoveRange(IEnumerable<T> items)
        {
            table.RemoveRange(items);
            return db.SaveChanges();
        }
    }
}
