namespace UmbHost.Cloudflare.Purge
{
    internal static class Consts
    {
        public const string PackageName = "UmbHostCloudflarePurge";

        public const string CloudflareApiUrl = "https://api.cloudflare.com/";
        public const string CloudflareApiVersion = "v4";

        internal static class Tree
        {
            public const string Alias = "umbhostPurgeCdn";
        }

        internal static class Localizations
        {
            public const string Area = "umbhostCloudflarePurge";
            public const string PurgeCdnAlias = "purgecdn";
            public const string PurgeCdnErrorMessage = "PurgeCdnErrorMessage";
        }

        internal static class HeaderKeys
        {
            public const string XAuthEmail = "X-Auth-Email";
            public const string XAuthKey = "X-Auth-Key";
            public const string Authorization = "Authorization";
        }
    }
}
