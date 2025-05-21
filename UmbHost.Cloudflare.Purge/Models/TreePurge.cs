namespace UmbHost.Cloudflare.Purge.Models;

public class TreePurge
{
    public required Guid Unique { get; set; }
    public string? Culture { get; set; } = null;
}