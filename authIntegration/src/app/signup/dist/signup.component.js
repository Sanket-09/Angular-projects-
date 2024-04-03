"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.errors = { email: '', password: '' };
        this.signupForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
    }
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.signupForm.valid) {
            this.http
                .post('/signup', this.signupForm.value, {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe({
                next: function (data) {
                    console.log(data);
                    if (data.errors) {
                        _this.errors.email = data.errors.email;
                        _this.errors.password = data.errors.password;
                    }
                    else if (data.userPromise) {
                        window.location.assign('/');
                    }
                },
                error: function (e) { return console.error(e); }
            });
        }
    };
    SignupComponent.prototype.ngOnInit = function () { };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
