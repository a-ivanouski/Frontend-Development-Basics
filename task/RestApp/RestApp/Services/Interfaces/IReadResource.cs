using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace RestApp.Services.Interfaces
{
    [ServiceContract]
    public interface IReadResource<T>
    {
        [OperationContract]
        [WebGet(UriTemplate = "{id}", ResponseFormat = WebMessageFormat.Json)]
        T Read(string id);
    }
}
