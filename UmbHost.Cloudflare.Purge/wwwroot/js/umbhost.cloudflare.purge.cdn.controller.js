function UmbHostCloudflarePurgeCdn(localizationService, UmbHostCloudflarePurgeResources) {
    var vm = this;
    localizationService.localize("umbhostCloudflarePurge_cdntitle").then(function (cdnTitle) {
        vm.cdnTitle = cdnTitle;
    });

    vm.loading = true;
    vm.developerMode = false;
    vm.developerModeDisabled = true;
    vm.developerModeLabel = "Off";
    vm.developerModeLastModified = "";

    vm.developerModeToggle = developerModeToggle;

    UmbHostCloudflarePurgeResources.AllSettings()
        .then(function (response) {

            var setting = response.data.developmentMode;

            vm.developerModeLabel === setting.value;

            if (setting.modified_on) {
                vm.developerModeLastModified = zuluToHumanReadable(setting.modified_on);
            }

            if (setting.value === "On") {
                vm.developerMode = true;
            }

            if (setting.editable) {
                vm.developerModeDisabled = !setting.editable;
            }

            vm.loading = false;
        })

    function developerModeToggle() {
        vm.loading = true;

        var developmentMode = {
            value: !vm.developerMode ? "on" : "off"
        }
        UmbHostCloudflarePurgeResources.ToggleDevelopmentMode(developmentMode)
            .then(function (response) {
                var setting = response.data;

                vm.developerModeLabel === setting.value;

                if (setting.modified_on) {
                    vm.developerModeLastModified = zuluToHumanReadable(setting.modified_on);
                }

                if (setting.value === "On") {
                    vm.developerMode = true;
                }

                if (setting.editable) {
                    vm.developerModeDisabled = !setting.editable;
                }

                vm.loading = false;
            })
    }

    function zuluToHumanReadable(zuluTime) {
        // Parse the Zulu time string into a Date object
        const date = new Date(zuluTime);

        // Convert the date to a human-readable string
        const humanReadableString = date.toLocaleString();

        return humanReadableString;
    }
};
angular.module("umbraco").controller("UmbHost.Cloudflare.Purge.Cdn.Controller", UmbHostCloudflarePurgeCdn);