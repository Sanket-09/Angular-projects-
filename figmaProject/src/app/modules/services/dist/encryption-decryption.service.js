"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EncryptionDecryptionService = void 0;
var CryptoJS = require("crypto-js");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
/**
 * This is used to encrypt and decrypt request and response data
 */
var EncryptionDecryptionService = /** @class */ (function () {
    function EncryptionDecryptionService() {
    }
    /*
    Method to get encrypted data of passed decrypted data
    */
    EncryptionDecryptionService.prototype.getEncryptedData = function (data) {
        if (data === undefined || data === null) {
            return data;
        }
        var token = environment_1.environment.token;
        if (token) {
            if (!token.startsWith('Bearer ')) {
                token = 'Bearer ' + token;
            }
            var encryptionSecret = token.substring(30, 50) + token.substring(55, 75);
            return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionSecret).toString();
        }
        else {
            var eid = environment_1.environment.eid;
            if (!eid) {
                return data;
            }
            var encryptionSecret = eid.substr(0, 9) +
                eid.substr(13, 16) +
                eid.substr(33, 9) +
                eid.substr(46, 6) +
                eid.substr(52, 6) +
                eid.substr(62, 8) +
                eid.substr(74);
            return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionSecret).toString();
        }
    };
    /*
    Method to get decrypted data of passed encrypted data
    */
    EncryptionDecryptionService.prototype.getDecryptedData = function (encryptedData) {
        if (encryptedData === undefined || encryptedData === null) {
            return encryptedData;
        }
        var token = environment_1.environment.token;
        if (token) {
            if (!token.startsWith('Bearer ')) {
                token = 'Bearer ' + token;
            }
            var encryptionSecret = token.substring(30, 50) + token.substring(55, 75);
            var bytes = CryptoJS.AES.decrypt(encryptedData, encryptionSecret);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        else {
            var eid = environment_1.environment.eid;
            if (!eid) {
                return encryptedData;
            }
            var encryptionSecret = eid.substr(0, 9) +
                eid.substr(13, 16) +
                eid.substr(33, 9) +
                eid.substr(46, 6) +
                eid.substr(52, 6) +
                eid.substr(62, 8) +
                eid.substr(74);
            var bytes = CryptoJS.AES.decrypt(encryptedData, encryptionSecret);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
    };
    EncryptionDecryptionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EncryptionDecryptionService);
    return EncryptionDecryptionService;
}());
exports.EncryptionDecryptionService = EncryptionDecryptionService;
