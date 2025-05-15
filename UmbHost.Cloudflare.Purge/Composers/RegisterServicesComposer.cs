using Microsoft.Extensions.DependencyInjection;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace UmbHost.Cloudflare.Purge.Composers
{
    internal class RegisterServicesComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.Configure<UmbHostCloudflarePurge>(builder.Config.GetSection(Constants.PackageName));
            builder.Services.AddTransient<ICloudflareService, CloudflareService>();
        }
    }
}
