using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace RestApp.Services.Interfaces
{
    [ServiceContract]
    public interface ISearchResource<T>
    {
        [OperationContract]
        [WebGet(UriTemplate = "?searchParams={searchParams}", ResponseFormat = WebMessageFormat.Json)]
        List<T> Search(string searchParams = null);
    }
}
