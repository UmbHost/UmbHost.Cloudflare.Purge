using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;

namespace UmbHost.Cloudflare.Purge.Migrations
{
    internal class AddUmbHostCloudflarePurgeUserGroup : MigrationBase
    {
        private readonly IUserService _userService;
        private readonly IUserGroupService _userGroupService;
        private readonly IShortStringHelper _shortStringHelper;
        private readonly ILogger<AddUmbHostCloudflarePurgeUserGroup> _logger;

        public AddUmbHostCloudflarePurgeUserGroup(IMigrationContext context, IUserService userService, IShortStringHelper shortStringHelper, ILogger<AddUmbHostCloudflarePurgeUserGroup> logger, IUserGroupService userGroupService) : base(context)
        {
            _userService = userService;
            _shortStringHelper = shortStringHelper;
            _logger = logger;
            _userGroupService = userGroupService;
        }

        protected override void Migrate()
        {
            try
            {
                var userGroup = _userGroupService.GetAsync(Constants.UserGroups.CloudflareGroupAlias).Result;
                
                if (userGroup == null)
                {
                    var user = _userService.GetUserById(-1);

                    if (user != null)
                    {
                        var newUserGroup = new UserGroup(_shortStringHelper, 0, Constants.UserGroups.CloudflareGroupAlias, Constants.UserGroups.CloudflareGroupName, "icon-cloud")
                            {
                                Key = Constants.UserGroups.CloudflareGroupKey
                            };
                        _userGroupService.CreateAsync(newUserGroup, user.Key);
                    }
                    else
                    {
                        _logger.LogError(
                            "Could not find the user with Id -1, could not create user group {UserGroup}",
                            Constants.UserGroups.CloudflareGroupAlias);
                        throw new Exception($"Could not find the user with Id -1, could not create user group {Constants.UserGroups.CloudflareGroupAlias}");
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
