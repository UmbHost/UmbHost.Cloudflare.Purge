using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;
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
                    .ConfigureOpenApiOptions(options =>
                    {
                        options.AddDocumentTransformer((doc, _, _) =>
                        {
                            doc.Info.Description = Constants.ApiDescription;
                            doc.Info.Version = Constants.ApiVersion;
                            return Task.CompletedTask;
                        });

                        // Registered after Umbraco's default UmbracoOperationIdTransformer so it wins:
                        // keeps operation IDs as the bare action name, giving the generated TypeScript
                        // client terse method names (V1Resource.all(), .custom(), ...) as before.
                        options.AddOperationTransformer<ActionNameOperationIdTransformer>();
                    }));
        }

        // Sets each operation's ID to the controller action name (e.g. "All", "Custom") for this
        // package's controllers. Replaces the Umbraco 17 CustomOperationHandler : OperationIdHandler,
        // which no longer exists in Umbraco 18.
        private sealed class ActionNameOperationIdTransformer : IOpenApiOperationTransformer
        {
            public Task TransformAsync(
                OpenApiOperation operation,
                OpenApiOperationTransformerContext context,
                CancellationToken cancellationToken)
            {
                if (context.Description.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor
                    && controllerActionDescriptor.ControllerTypeInfo.Namespace?.StartsWith(
                        "UmbHost.Cloudflare.Purge.Controllers",
                        StringComparison.InvariantCultureIgnoreCase) is true)
                {
                    var action = controllerActionDescriptor.ActionName;
                    if (string.IsNullOrWhiteSpace(action) == false)
                    {
                        operation.OperationId = action;
                    }
                }

                return Task.CompletedTask;
            }
        }
    }
}