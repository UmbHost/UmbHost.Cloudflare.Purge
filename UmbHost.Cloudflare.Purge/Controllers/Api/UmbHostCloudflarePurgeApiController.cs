using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    [PluginController(Constants.PackageName)]
    [ApiController]
    [BackOfficeRoute($"{Constants.ApiName}/{Constants.ApiVersion}/purge")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContent)]
    [MapToApi(Constants.ApiName)]
    [ApiVersion("1.0")]
    public class UmbHostCloudflarePurgeApiController(ICloudflareService cloudflareService, UmbracoHelper umbracoHelper, IOptions<UmbHostCloudflarePurge> configuration)
        : ControllerBase
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;

        [HttpPost("all")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> All()
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            var success = await cloudflareService.PurgeAll();

            if (success)
            {
                return Accepted();
            }

            return BadRequest();
        }

        [HttpPost("custom")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Custom([FromBody] string[]? urls)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            if (urls != null && urls.Any())
            {
                var success = await cloudflareService.CustomPurge(new PurgeFilesRequest { Files = urls });

                if (success)
                {
                    return Accepted();
                }

                return BadRequest();
            }

            return BadRequest("NULL");
        }

        [HttpPost("node")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Node([FromBody] TreePurge? nodeDetails)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            if (nodeDetails != null)
            {
                var nodeUrl = umbracoHelper.Content(nodeDetails.Unique)?.Url(culture: nodeDetails.Culture, UrlMode.Absolute) ??
                              umbracoHelper.Media(nodeDetails.Unique)?.Url(mode: UrlMode.Absolute);

                if (!string.IsNullOrEmpty(nodeUrl))
                {
                    var success = await cloudflareService.CustomPurge(new PurgeFilesRequest { Files = [nodeUrl] });

                    if (success)
                    {
                        return Accepted();
                    }
                }
            }

            return BadRequest("NULL");
        }

        [HttpPost("mediafolder")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> MediaFolder([FromBody] int? id)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            if (id.HasValue)
            {
                var node = umbracoHelper.Media(id);

                if (node is { ContentType.Alias: "Folder", Children: not null } && node.Children.Any())
                {
                    var urls = node.Children.Select(x => x.Url(mode: UrlMode.Absolute)).ToArray();

                    var success = await cloudflareService.CustomPurge(new PurgeFilesRequest { Files = urls });

                    if (success)
                    {
                        return Accepted();
                    }
                }
            }

            return BadRequest("NULL");
        }
    }
}
