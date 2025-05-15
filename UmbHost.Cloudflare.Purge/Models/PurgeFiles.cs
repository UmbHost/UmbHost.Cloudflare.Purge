namespace UmbHost.Cloudflare.Purge.Models
{
    public class PurgeFilesRequest
    {
        public required string[] Files { get; set; }
    }
}