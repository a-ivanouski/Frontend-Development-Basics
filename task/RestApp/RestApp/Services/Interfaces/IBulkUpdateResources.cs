using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace RestApp.Services.Interfaces
{
    [ServiceContract]
    public interface IBulkUpdateResources<T>
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "/items/", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        void BulkUpdate(List<T> items);
    }
}
