namespace UmbHost.Cloudflare.Purge.Models
{
    /// <summary>
    /// Reports whether the package is configured, without ever exposing the
    /// secret credential values themselves. Consumed by the backoffice to show a
    /// "not configured" alert.
    /// </summary>
    public class ConfigurationStatus
    {
        /// <summary>All required settings are present (and so the package can talk to Cloudflare).</summary>
        public bool IsConfigured { get; set; }

        /// <summary>The package has been explicitly disabled via configuration.</summary>
        public bool IsDisabled { get; set; }

        /// <summary>An auth key/token has been supplied.</summary>
        public bool HasAuthKey { get; set; }

        /// <summary>At least one zone has been configured.</summary>
        public bool HasZones { get; set; }

        /// <summary>The selected auth type (Global) also requires an email address.</summary>
        public bool RequiresEmail { get; set; }

        /// <summary>An email address has been supplied.</summary>
        public bool HasEmail { get; set; }

        /// <summary>
        /// Builds a status from the bound configuration, without ever copying the secret values.
        /// </summary>
        public static ConfigurationStatus Create(UmbHostCloudflarePurge configuration)
        {
            var hasAuthKey = !string.IsNullOrWhiteSpace(configuration.AuthKey);
            var hasZones = configuration.Zones.Length > 0;
            var requiresEmail = configuration.AuthType == Enums.AuthTypeEnum.Global;
            var hasEmail = !string.IsNullOrWhiteSpace(configuration.EmailAddress);

            return new ConfigurationStatus
            {
                IsDisabled = configuration.Disabled,
                HasAuthKey = hasAuthKey,
                HasZones = hasZones,
                RequiresEmail = requiresEmail,
                HasEmail = hasEmail,
                IsConfigured = hasAuthKey && hasZones && (!requiresEmail || hasEmail)
            };
        }
    }
}
