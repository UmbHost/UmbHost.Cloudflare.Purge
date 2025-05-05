using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models;

public class CloudflareResponseObject
{
    [JsonPropertyName("result")]
    public JsonObject? Result { get; set; }

    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("errors")]
    public Error[]? Errors { get; set; }

    [JsonPropertyName("messages")]
    public object[]? Messages { get; set; }
}