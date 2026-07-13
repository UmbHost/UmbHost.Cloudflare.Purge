using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace UmbHost.Cloudflare.Purge.Composers
{
    public class UmbHostCloudflarePurgeApiComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            // Umbraco 18 replaced the Swashbuckle-based OpenAPI setup with the native
            // Microsoft.AspNetCore.OpenApi pipeline. AddBackOfficeOpenApiDocument applies Umbraco's
            // defaults (MapToApi filtering, operation IDs via UmbracoOperationIdTransformer, schema
            // naming, tagging and UI registration); WithBackOfficeAuthentication adds the back office
            // security requirements that the old BackOfficeSecurityRequirementsOperationFilterBase did.
            builder.AddBackOfficeOpenApiDocument(
                Constants.ApiName,
                document => document
                    .WithTitle(Constants.ApiTitle)
                    .WithBackOfficeAuthentication()
                    .ConfigureOpenApiOptions(options => options.AddDocumentTransformer((doc, _, _) =>
                    {
                        doc.Info.Description = Constants.ApiDescription;
                        doc.Info.Version = Constants.ApiVersion;
                        return Task.CompletedTask;
                    })));
        }
    }
}