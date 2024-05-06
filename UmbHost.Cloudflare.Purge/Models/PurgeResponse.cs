using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models;

public class PurgeResponse
{
    [JsonPropertyName("result")]
    public object? Result { get; set; }

    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("errors")]
    public Error[]? Errors { get; set; }

    [JsonPropertyName("messages")]
    public object[]? Messages { get; set; }
}

public class Error
{
    [JsonPropertyName("code")]
    public int Code { get; set; }

    [JsonPropertyName("message")]
    public string? Message { get; set; }
}