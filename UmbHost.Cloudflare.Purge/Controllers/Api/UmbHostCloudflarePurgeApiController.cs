using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    [PluginController(Consts.PackageName)]
    public class UmbHostCloudflarePurgeApiController(ICloudflareService cloudflareService, UmbracoHelper umbracoHelper, IOptions<UmbHostCloudflarePurge> configuration)
        : UmbracoAuthorizedApiController
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
        public async Task<IActionResult> Node([FromBody] TreePurge? nodeDetails)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            if (nodeDetails != null)
            {
                var nodeUrl = umbracoHelper.Content(nodeDetails.Id)?.Url(culture: nodeDetails.Culture, UrlMode.Absolute) ??
                              umbracoHelper.Media(nodeDetails.Id)?.Url(mode: UrlMode.Absolute);

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
    }
}
