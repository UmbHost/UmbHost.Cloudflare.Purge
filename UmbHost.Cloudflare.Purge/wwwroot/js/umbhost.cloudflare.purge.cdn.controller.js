﻿function UmbHostCloudflarePurgeCdn(localizationService, UmbHostCloudflarePurgeResources) {
    var vm = this;
    localizationService.localize("umbhostCloudflarePurge_cdntitle").then(function (cdnTitle) {
        vm.cdnTitle = cdnTitle;
    });

    vm.loading = true;
    vm.developerMode = false;
    vm.developerModeDisabled = true;
    vm.cachingLevelDisabled = true;
    vm.browserCacheTtlDisabled = true;
    vm.developerModeLabel = "Off";
    vm.developerModeLastModified = "";
    vm.cachingLevel = "";
    vm.browserCacheTtl = 0;
    vm.browserCacheTtls = [];

    vm.developerModeToggle = developerModeToggle;
    vm.cachingLevelToggle = cachingLevelToggle;
    vm.browserCacheTtlToggle = browserCacheTtlToggle;

    UmbHostCloudflarePurgeResources.AllSettings()
        .then(function (response) {

            var developmentModeSetting = response.data.developmentMode;
            var cachingLevelSetting = response.data.cacheLevel;
            var browserCacheTtlSetting = response.data.browserCacheTtl;

            vm.developerModeLabel = developmentModeSetting.value;
            vm.cachingLevel = cachingLevelSetting.value;
            vm.browserCacheTtl = browserCacheTtlSetting.value;

            if (developmentModeSetting.modified_on) {
                vm.developerModeLastModified = zuluToHumanReadable(developmentModeSetting.modified_on);
            }

            if (developmentModeSetting.value === "On") {
                vm.developerMode = true;
            }

            if (developmentModeSetting.editable) {
                vm.developerModeDisabled = !developmentModeSetting.editable;
            }

            if (cachingLevelSetting.modified_on) {
                vm.cachingLevelLastModified = zuluToHumanReadable(cachingLevelSetting.modified_on);
            }

            if (browserCacheTtlSetting.modified_on) {
                vm.browserCacheTtlLastModified = zuluToHumanReadable(browserCacheTtlSetting.modified_on);
            }

            if (cachingLevelSetting.editable) {
                vm.cachingLevelDisabled = !cachingLevelSetting.editable;
            }

            if (browserCacheTtlSetting.editable) {
                vm.browserCacheTtlDisabled = !browserCacheTtlSetting.editable;
            }

            switch (cachingLevelSetting.value) {
                case "Basic":
                    vm.cachingLevelBasic = true;
                    break;
                case "Simplified":
                    vm.cachingLevelSimplified = true;
                    break;
                case "Aggressive":
                    vm.cachingLevelAggressive = true;
                    break;
            }

            UmbHostCloudflarePurgeResources.BrowserTtlOptions()
                .then(function (response) {
                    vm.browserCacheTtls = response.data;
                })
        })
        .finally(function (response) {
            vm.loading = false;
        });

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

    function cachingLevelToggle(cachingLevel) {
        vm.loading = true;

        var cacheLevel = {
            value: cachingLevel
        }
        UmbHostCloudflarePurgeResources.ToggleCachingLevel(cacheLevel)
            .then(function (response) {
                var setting = response.data;

                vm.cachingLevel = setting.value;

                if (setting.modified_on) {
                    vm.cachingLevelLastModified = zuluToHumanReadable(setting.modified_on);
                }

                if (setting.editable) {
                    vm.cachingLevelDisabled = !setting.editable;
                }

                vm.loading = false;
            })
    }

    function browserCacheTtlToggle() {
        vm.loading = true;

        var browserCacheTtl = {
            value: vm.browserCacheTtl
        }
        UmbHostCloudflarePurgeResources.ToggleBrowserCacheTtl(browserCacheTtl)
            .then(function (response) {
                var setting = response.data;

                vm.browserCacheTtl = setting.value;

                if (setting.modified_on) {
                    vm.browserCacheTtlLastModified = zuluToHumanReadable(setting.modified_on);
                }

                if (setting.editable) {
                    vm.browserCacheTtlDisabled = !setting.editable;
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