using Umbraco.Cms.Core.Models;

namespace UmbHost.Cloudflare.Purge.Interfaces
{
    /// <summary>
    /// Helpers for working out which URLs need purging when a content node's URL changes.
    /// All reads come from the <em>published</em> cache, so when called from a "before"
    /// (publishing/moving) handler they reflect the node's current (old) URLs.
    /// </summary>
    internal interface ICloudflarePurgeUrlService
    {
        /// <summary>
        /// Returns <c>true</c> if the URL segment that is about to be published (the draft segment)
        /// differs from the currently published segment, for any culture.
        /// </summary>
        bool HasUrlSegmentChanged(IContent entity);

        /// <summary>
        /// Returns the absolute URLs of the given published node and all of its published
        /// descendants, across every published culture.
        /// </summary>
        IReadOnlyCollection<string> GetPublishedSubtreeUrls(int contentId);
    }
}
