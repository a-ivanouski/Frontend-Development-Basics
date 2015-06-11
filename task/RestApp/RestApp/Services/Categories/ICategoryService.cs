using RestApp.Models;
using RestApp.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace RestApp.Services.Categories
{
    [ServiceContract]
    public interface ICategoryService : IReadResource<Category>, ICreateResource<Category>, IUpdateResource<Category>, IDeleteResource, ISearchResource<Category>
    {
    }
}
