angular.module("umbraco.resources").factory("UmbHostCloudflarePurgeResources", function ($http) {
    return {
        purgeAll: function () {

            return $http.post("backoffice/UmbHostCloudflarePurge/UmbHostCloudflarePurgeApi/All")
                .then(function (response) {
                    return response;
                }
                );
        },

        Custom: function (urls) {

            return $http.post("backoffice/UmbHostCloudflarePurge/UmbHostCloudflarePurgeApi/Custom", urls)
                .then(function (response) {
                    return response;
                }
                );
        },

        Node: function (id, culture) {

            var node = {
                "id": id,
                "culture": culture
            }

            return $http.post("backoffice/UmbHostCloudflarePurge/UmbHostCloudflarePurgeApi/Node", node)
                .then(function (response) {
                    return response;
                }
                );
        },

        MediaFolder: function (id) {

            return $http.post("backoffice/UmbHostCloudflarePurge/UmbHostCloudflarePurgeApi/MediaFolder", id)
                .then(function (response) {
                    return response;
                }
                );
        },

        AllSettings: function () {

            return $http.get("backoffice/UmbHostCloudflarePurge/UmbHostCloudflarePurgeCdnApi/GetCacheSettings")
                .then(function (response) {
                    return response;
                }
                );
        },

        ToggleDevelopmentMode: function (developmentMode) {

            return $http.patch("backoffice/UmbHostCloudflarePurge/UmbHostCloudflarePurgeCdnApi/ToggleDevelopmentMode", developmentMode)
                .then(function (response) {
                    return response;
                }
                );
        },
    }
});