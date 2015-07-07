using RestApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestApp.Extensions
{
    public static class RestModelExtension
    {
        public static void AddBaseActions(this RestModel item, string serviceUrl, string itemId)
        {
            if (item.Actions == null)
                item.Actions = new List<ItemAction>();

            item.Actions.Add(new ItemAction { Action = "Read", Url = GetItemUrl(serviceUrl, itemId), HttpMethod = "GET" });
            item.Actions.Add(new ItemAction { Action = "Update", Url = GetItemUrl(serviceUrl, itemId), HttpMethod = "PUT" });
            item.Actions.Add(new ItemAction { Action = "Delete", Url = GetItemUrl(serviceUrl, itemId), HttpMethod = "DELETE" });
        }

        public static void AddSpecificAction(this RestModel item, string serviceUrl, string methodUri, string itemId, string httpMethod, string action)
        {
            if (item.Actions == null)
                item.Actions = new List<ItemAction>();

            item.Actions.Add(new ItemAction { Action = action, Url = GetItemUrl(serviceUrl + methodUri, itemId), HttpMethod = httpMethod });
        }

        private static string GetItemUrl(string serviceUrl, string itemId)
        {
            return string.Format("{0}{1}", serviceUrl, itemId);
        }
    }
}