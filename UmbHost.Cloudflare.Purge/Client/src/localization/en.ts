import type { UmbLocalizationDictionary } from '@umbraco-cms/backoffice/localization-api';

export default {
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
		settingsoverviewintroduction: 'You can manage the settings related to your Cloudflare DNS zone here.',
		settingsoverviewcachingtitle: "Caching",
		settingsoverviewcachingdescription: "Developer Mode, Caching Level, Browser Cache TTL, Always Online™",
		settingsoverviewcachingbutton: "Manage Caching",
		settingsoverviewsecuritytitle: "Security",
		settingsoverviewsecuritydescription: "Always Use HTTPS, Automatic HTTPS Rewrites, Opportunistic Encryption, Minimum TLS Version, HTTP Strict Transport Security (HSTS), Security Level, Challenge Passage, Browser Integrity Check, Email Obfuscation, Hotlink Protection",
		settingsoverviewsecuritybutton: "Manage Security",
		settingsoverviewoptimizationtitle: "Optimization",
		settingsoverviewoptimizationdescription: "Auto Minify, Brotli, Early Hints, Rocket Loader™",
		settingsoverviewoptimizationbutton: "Manage Optimization",
		cachingtitle: "Introduction",
		cachingintroduction: "You can manage the settings related to your Cloudflare DNS zones Caching here.",
		developermodetitle: "Developer Mode",
		developermodedescription: "Temporarily bypass the Cloudflare cache allowing you to see changes to your origin server in realtime.",
		developermodetoggleon: "On",
		developermodetoggleoff: "Off",
		lastmodified: "Last Modified On",
		developermodewarning: "<strong>Note:</strong> Enabling this feature can significantly increase origin server load. Development mode does not purge the cache so files will need to be purged after development mode expires.",
		cachingleveltitle: "Caching Level",
		cachingleveldescription: "Determine how much of your website’s static content you want Cloudflare to cache. Increased caching can speed up page load time.",
		cachinglevelbasic: "No query string",
		cachinglevelsimplified: "Ignore query string",
		cachinglevelaggressive: "Standard",
		browsercachettltitle: "Browser Cache TTL",
		browsercachettldescription: "Determine the length of time Cloudflare instructs a visitor’s browser to cache files. During this period, the browser loads the files from its local cache, speeding up page loads.",
		alwaysonlinetitle: "Always Online™",
		alwaysonlinedescription: "Keep your website online for visitors when your origin server is unavailable.",
		alwaysonlineterms: `Cloudflare serves limited copies of web pages available from the <a class="underline" href="https://archive.org/web/" target="_blank">Internet Archive’s Wayback Machine</a>.<br />
		Enabling this Service will share some of your website’s information with the Internet Archive in order to make this feature functional. By enabling this Service, you agree to the <a class="underline" href="https://www.cloudflare.com/supplemental-terms/#AOBeta" target="_blank">Supplemental Terms</a> for Always Online.`,
		alwaysonlinetoggleon: "On",
		alwaysonlinetoggleoff: "Off",
		usermediapermissionslabel: "Purge Media Items from Cloudflare CDN",
		usermediapermissionsdescription: "Allow user to purge Cloudflare CDN cache for media items.",
		usercontentpermissionslabel: "Purge Content Items from Cloudflare CDN",
		usercontentpermissionsdescription: "Allow user to purge Cloudflare CDN cache for content items.",
		purgeitemsuccesstitle: (name: string) => `${name} purged successfully`,
		purgeitemsuccesscontent: "Please allow 30 seconds to propagate globally",
	}
} as UmbLocalizationDictionary;