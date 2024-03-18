"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiServiceService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var CryptoJS = require("crypto-js");
var ApiServiceService = /** @class */ (function () {
    function ApiServiceService(http, encryptionDecryptionService) {
        this.http = http;
        this.encryptionDecryptionService = encryptionDecryptionService;
    }
    ApiServiceService.prototype.getHttpOptions = function () {
        var sHeaders = {
            headers: new http_1.HttpHeaders()
        };
        var headers = {};
        headers['Authorization'] = 'Bearer ' + this.getEncryptedToken();
        headers['eid'] = environment_1.environment.eid;
        headers['metaid'] = environment_1.environment.metaid;
        sHeaders = {
            headers: headers
        };
        return sHeaders;
    };
    ApiServiceService.prototype.getEncryptedToken = function () {
        var eid = environment_1.environment.eid;
        console.log(eid);
        var token = environment_1.environment.token;
        var encryptToken = CryptoJS.AES.encrypt(JSON.stringify(token), eid).toString();
        console.log(encryptToken);
        return encryptToken;
    };
    ApiServiceService.prototype.getURL = function (sEndPoint) {
        var apiOriginLink;
        switch (sEndPoint) {
            case 'user/login':
            case 'user/login-old':
            case 'user/login-otp':
            case 'user/forgot-password':
            case 'user/change-password':
            case 'user/user-log':
            case 'hospital/id':
            case 'user/hospital':
            case 'user/getuserbytoken':
            case 'user/get-new-token':
            case 'user/user-location-log':
            case 'home-service/id':
            case 'user/close-previous-session':
            case 'user/get-encrypted-token-by-secrete-key':
            case 'language/all':
            case 'user/get-token-by-secrete-key':
            case 'user/get-token-by-secrete-key':
                apiOriginLink = "" + environment_1.environment.apiOriginPmpLink + environment_1.environment.pmpURL + sEndPoint;
                break;
            case 'lab/service/count': //needed
            case 'lab/service/list': //needed
            case 'dietician/service/count': //needed
            case 'dietician/service/list': //needed
            case 'psychologist/service/count': //needed
            case 'psychologist/service/list': //needed
            case 'followup/service/specialty/all':
            case 'followup/service/sidbar/count':
            case 'followup/service/log':
            case 'followup/service/snooze':
            case 'followup/service/service_request':
            case 'physiotherapy/service/dashboard-count': //needed
            case 'physiotherapy/service/physiotherapy-list': //needed
            case 'physician-escalation/service/count': //needed
            case 'physician-escalation/service/list': //needed
            case 'physician-appointment/service/count': //done
            case 'physician-appointment/service/list': //done
            case 'discharge/patient':
            case 'discharge/presigned-url/':
            case 'followup/service/search':
            case 'nursing-care/service/list': //needed
            case 'nursing-care/service/count': //needed
            case 'nursing-home-visit/service/list': //needed
            case 'nursing-home-visit/service/count': //needed
            case 'followup/service/getsnooze':
            case 'followup/service/details':
                apiOriginLink = "" + environment_1.environment.apiOriginSrdLink + environment_1.environment.srdURL + sEndPoint;
                break;
            case 'followup/master-list':
            case 'speciality/all':
                apiOriginLink = "" + environment_1.environment.apiOriginHeaps360HcmsLink + environment_1.environment.heaps360HcmsURL + sEndPoint;
                break;
            default:
                apiOriginLink = "" + environment_1.environment.apiOriginCccLink + environment_1.environment.cccURL + sEndPoint;
                break;
        }
        return apiOriginLink;
    };
    ApiServiceService.prototype.postRequest = function (endPoint, sRequestModel, showSpinner, sHeaders, params) {
        var _this = this;
        if (showSpinner === void 0) { showSpinner = true; }
        if (sHeaders === void 0) { sHeaders = null; }
        if (params === void 0) { params = ''; }
        var apiURL = this.getURL(endPoint);
        if (!apiURL) {
            return rxjs_1.of({ status: false });
        }
        if (params) {
            var paramsArr = params.toString().split('/');
            paramsArr.forEach(function (par) {
                par = decodeURIComponent(par);
                var encryptedId = _this.encryptionDecryptionService.getEncryptedData(par);
                var encodedId = encodeURIComponent(encryptedId);
                apiURL = "" + apiURL + '/' + encodedId;
            });
        }
        var postData = sRequestModel;
        var bodyData = this.encryptionDecryptionService.getEncryptedData(sRequestModel);
        postData = { bodyData: bodyData };
        var requestOptions = this.getHttpOptions();
        return this.http.post(apiURL, postData, requestOptions).pipe(rxjs_1.map(function (result) {
            // debugger
            var resultData = {};
            resultData = _this.encryptionDecryptionService.getDecryptedData(result.responseObj
            // sHeaders
            );
            return resultData;
            // return result;
        }), rxjs_1.catchError(function (error) {
            return rxjs_1.throwError(error);
        }), rxjs_1.finalize(function () { }));
    };
    ApiServiceService.prototype.getRequest = function (endPoint, id, showSpinner, sHeaders, params) {
        var _this = this;
        if (id === void 0) { id = null; }
        if (showSpinner === void 0) { showSpinner = true; }
        if (sHeaders === void 0) { sHeaders = null; }
        if (params === void 0) { params = null; }
        var apiURL = this.getURL(endPoint);
        if (!apiURL) {
            return rxjs_1.of({ status: false });
        }
        if (id) {
            var idsArr = id.toString().split('/');
            idsArr.forEach(function (par) {
                par = decodeURIComponent(par);
                var encryptedId = _this.encryptionDecryptionService.getEncryptedData(par);
                var encodedId = encodeURIComponent(encryptedId);
                endPoint = "" + endPoint + '/' + encodedId;
            });
        }
        if (params) {
            var encryptedQueryParams = this.encryptionDecryptionService.getEncryptedData(params);
            var encodedQueryParams = encodeURIComponent(encryptedQueryParams);
            endPoint += '?queryParams=' + encodedQueryParams;
        }
        var httpOptions = this.getHttpOptions();
        return this.http.get(apiURL, httpOptions).pipe(rxjs_1.map(function (result) {
            var resultData = {};
            resultData = _this.encryptionDecryptionService.getDecryptedData(result.responseObj);
            return resultData;
        }), rxjs_1.catchError(function (error) {
            return rxjs_1.throwError(error);
        }), rxjs_1.finalize(function () { }));
    };
    ApiServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiServiceService);
    return ApiServiceService;
}());
exports.ApiServiceService = ApiServiceService;
