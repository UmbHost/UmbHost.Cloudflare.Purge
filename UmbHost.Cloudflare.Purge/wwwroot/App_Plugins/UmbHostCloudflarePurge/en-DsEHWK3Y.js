const e = {
  umbhostCloudflarePurge: {
    headline: "Cloudflare CDN Purge",
    introduction: `<p>Clear cached files to force Cloudflare to fetch a fresh version of those files from your web server. You can purge files selectively or all at once.</p>
			<p><strong>Note:</strong> Purging the cache may temporarily degrade performance for your website and increase load on your origin. <br />
			You will need to specify the full path to the file. Wildcards are not supported with single URL purge at this time. You can purge up to 30 URLs at a time.</p>
			
			<p>Separate URL(s) one per line.<br />
			<strong>Example:<br />
			https://www.domain.com <br/>
			https://www.domain.com/cat.jpg</strong></p>`,
    urls: "URLs",
    purgeeverything: "Purge Everything",
    custompurge: "Custom Purge",
    confirmpurgeeverythingtitle: "Confirm purge everything",
    confirmpurgeeverythingcontent: "Purge all cached files. Purging your cache may slow your website temporarily.",
    confirmcustompurgetitle: "Confirm custom purge",
    confirmcustompurgecontent: "Purge specified cached files. Purging your cache may slow your website temporarily.",
    purgesuccesstitle: "URLs purged",
    purgesuccesscontent: "Please allow 30 seconds to propagate globally",
    confirmpurgeeverythingconfirm: "Purge everything",
    confirmcustompurgeconfirm: "Purge custom URLs",
    entityactionlabel: "Purge from CDN",
    confirmpurgecdnentityactiontitle: "Confirm CDN purge",
    confirmpurgecdnentityactioncontent: `<p>Clear the cache to force Cloudflare to fetch a fresh version of <strong>[[PAGENAME]]</strong> from your web server.</p>
			<p><strong>Note:</strong> Purging the cache may temporarily degrade performance for your website and increase load on your origin.</p>`,
    cloudflare: "Cloudflare",
    settingsoverview: "Overview",
    settingscaching: "Caching",
    workspacetitle: "Cloudflare CDN Purge",
    settingsoverviewtitle: "Introduction",
    settingsoverviewintroduction: "You can manage the settings related to your Cloudflare DNS zone here.",
    settingsoverviewcachingtitle: "Caching",
    settingsoverviewcachingdescription: "Developer Mode, Caching Level, Browser Cache TTL, Always Online™",
    settingsoverviewcachingbutton: "Manage Caching",
    settingsoverviewsecuritytitle: "Security",
    settingsoverviewsecuritydescription: "Always Use HTTPS, Automatic HTTPS Rewrites, Opportunistic Encryption, Minimum TLS Version, HTTP Strict Transport Security (HSTS), Security Level, Challenge Passage, Browser Integrity Check, Email Obfuscation, Hotlink Protection",
    settingsoverviewsecuritybutton: "Manage Security",
    settingsoverviewoptimizationtitle: "Optimization",
    settingsoverviewoptimizationdescription: "Auto Minify, Brotli, Early Hints, Rocket Loader™",
    settingsoverviewoptimizationbutton: "Manage Optimization"
  }
};
export {
  e as default
};
//# sourceMappingURL=en-DsEHWK3Y.js.map
