using Microsoft.AspNetCore.Mvc;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    [PluginController(Consts.PackageName)]
    public class UmbHostCloudflarePurgeApiController(ICloudflareService cloudflareService)
        : UmbracoAuthorizedApiController
    {
        [HttpPost]
        public async Task<IActionResult> All()
        {
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
        public IActionResult Node([FromBody] int? id)
        {
            if (id != null)
            {
                return Accepted();
            }

            return BadRequest("NULL");
        }
    }
}
