using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace RestApp.Services.Interfaces
{
    [ServiceContract]
    public interface ICreateResource<T>
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        void Create(T item);
    }
}
