"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.title = 'postgresCrudFrontend';
        this.refreshGridItems(); // Initial fetch of grid items
    }
    AppComponent.prototype.buttonClicked = function () {
        var _this = this;
        if (this.imageURL != null &&
            this.addedBy != null &&
            this.createdDate != null &&
            this.markettingRights != null) {
            this.dataService
                .addUser({
                imageURL: this.imageURL,
                addedBy: this.addedBy,
                createdDate: this.createdDate,
                markettingRights: this.markettingRights
            })
                .subscribe({
                next: function (response) {
                    console.log('User added:', response);
                    _this.refreshGridItems(); // Refresh grid items after adding a user
                },
                error: function (error) { return console.error('Error adding user:', error); }
            });
        }
    };
    // Method to fetch and log grid items
    AppComponent.prototype.refreshGridItems = function () {
        var _this = this;
        this.dataService.getGridItems().subscribe({
            next: function (items) {
                console.log(items);
                _this.data = items;
            },
            error: function (error) { return console.error('Error fetching grid items:', error); }
        });
    };
    AppComponent.prototype.deleteId = function () {
        var _this = this;
        if (this.idToDelete != null) {
            this.dataService.deleteUser(this.idToDelete).subscribe({
                next: function (response) {
                    console.log(response);
                    _this.refreshGridItems();
                },
                error: function (error) { return console.error('Error deleting user:', error); }
            });
        }
    };
    AppComponent.prototype.editId = function () {
        var _this = this;
        if (this.idToEdit != null) {
            this.dataService
                .editUser(this.idToEdit, {
                name: this.nameToEdit,
                email: this.emailToEdit
            })
                .subscribe({
                next: function (response) {
                    console.log(response);
                    _this.refreshGridItems();
                },
                error: function (error) { return console.error('Error editing user:', error); }
            });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
