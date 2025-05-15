using System.ComponentModel;

namespace UmbHost.Cloudflare.Purge.Enums
{
    public enum BrowserCacheTtlEnum
    {
        [Description("Respect Existing Headers")]
        RespectExistingHeaders = 0,
        [Description("30 minutes")]
        ThirtyMinutes = 1800,
        [Description("1 hour")]
        OneHour = 3600,
        [Description("2 hours")]
        TwoHours = 7200,
        [Description("3 hours")]
        ThreeHours = 10800,
        [Description("4 hours")]
        FourHours = 14400,
        [Description("5 hours")]
        FiveHours = 18000,
        [Description("8 hours")]
        EightHours = 28800,
        [Description("12 hours")]
        TwelveHours = 43200,
        [Description("16 hours")]
        SixteenHours = 57600,
        [Description("20 hours")]
        TwentyHours = 72000,
        [Description("1 day")]
        OneDay = 86400,
        [Description("2 days")]
        TwoDays = 172800,
        [Description("3 days")]
        ThreeDays = 259200,
        [Description("4 days")]
        FourDays = 345600,
        [Description("5 days")]
        FiveDays = 432000,
        [Description("8 days")]
        EightDays = 691200,
        [Description("16 days")]
        SixteenDays = 1382400,
        [Description("24 days")]
        TwentyFourDays = 2073600,
        [Description("1 month")]
        OneMonth = 2678400,
        [Description("2 months")]
        TwoMonths = 5356800,
        [Description("6 months")]
        SixMonths = 16070400,
        [Description("1 year")]
        OneYear = 31536000,
    }
}
