using UmbHost.Cloudflare.Purge.Models;

namespace UmbHost.Cloudflare.Purge.Interfaces
{
    public interface ICloudflareService
    {
        Task<bool> PurgeAll();
        Task<bool> CustomPurge(PurgeFilesRequest purgeRequest);
    }
}
