const express = require("express");
const app = express();
const axios = require("axios");
const crypto = require("crypto");

const port = 4211;
const accountId = crypto.randomBytes(15).toString("hex");
const displayName = "ForestServer";


app.listen(port, () => {
    console.log("ForestServerV2 listen port", port);
});

app.all("/", async (req, res) => {
    res.status(200);
    res.end();
})

//[POST 204] https://datarouter.ol.epicgames.com/datarouter/api/v1/public/data
app.post("/datarouter/api/v1/public/data", async (req, res) => {
    res.status(204);
    res.end();
})

//[POST 204] https://datarouter.ol.epicgames.com/datarouter/api/v1/public/data/clients
app.post("/datarouter/api/v1/public/data/clients", async (req, res) => {
    res.status(204);
    res.end();
})

//[POST 204] https://datarouter.ol.epicgames.com/telemetry/data/datarouter/api/v1/public/data
app.post("/telemetry/data/datarouter/api/v1/public/data", async (req, res) => {
    res.status(204);
    res.end();
})

//[GET 200] https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/public/assets/Windows/*/FortniteContentBuilds
app.get("/launcher/api/public/assets/Windows/*/FortniteContentBuilds", async (req, res) => {
	const token = await axios.get("https://api.shifts.tk/v1/fortnite/bearer");
	const response = await axios.get(`https://launcher-public-service-prod06.ol.epicgames.com${req.originalUrl}`, {
		headers: {"Authorization": `bearer ${token.data.access_token}`}
	});
	res.json(response.data);
})

//[GET 200] https://launcher-public-service-prod-m.ol.epicgames.com/launcher/api/public/distributionpoints
app.get("/launcher/api/public/distributionpoints/", async (req, res) => {
    res.json({
        "distributions": [
            "https://download.epicgames.com/",
            "https://download2.epicgames.com/",
            "https://download3.epicgames.com/",
            "https://download4.epicgames.com/",
            "https://epicgames-download1.akamaized.net/",
            "https://fastly-download.epicgames.com/"
        ]
    });
})

