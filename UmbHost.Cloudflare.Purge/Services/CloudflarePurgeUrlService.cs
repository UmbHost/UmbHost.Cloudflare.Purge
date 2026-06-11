using UmbHost.Cloudflare.Purge.Interfaces;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services.Navigation;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.Services
{
    internal class CloudflarePurgeUrlService(
        IUmbracoContextFactory umbracoContextFactory,
        IDocumentNavigationQueryService navigationQueryService,
        IShortStringHelper shortStringHelper,
        UrlSegmentProviderCollection urlSegmentProviders) : ICloudflarePurgeUrlService
    {
        public bool HasUrlSegmentChanged(IContent entity)
        {
            using var contextReference = umbracoContextFactory.EnsureUmbracoContext();
            var oldPublished = contextReference.UmbracoContext.Content?.GetById(entity.Id);

            // No previously published version means there are no old URLs to invalidate.
            if (oldPublished is null)
            {
                return false;
            }

            var cultures = oldPublished.Cultures.Keys.ToArray();

            // Invariant content has no cultures - compare the single segment.
            if (cultures.Length == 0)
            {
                return SegmentChanged(oldPublished.UrlSegment, entity, null);
            }

            return cultures.Any(culture => SegmentChanged(oldPublished.Cultures[culture].UrlSegment, entity, culture));
        }

        public IReadOnlyCollection<string> GetPublishedSubtreeUrls(int contentId)
        {
            using var contextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = contextReference.UmbracoContext.Content;
            var root = contentCache?.GetById(contentId);
            if (root is null)
            {
                return [];
            }

            // The navigation service tracks the whole document tree (published or not); resolving each
            // key against the published cache naturally filters to the published, routable nodes.
            if (!navigationQueryService.TryGetDescendantsKeysOrSelfKeys(root.Key, out var keys))
            {
                keys = [root.Key];
            }

            var urls = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (var key in keys)
            {
                var node = contentCache!.GetById(key);
                if (node is null)
                {
                    continue;
                }

                var cultures = node.Cultures.Keys.ToArray();
                if (cultures.Length == 0)
                {
                    AddIfRoutable(urls, node.Url(mode: UrlMode.Absolute));
                }
                else
                {
                    foreach (var culture in cultures)
                    {
                        AddIfRoutable(urls, node.Url(mode: UrlMode.Absolute, culture: culture));
                    }
                }
            }

            return urls;
        }

        private bool SegmentChanged(string? oldSegment, IContent entity, string? culture)
        {
            // published: false reads the draft segment - i.e. the value that is about to be published.
            var newSegment = entity.GetUrlSegment(shortStringHelper, urlSegmentProviders, culture, published: false);
            return !string.Equals(oldSegment, newSegment, StringComparison.Ordinal);
        }

        private static void AddIfRoutable(HashSet<string> urls, string? url)
        {
            if (!string.IsNullOrWhiteSpace(url) && url != "#")
            {
                urls.Add(url);
            }
        }
    }
}
