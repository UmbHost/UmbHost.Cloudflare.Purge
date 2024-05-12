using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Models.Settings;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    [PluginController(Consts.PackageName)]
    public class UmbHostCloudflarePurgeCdnApiController(ICloudflareService cloudflareService, IOptions<UmbHostCloudflarePurge> configuration)
        : UmbracoAuthorizedApiController
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;

        [HttpGet]
        public async Task<IActionResult> GetCacheSettings()
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            var text = await cloudflareService.GetAllZoneSettings();
            return new JsonResult(text);
        }

        [HttpPatch]
        public async Task<IActionResult> ToggleDevelopmentMode([FromBody] NewDevelopmentMode developmentMode)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            var text = await cloudflareService.ToggleDevelopmentMode(developmentMode);

            if (text == null)
            {
                return new BadRequestResult();
            }
            return new JsonResult(text);
        }
    }
}