//[GET 200] https://datastorage-public-service-live.ol.epicgames.com/api/v1/access/fortnite/*
app.get("/api/v1/access/fortnite/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/cloudstorage/system
app.get("/fortnite/api/cloudstorage/system", async (req, res) => {
    res.json([]);
})

//[GET 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/cloudstorage/system/config
app.get("/fortnite/api/cloudstorage/system/config", async (req, res) => {
    res.json({});
})

//[GET 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/cloudstorage/user/*
app.get("/fortnite/api/cloudstorage/user/*", async (req, res) => {
    res.json([]);
})

//[GET 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/cloudstorage/user/*/*
//[PUT 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/cloudstorage/user/*/*
app.all("/fortnite/api/cloudstorage/user/*/*", (req, res) => {
    res.status(200);
    res.end();
})

//[POST 200] https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token
app.post("/account/api/oauth/token", async (req, res) => {
    res.json({
        "access_token": crypto.randomBytes(15).toString("hex"),
        "expires_in": 28800,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "token_type": "bearer",
        "refresh_token": crypto.randomBytes(15).toString("hex"),
        "refresh_expires": 86400,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": accountId,
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": displayName,
        "app": "fortnite",
        "in_app_id": accountId,
        "device_id": crypto.randomBytes(15).toString("hex")
    });
})

//[GET 200] https://account-public-service-prod.ol.epicgames.com/account/api/oauth/verify
app.get("/account/api/oauth/verify", async (req, res) => {
    res.json({
        "access_token": crypto.randomBytes(15).toString("hex"),
        "expires_in": 28800,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "token_type": "bearer",
        "refresh_token": crypto.randomBytes(15).toString("hex"),
        "refresh_expires": 115200,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": accountId,
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": displayName,
        "app": "fortnite",
        "in_app_id": accountId,
        "device_id": crypto.randomBytes(15).toString("hex")
    });
})

//[DELETE 204] https://account-public-service-prod.ol.epicgames.com/account/api/oauth/sessions/kill
app.delete("/account/api/oauth/sessions/kill", async (req, res) => {
    res.status(204);
    res.end();
})

//[DELETE 204] https://account-public-service-prod.ol.epicgames.com/account/api/oauth/sessions/kill/*
app.delete("/account/api/oauth/sessions/kill/*", async (req, res) => {
    res.status(204);
    res.end();
})

//[GET 200] https://account-public-service-prod.ol.epicgames.com/account/api/public/account
app.get("/account/api/public/account", async (req, res) => {
    res.json([{
        "id": accountId,
        "displayName": displayName,
        "minorVerified": false,
        "minorStatus": "NOT_MINOR",
        "cabinedMode": false,
        "externalAuths": {}
    }]);
})

//[GET 200] https://account-public-service-prod.ol.epicgames.com/account/api/public/account/*
app.get("/account/api/public/account/*", async (req, res) => {
    res.json({
        "id": accountId,
        "displayName": displayName,
        "externalAuths": {}
    });
})

//[GET 200] https://account-public-service-prod.ol.epicgames.com/account/api/public/account/*/externalAuths
app.get("/account/api/public/account/*/externalAuths", async (req, res) => {
    res.json([]);
})

//[GET 200] https://api.epicgames.dev/sdk/v1/*
app.get(["/sdk/v1/default","/sdk/v1/product/prod-fn"], async (req, res) => {
	const response = await axios.get("https://api.shifts.tk/v1/fortnite/epic/default");
    res.json(response.data);
    res.status(200);
})

//[POST 200] https://api.epicgames.dev/auth/v1/oauth/token
app.post("/auth/v1/oauth/token", async (req, res) => {
    res.json({
        "access_token": crypto.randomBytes(15).toString("hex"),
        "token_type": "bearer",
        "expires_at": "9999-12-31T23:59:59.999Z",
        "features": [],
        "organization_id": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
        "product_id": "prod-fn",
        "sandbox_id": "fn",
        "deployment_id": "62a9473a2dca46b29ccf17577fcf42d7",
        "expires_in": 115200
    });
})

//[POST 200] https://api.epicgames.dev/epic/oauth/v2/token
app.post("/epic/oauth/v2/token", (req, res) => {
    res.json({
        "scope": "basic_profile friends_list openid presence",
        "token_type": "bearer",
        "access_token": crypto.randomBytes(15).toString("hex"),
        "refresh_token": crypto.randomBytes(15).toString("hex"),
        "id_token": crypto.randomBytes(15).toString("hex"),
        "expires_in": 115200,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "refresh_expires_in": 115200,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": crypto.randomBytes(15).toString("hex"),
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
        "selected_account_id": crypto.randomBytes(15).toString("hex"),
        "merged_accounts": []
     })
})

//[POST 200] https://api.epicgames.dev/epic/oauth/v2/revoke
app.post("/epic/oauth/v2/revoke", async (req, res) => {
    res.status(200);
    res.end();
})

//[POST 200] https://api.epicgames.dev/epic/id/v2/sdk/accounts
app.get("/epic/id/v2/sdk/accounts", async (req, res) => {
    res.json([{
        "accountId": accountId,
        "displayName": displayName,
        "preferredLanguage": "en",
        "linkedAccounts": [],
        "cabinedMode": false,
        "empty": false
    }]);
})

//[POST 200] https://api.epicgames.dev/epic/friends/v1/*/blocklist
app.get("/epic/friends/v1/*/blocklist", (req, res) => {
    res.json({
        "blockedUsers": []
    });
})

//[GET 200] https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/*/summary
app.get("/friends/api/v1/*/summary", async (req, res) => {
    res.json({});
})

//[PATCH 200] https://api.epicgames.dev/epic/presence/v1/*/*/presence/*
app.patch("/epic/presence/v1/*/*/presence/*", async (req, res) => {
    res.status(200);
    res.end();
})

//[GET 204]https://fortnitewaitingroom-public-service-prod.ol.epicgames.com/waitingroom/api/waitingroom
app.get("/waitingroom/api/waitingroom", async (req, res) => {
    res.status(204);
    res.end();
})

//[GET 204] https://eulatracking-public-service-prod.ol.epicgames.com/eulatracking/api/public/agreements/fn/account/*
app.get("/eulatracking/api/public/agreements/fn/account/*", async (req, res) => {
    res.status(204);
    res.end();
})

//[GET 200] https://lightswitch-public-service-prod.ol.epicgames.com/lightswitch/api/service/bulk/status
app.get("/lightswitch/api/service/bulk/status", async (req, res) => {
    res.json([{
        "serviceInstanceId": "fortnite",
        "status": "UP",
        "message": "Fortnite is online",
        "maintenanceUri": null,
        "overrideCatalogIds": [
            "a7f138b2e51945ffbfdacc1af0541053"
        ],
        "allowedActions": [],
        "banned": false,
        "launcherInfoDTO": {
            "appName": "Fortnite",
            "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
            "namespace": "fn"
        }
    }]);
})

//[GET 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/enabled_features
app.get("/fortnite/api/game/v2/enabled_features", async (req, res) => {
    res.json([]);
})

//[GET 200] https://api.kws.ol.epicgames.com/v1/epic-settings/public/users/*/values
//[PATCH 200] https://api.kws.ol.epicgames.com/v1/epic-settings/public/users/*/values
app.all("/v1/epic-settings/public/users/*/values", async (req, res) => {
    res.json({
        "response": {
            "settings": [{
                "namespace": "profile",
                "settingName": "allow-non-squad-users-to-see-my-username",
                "effectiveValue": true,
                "effectiveSource": "preference",
                "parentLimit": true
            },{
                "namespace": "profile",
                "settingName": "can-see-player-usernames-from-other-squads",
                "effectiveValue": true,
                "effectiveSource": "preference",
                "parentLimit": true
            },{
                "namespace": "chat",
                "settingName": "filter-out-mature-language",
                "effectiveValue": false,
                "effectiveSource": "preference",
                "parentLimit": false
            },{
                "namespace": "chat",
                "settingName": "text",
                "effectiveValue": "everybody",
                "effectiveSource": "preference",
                "parentLimit": "everybody"
            },{
                "namespace": "chat",
                "settingName": "voice",
                "effectiveValue": "everybody",
                "effectiveSource": "preference",
                "parentLimit": "everybody"
            }]
        },
        "meta": {
            "requestId": "",
            "timestamp": new Date()
        }
    });
})

//[POST 200] https://publickey-service-prod.ecbc.live.use1a.on.epicgames.com/publickey/v1/publickey/
app.post("/publickey/v1/publickey/", async (req, res) => {
    res.status(200);
    res.end();
})

//[PUT 200] https://global-profile-service.game-social.epicgames.com/profile/play_region
app.put("/profile/play_region", async (req, res) => {
    res.status(200);
    res.end();
})

//[POST 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/*/client/*
app.post("/fortnite/api/game/v2/profile/*/client/*", async (req, res) => {
    const profileId = req.query.profileId;
    if (profileId === "athena") {
        res.json(require("./profiles/profile_athena.json"));
        return;
    }
    else if (profileId === "collections") {
        res.json(require("./profiles/profile_collections.json"));
        return;
    }
    else if (profileId === "common_core") {
        res.json(require("./profiles/profile_common_core.json"));
        return;
    }
    else if (profileId === "common_public") {
        res.json(require("./profiles/profile_common_public.json"));
        return;
    }
    else if (profileId === "creative") {
        res.json(require("./profiles/profile_creative.json"));
        return;
    }
    else {
        res.json(require("./profiles/profile_error.json"));
        res.status(404);
        return;
    }
})

//[GET 200]  https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/storefront/v2/keychain
app.get("/fortnite/api/storefront/v2/keychain", async (req, res) => {
    const response = await axios.get("https://api.shifts.tk/v1/fortnite/keychain");
    res.json(response.data);
})

//[GET 200]  https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/storefront/v2/keychain
app.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
    res.json([]);
})

