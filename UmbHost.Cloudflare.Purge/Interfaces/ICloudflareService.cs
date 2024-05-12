using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Models.Settings;

namespace UmbHost.Cloudflare.Purge.Interfaces
{
    public interface ICloudflareService
    {
        Task<bool> PurgeAll();
        Task<bool> CustomPurge(PurgeFilesRequest purgeRequest);
        Task<AllSettings?> GetAllZoneSettings();
        Task<DevelopmentMode?> ToggleDevelopmentMode(NewDevelopmentMode developmentMode);
        Task<CacheLevel?> ToggleCacheLevel(NewCacheLevel cacheLevel);
    }
}
