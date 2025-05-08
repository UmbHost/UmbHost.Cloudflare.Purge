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
  }
} as UmbLocalizationDictionary;