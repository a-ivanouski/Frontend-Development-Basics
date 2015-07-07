using RestApp.Models;
using RestApp.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace RestApp.Services.Tasks
{
    [ServiceContract]
    public interface ITaskService : IReadResource<Task>, ICreateResource<Task>, IUpdateResource<Task>, IDeleteResource, ISearchResource<Task>, IBulkUpdateResources<Task>
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "Check/{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        void CheckTask(string id);
    }
}
