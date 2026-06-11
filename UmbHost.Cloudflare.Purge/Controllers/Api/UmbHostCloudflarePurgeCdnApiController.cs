using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.ComponentModel;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Models.Settings;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using static System.Enum;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    [PluginController(Constants.PackageName)]
    [ApiController]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [BackOfficeRoute($"{Constants.ApiName}/{Constants.ApiVersion}/cache-settings")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
    [MapToApi(Constants.ApiName)]
    [ApiVersion("1.0")]
    public class UmbHostCloudflarePurgeCdnApiController(ICloudflareService cloudflareService, IOptions<UmbHostCloudflarePurge> configuration)
        : ControllerBase
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;

        [HttpGet("getcachesettings")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<AllSettings>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCacheSettings(string zoneId)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            return new JsonResult(await cloudflareService.GetAllZoneSettings(zoneId));
        }

        [HttpPatch("toggledevelopmentmode")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<DevelopmentMode>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ToggleDevelopmentMode([FromBody] NewDevelopmentMode developmentMode, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            return new JsonResult(await cloudflareService.ToggleDevelopmentMode(developmentMode, zoneId));
        }

        [HttpPatch("togglecachinglevel")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<CacheLevel>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ToggleCachingLevel([FromBody] NewCacheLevel cacheLevel, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            return new JsonResult(await cloudflareService.ToggleCacheLevel(cacheLevel, zoneId));
        }

        [HttpPatch("togglebrowsercachettl")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<BrowserCacheTtl>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ToggleBrowserCacheTtl([FromBody] NewBrowserCacheTtl browserCacheTtl, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            return new JsonResult(await cloudflareService.ToggleBrowserCacheTtl(browserCacheTtl, zoneId));
        }

        [HttpPatch("togglealwaysonline")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<AlwaysOnline>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ToggleAlwaysOnline([FromBody] NewAlwaysOnline alwaysOnline, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }


            return new JsonResult(await cloudflareService.ToggleAlwaysOnline(alwaysOnline, zoneId));
        }

        [HttpGet("browserttloptions")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<List<EnumDescription>>(StatusCodes.Status200OK)]
        public IActionResult BrowserTtlOptions()
        {
            var enumDescriptions = new List<EnumDescription>();

            foreach (Enums.BrowserCacheTtlEnum enumValue in GetValues(typeof(Enums.BrowserCacheTtlEnum)))
            {
                var description = GetEnumDescription(enumValue);
                var enumDescription = new EnumDescription
                {
                    Value = (int)enumValue,
                    Name = description
                };
                enumDescriptions.Add(enumDescription);
            }

            
            return new JsonResult(enumDescriptions);
        }

        [HttpGet("getzones")]
        [MapToApiVersion("1.0")]
        [ProducesResponseType<List<UmbHostCloudflarePurgeZone>>(StatusCodes.Status200OK)]
        public IActionResult GetZones()
        {
            return new JsonResult(_configuration.Zones);
        }

        private static string GetEnumDescription(Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            if (field != null)
            {
                return Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) is not DescriptionAttribute attribute ? value.ToString() : attribute.Description;
            }

            return string.Empty;
        }
    }
}
