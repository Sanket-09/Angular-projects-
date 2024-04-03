"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditItemComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditItemComponent = /** @class */ (function () {
    function EditItemComponent(route, router, dataService, fb) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.fb = fb;
        this.homeToggle = false;
        this.editToggle = true;
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    }
    EditItemComponent.prototype.toHome = function () {
        this.homeToggle = !this.homeToggle;
        this.editToggle = !this.editToggle;
    };
    EditItemComponent.prototype.ngOnInit = function () {
        console.log('component initialised');
        this.id = +this.route.snapshot.params['index'];
        console.log('Index:', this.id);
        if (this.id !== undefined) {
            this.item = this.dataService.getGridItem(this.id) || {};
            // Initialize the form with validators as needed
            this.itemForm = this.fb.group({
                id: [this.item.id, [forms_1.Validators.required]],
                image: [this.item.image, [forms_1.Validators.required]],
                addedBy: [this.item.addedBy, [forms_1.Validators.required]],
                createdDate: [this.item.createdDate, [forms_1.Validators.required]],
                marketingRights: [this.item.marketingRights, [forms_1.Validators.required]]
            });
        }
        else {
            console.error('Index is undefined.');
        }
    };
    EditItemComponent.prototype.saveChanges = function () {
        if (this.id !== undefined) {
            var updatedItem = __assign({}, this.itemForm.value);
            this.dataService.updateGridItem(this.id, updatedItem);
            this.router.navigate(['/']);
        }
        else {
            console.error('Cannot save changes without a valid index.');
        }
    };
    EditItemComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-item',
            templateUrl: './edit-item.component.html',
            styleUrls: ['./edit-item.component.scss']
        })
    ], EditItemComponent);
    return EditItemComponent;
}());
exports.EditItemComponent = EditItemComponent;
