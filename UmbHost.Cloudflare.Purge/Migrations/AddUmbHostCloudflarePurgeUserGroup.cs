using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;

namespace UmbHost.Cloudflare.Purge.Migrations
{
    internal class AddUmbHostCloudflarePurgeUserGroup : AsyncMigrationBase
    {
        private readonly IUserGroupService _userGroupService;
        private readonly IShortStringHelper _shortStringHelper;
        private readonly ILogger<AddUmbHostCloudflarePurgeUserGroup> _logger;

        public AddUmbHostCloudflarePurgeUserGroup(IMigrationContext context, IShortStringHelper shortStringHelper, ILogger<AddUmbHostCloudflarePurgeUserGroup> logger, IUserGroupService userGroupService) : base(context)
        {
            _shortStringHelper = shortStringHelper;
            _logger = logger;
            _userGroupService = userGroupService;
        }

        protected override async Task MigrateAsync()
        {
            try
            {
                var userGroup = await _userGroupService.GetAsync(Constants.UserGroups.CloudflareGroupAlias);

                if (userGroup == null)
                {
                    var newUserGroup = new UserGroup(_shortStringHelper, 0, Constants.UserGroups.CloudflareGroupAlias, Constants.UserGroups.CloudflareGroupName, "icon-cloud")
                    {
                        Key = Constants.UserGroups.CloudflareGroupKey
                    };

                    var result = await _userGroupService.CreateAsync(newUserGroup, Umbraco.Cms.Core.Constants.Security.SuperUserKey);

                    if (!result.Success)
                    {
                        _logger.LogError(
                            "Could not create user group {UserGroup}: {Status}",
                            Constants.UserGroups.CloudflareGroupAlias,
                            result.Status);
                        throw new Exception($"Could not create user group {Constants.UserGroups.CloudflareGroupAlias}: {result.Status}");
                    }
                }
                else
                {
                    Logger.LogDebug("The user group {UserGroup} already exists, skipping", Constants.UserGroups.CloudflareGroupAlias);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }
    }
}
