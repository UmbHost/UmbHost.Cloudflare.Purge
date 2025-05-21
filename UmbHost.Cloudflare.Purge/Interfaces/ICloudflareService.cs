using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Models.Settings;

namespace UmbHost.Cloudflare.Purge.Interfaces
{
    public interface ICloudflareService
    {
        Task<bool> PurgeAll();
        Task<bool> CustomPurge(PurgeFilesRequest purgeRequest);
        Task<AllSettings?> GetAllZoneSettings(string zoneId);
        Task<DevelopmentMode?> ToggleDevelopmentMode(NewDevelopmentMode developmentMode, string zoneId);
        Task<CacheLevel?> ToggleCacheLevel(NewCacheLevel cacheLevel, string zoneId);
        Task<BrowserCacheTtl?> ToggleBrowserCacheTtl(NewBrowserCacheTtl browserCacheTtl, string zoneId);
        Task<AlwaysOnline?> ToggleAlwaysOnline(NewAlwaysOnline alwaysOnline, string zoneId);
    }
}