//[GET 200]  https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/calendar/v1/timeline
app.get("/fortnite/api/calendar/v1/timeline", async (req, res) => {
    res.json({});
})

//[GET 200]  https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/*
app.get("/content/api/pages/*", async (req, res) => {
    const response = await axios.get("https://api.shifts.tk/v1/fortnite/backgrounds");
    res.json({
        "_title": "Fortnite Game",
        "_activeDate": "2017-08-30T03:20:48.050Z",
        "lastModified": new Date(),
        "_locale": "en-US",
        "_templateName": "blank",
        "dynamicbackgrounds": response.data
    });
})

//[POST 200]  https://prm-dialogue-public-api-prod.edea.live.use1a.on.epicgames.com/api/v1/fortnite-br/surfaces/motd/target
app.post("/api/v1/fortnite-br/surfaces/motd/target", async (req, res) => {
    res.status(200);
    res.end();
})

//[PUT 200]  https://global-profile-service.game-social.epicgames.com/profile/languages
app.put("/profile/languages", async (req, res) => {
    res.status(200);
    res.end();
})

//[GET 200] https://interactions-service-prod.ol.epicgames.com/api/v2/interactions/latest/Fortnite/*
app.get("/api/v2/interactions/latest/Fortnite/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://social-ban-public-service-prod.ol.epicgames.com/socialban/api/public/v1/*
app.get("/socialban/api/public/v1/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://presence-public-service-prod.ol.epicgames.com/presence/api/v1/_/*/last-online
app.get("/presence/api/v1/_/*/last-online", async (req, res) => {
    res.json({});
})

//[GET 200] https://party-service-prod.ol.epicgames.com/party/api/v1/Fortnite/user/*
app.get("/party/api/v1/Fortnite/user/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://interactions-service-prod.ol.epicgames.com/api/v2/interactions/aggregated/Fortnite/*
app.get("/api/v2/interactions/aggregated/Fortnite/*", async (req, res) => {
    res.json({});
})

//[PUT 200] https://global-profile-service.game-social.epicgames.com/profile/privacy_settings
app.put("/profile/privacy_settings", async (req, res) => {
    res.status(200);
    res.end();
})

//[GET 200] https://lfg-service-prod.social.live.on.epicgames.com/api/v1/lfg/Fortnite/users/*/settings
app.get("/api/v1/lfg/Fortnite/users/*/settings", async (req, res) => {
    res.json({});
})

//[GET 200] https://statsproxy-public-service-live.ol.epicgames.com/statsproxy/api/statsv2/account/*
app.get("/statsproxy/api/statsv2/account/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://tag-management-public-service-prod.identity.live.on.epicgames.com/api/v1/public/accounts
app.get("/api/v1/public/accounts", async (req, res) => {
    res.json({});
})

//[POST 200] https://data-asset-directory-public-service-prod.ol.epicgames.com/api/v1/assets/Fortnite/*/*
app.post("/api/v1/assets/Fortnite/*/*", async (req, res) => {
    res.status(200);
    res.end();
})

//[GET 204] https://content-service.bfda.live.use1a.on.epicgames.com/api/content/v2/launch-data
app.get("/api/content/v2/launch-data", async (req, res) => {
    res.json({});
    res.status(204);
})

//[GET 200] https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/br-inventory/account/*
app.get("/fortnite/api/game/v2/br-inventory/account/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://global-postparty.game-social.epicgames.com/app_installation/status
app.get("/app_installation/status", async (req, res) => {
    res.json({});
})

//[GET 200] https://events-public-service-live.ol.epicgames.com/api/v1/events/Fortnite/download/*
app.get("/api/v1/events/Fortnite/download/*", async (req, res) => {
    res.json({});
})

//[GET 200] https://ip-data-service-prod.ak.epicgames.com/region
app.get("/region", async (req, res) => {
    res.json({
        "continent": {
            "code": "EU",
            "geoname_id": 6255148,
            "names": {
                "de": "Europa",
                "en": "Europe",
                "es": "Europa",
                "fr": "Europe",
                "ja": "ヨーロッパ",
                "pt-BR": "Europa",
                "ru": "Европа",
                "zh-CN": "欧洲"
            }
        },
        "country": {
            "geoname_id": 2635167,
            "is_in_european_union": false,
            "iso_code": "GB",
            "names": {
                "de": "UK",
                "en": "United Kingdom",
                "es": "RU",
                "fr": "Royaume Uni",
                "ja": "英国",
                "pt-BR": "Reino Unido",
                "ru": "Британия",
                "zh-CN": "英国"
            }
        },
        "subdivisions": [{
            "geoname_id": 6269131,
            "iso_code": "ENG",
            "names": {
                "de": "England",
                "en": "England",
                "es": "Inglaterra",
                "fr": "Angleterre",
                "ja": "イングランド",
                "pt-BR": "Inglaterra",
                "ru": "Англия",
                "zh-CN": "英格兰"
            }
        },{
            "geoname_id": 3333157,
            "iso_code": "KEC",
            "names": {
                "en": "Royal Kensington and Chelsea"
            }
        }]
    });
})

app.use(async (req, res) => {
    console.log(`[${req.method} 404] ${req.originalUrl}`);
    res.json({
        "errorCode": "errors.com.forestserver.common.not_found",
        "errorMessage": "Sorry the resource you were trying to find could not be found",
        "numericErrorCode": 1004,
        "originatingService": "com.forestserver.public",
        "intent": "prod"
    });
    res.status(404);
})