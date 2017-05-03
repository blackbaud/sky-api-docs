using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Authenticators;

namespace Blackbaud.Demo.SyncToRE
{
    class SyncData
    {
        // RestSharp client for making REST requests. For more information on 
        // this components, see http://restsharp.org/
        private readonly RestClient _client;

        public SyncData(string accessToken, string subscriptionKey)
        {
            _client = new RestClient(new Uri("https://api.sky.blackbaud.com/constituent/v1/"))
            {
                // The accessToken is a JWT retrieved from Sky API authorization code flow. For more 
                // information, see https://apidocs.sky.blackbaud.com/docs/authorization/auth-code-flow/
                Authenticator = new JwtAuthenticator(accessToken),

                // The subscriptionKey is retrieved from a developer profile. You can 
                // find your subscription key at https://developer.sky.blackbaud.com/developer
                DefaultParameters =
                {
                    new Parameter() { Type = ParameterType.HttpHeader, Name = "bb-api-subscription-key", Value = subscriptionKey }
                }
            };
        }

        public async Task SyncConstituentToRENXTAsync(Constituent constituent, CancellationToken cancellationToken)
        {
            try
            {
                var searchResults = await SearchForConstituent(constituent, cancellationToken);

                if (!searchResults.Any())
                {
                    // If the constituent cannot be found, add it RE NXT
                    var newId = await AddConstituent(constituent, cancellationToken);
                    constituent.id = newId;

                    // Add any custom fields to the new constituent that are needed to keep your systems in sync
                    await AddCustomDataSourceIdToConstituent(constituent, cancellationToken);
                }
                else
                {
                    ConstituentSearchResult foundConstituent;
                    if (searchResults.Count() == 1)
                    {
                        foundConstituent = searchResults.First();
                    }
                    else
                    {
                        // If there are multiple search results, you may want to try to match the results on other data
                        // In this example, we are going to use the Custom Data Source Id custom field
                        foundConstituent = await FindConstituentInSearchResultsUsingCustomDataSourceId(constituent, searchResults, cancellationToken);
                    }

                    constituent.id = foundConstituent.id;
                    await UpdateConstituent(constituent, cancellationToken);
                }
            }
            catch (TaskCanceledException)
            {
            }
        }

        private async Task<IEnumerable<ConstituentSearchResult>> SearchForConstituent(Constituent constituent, CancellationToken cancellationToken)
        {
            // Set up the Rest Request to https://api.sky.blackbaud.com/constituent/search?search_text=<email_address>
            string requestUrl = string.Format("constituents/search?search_text={0}", constituent.email_address);
            var request = new RestRequest(requestUrl, Method.GET);

            var response = await _client.ExecuteTaskAsync(request, cancellationToken);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                // Handle request errors here...
                Console.WriteLine($"ERROR: Constituent Search returned ({response.StatusCode})\r\n{response.Content}");
            }

            var collectionResponse = JObject.Parse(response.Content);
            var searchResults = collectionResponse["value"].ToObject<IEnumerable<ConstituentSearchResult>>();

            return searchResults;
        }

        private async Task<ConstituentSearchResult> FindConstituentInSearchResultsUsingCustomDataSourceId(Constituent constituent, IEnumerable<ConstituentSearchResult> searchResults, CancellationToken cancellationToken)
        {
            foreach (ConstituentSearchResult result in searchResults)
            {
                var customFields = await GetCustomFieldsForConstituent(result, cancellationToken);
                var customDataSourceId = (from cf in customFields
                                        where cf.category.Equals("Custom Data Source Id")
                                        select cf).FirstOrDefault();

                if (customDataSourceId != null && constituent.custom_data_source_id.Equals(customDataSourceId.value))
                {
                    return result;
                }
            }

            // To keep this example simple, we are just going return the first search result if the custom field is not found
            return searchResults.First();
        }

        private async Task<IEnumerable<CustomField>> GetCustomFieldsForConstituent(ConstituentSearchResult constituent, CancellationToken cancellationToken)
        {
            string requestUrl = string.Format("constituents/{0}/customfields", constituent.id);
            var request = new RestRequest(requestUrl, Method.GET);

            var response = await _client.ExecuteTaskAsync(request, cancellationToken);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                // Handle request errors here...
                Console.WriteLine($"ERROR: Get Constituent Custom Fields returned ({response.StatusCode})\r\n{response.Content}");
            }

            var collectionResponse = JObject.Parse(response.Content);
            var customFields = collectionResponse.Value<JArray>("value").ToObject<IEnumerable<CustomField>>();
            return customFields;
        }

        private async Task<string> AddConstituent(Constituent constituent, CancellationToken cancellationToken)
        {
            var request = new RestRequest("constituents/", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(constituent);

            var response = await _client.ExecuteTaskAsync(request, cancellationToken);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                // Handle request errors here...
                Console.WriteLine($"ERROR: Add Constituent returned ({response.StatusCode})\r\n{response.Content}");
            }

            var postResponse = JObject.Parse(response.Content);
            return postResponse.Value<string>("id");
        }

        /// <summary>
        /// This function will add a custom field to the given Constituent. 
        /// It assumes your tenant has been configured with a text Constituent Attribute named "Custom Data Source Id".
        /// </summary>
        private async Task<string> AddCustomDataSourceIdToConstituent(Constituent constituent, CancellationToken cancellationToken)
        {
            CustomField cf = new CustomField();
            cf.parent_id = constituent.id;
            cf.category = "Custom Data Source Id";
            cf.value = constituent.custom_data_source_id;
            cf.comment = "Used to sync with the Custom Data Source";
            cf.date = DateTime.Today;

            var request = new RestRequest("constituents/customfields", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(cf);

            var response = await _client.ExecuteTaskAsync(request, cancellationToken);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                // Handle request errors here...
                Console.WriteLine($"ERROR: Add Constituent Cutom Field returned ({response.StatusCode})\r\n{response.Content}");
            }

            var postResponse = JObject.Parse(response.Content);
            return postResponse.Value<string>("id");
        }
        
        private async Task UpdateConstituent(Constituent constituent, CancellationToken cancellationToken)
        {
            // Set up the Rest Request to https://api.sky.blackbaud.com/constituent/<constituent_id>
            string requestUrl = string.Format("constituents/{0}", constituent.id);
            var request = new RestRequest(requestUrl, Method.PATCH);
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(constituent);

            var response = await _client.ExecuteTaskAsync(request, cancellationToken);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                // Handle request errors here...
                Console.WriteLine($"ERROR: Edit Constituent returned ({response.StatusCode})\r\n{response.Content}");
            }
        }
    }

    public class Constituent
    {
        public string custom_data_source_id { get; set; }
        public string id { get; set; }
        public string email_address { get; set; }
        public string type { get; set; }
        public string last { get; set; }
        public string first { get; set; }
        public string middle { get; set; }
        public string preferred_name { get; set; }
        public string title { get; set; }
        public string gender { get; set; }
        // Flush out as many properties as you need, we are keeping it short for brevity of this example
    }
    
    public class ConstituentSearchResult
    {
        public string id { get; set; }
        public string name { get; set; }
        public string lookup_id { get; set; }
        public string address { get; set; }
        public string email_address { get; set; }
    }

    public class CustomField
    {
        public string id { get; set; }
        public string parent_id { get; set; }
        public string category { get; set; }
        public string type { get; set; }
        public DateTime date { get; set; }
        public string comment { get; set; }
        public string value { get; set; }
    }
}