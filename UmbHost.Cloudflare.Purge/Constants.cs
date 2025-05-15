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
            public const string PurgeCdnAlias = "purgecdn";
            public const string PurgeCdnErrorMessage = "PurgeCdnErrorMessage";
            public const string PurgedUrlAlias = "purgedurl";
            public const string CdnSettings = "cdnSettings";
        }

        internal static class HeaderKeys
        {
            public const string XAuthEmail = "X-Auth-Email";
            public const string XAuthKey = "X-Auth-Key";
            public const string Authorization = "Authorization";
        }
    }
}
