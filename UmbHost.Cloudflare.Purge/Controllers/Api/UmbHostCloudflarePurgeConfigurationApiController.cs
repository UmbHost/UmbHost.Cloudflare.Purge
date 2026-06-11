using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    /// <summary>
    /// Reports whether the package is configured. Authorized for any backoffice user (no section
    /// requirement) and returns no secret values, so it can drive UI in both the Settings views and
    /// the content-section purge dashboard.
    /// </summary>
    [PluginController(Constants.PackageName)]
    [ApiController]
    [BackOfficeRoute($"{Constants.ApiName}/{Constants.ApiVersion}/configuration")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [MapToApi(Constants.ApiName)]
    [ApiVersion("1.0")]
    public class UmbHostCloudflarePurgeConfigurationApiController(IOptions<UmbHostCloudflarePurge> configuration)
        : ControllerBase
    {
        [HttpGet("status")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<ConfigurationStatus>(StatusCodes.Status200OK)]
        public IActionResult GetConfigurationStatus()
        {
            return new JsonResult(ConfigurationStatus.Create(configuration.Value));
        }
    }
}
