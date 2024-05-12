using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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

        [HttpPatch]
        public async Task<IActionResult> ToggleCachingLevel([FromBody] NewCacheLevel cacheLevel)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            var text = await cloudflareService.ToggleCacheLevel(cacheLevel);

            if (text == null)
            {
                return new BadRequestResult();
            }
            return new JsonResult(text);
        }

        [HttpPatch]
        public async Task<IActionResult> ToggleBrowserCacheTtl([FromBody] NewBrowserCacheTtl browserCacheTtl)
        {
            if (_configuration.Disabled)
            {
                return BadRequest("D1");
            }

            var text = await cloudflareService.ToggleBrowserCacheTtl(browserCacheTtl);

            if (text == null)
            {
                return new BadRequestResult();
            }
            return new JsonResult(text);
        }

        [HttpGet]
        public IActionResult BrowserTtlOptions()
        {
            var enumDescriptions = new List<EnumDescription>();

            foreach (Enums.BrowserCacheTtl enumValue in Enum.GetValues(typeof(Enums.BrowserCacheTtl)))
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

        private static string GetEnumDescription(Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = (DescriptionAttribute)Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute));
            return attribute == null ? value.ToString() : attribute.Description;
        }
    }
}
