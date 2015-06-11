using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace RestApp.Services.Interfaces
{
    [ServiceContract]
    public interface IUpdateResource<T>
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json)]
        void Update(T item);
    }
}
