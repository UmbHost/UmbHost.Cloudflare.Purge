using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge
{
    public class Constants
    {
        public const string ApiName = "umbhostcloudflarepurge";
        public const string ApiTitle = "UmbHost Cloudflare Purge API";
        public const string ApiDescription = "Backoffice API for UmbHost Cloudflare Purge.";
        public const string ApiVersion = "v1.0";

        public const string PackageName = "UmbHostCloudflarePurge";

        public const string CloudflareApiUrl = "https://api.cloudflare.com/";
        public const string CloudflareApiVersion = "v4";

        internal static class Localizations
        {
            public const string Area = "umbhostCloudflarePurge";
            public const string PurgeCdnErrorMessage = "PurgeCdnErrorMessage";
            public const string PurgedUrlAlias = "purgedurl";
        }

        internal static class HeaderKeys
        {
            public const string XAuthEmail = "X-Auth-Email";
            public const string XAuthKey = "X-Auth-Key";
            public const string Authorization = "Authorization";
        }

        internal static class UserGroups
        {
            public const string CloudflareGroupAlias = "umbHostCloudflarePurgeGroup";
            public const string CloudflareGroupName = "Cloudflare Purge";
            public static readonly Guid CloudflareGroupKey = new("74faa29d-d43d-44bf-b3df-e02e8b38e08f");
        }
    }
}
