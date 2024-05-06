namespace UmbHost.Cloudflare.Purge.Models;

public class PurgeResponse
{
    public object result { get; set; }
    public bool success { get; set; }
    public Error[] errors { get; set; }
    public object[] messages { get; set; }
}

public class Error
{
    public int code { get; set; }
    public string message { get; set; }
}