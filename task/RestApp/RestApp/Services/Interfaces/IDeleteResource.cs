using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace RestApp.Services.Interfaces
{
    [ServiceContract]
    public interface IDeleteResource
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "{id}", Method = "DELETE")]
        void Delete(string id);
    }
}
