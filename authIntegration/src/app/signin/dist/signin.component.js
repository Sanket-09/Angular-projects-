"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SigninComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.errors = { email: '', password: '' };
        this.loginForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required]]
        });
    }
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.loginForm.valid) {
            this.http
                .post('/login', this.loginForm.value, {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe({
                next: function (data) {
                    console.log(data);
                    if (data.errors) {
                        _this.errors.email = data.errors.email;
                        _this.errors.password = data.errors.password;
                    }
                    if (data.user) {
                        // Navigate to home or dashboard
                    }
                },
                error: function (error) { return console.error(error); }
            });
        }
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.scss']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
