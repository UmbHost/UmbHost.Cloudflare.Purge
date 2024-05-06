using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.Controllers.Api
{
    [PluginController(Consts.PackageName)]
    public class UmbHostCloudflarePurgeApiController : UmbracoAuthorizedApiController
    {
        [HttpPost]
        public IActionResult All()
        {
            return Accepted();
        }

        [HttpPost]
        public IActionResult Custom([FromBody] string[]? urls)
        {
            if (urls != null && urls.Any())
            {
                return Accepted();
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
