"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AddItemComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddItemComponent = /** @class */ (function () {
    function AddItemComponent(fb, dataService) {
        this.fb = fb;
        this.dataService = dataService;
        this.todayDate = new Date();
        this.showMain = false;
    }
    AddItemComponent.prototype.toggleShowMain = function () {
        this.showMain = !this.showMain;
    };
    AddItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.gridItems$.subscribe(function (items) {
            _this.gridItems = items ? __spreadArrays(items) : [];
            console.log(_this.gridItems);
        });
        this.newItemForm = this.fb.group({
            id: [''],
            image: ['', [forms_1.Validators.required]],
            addedBy: ['', [forms_1.Validators.required]],
            createdDate: ['', [forms_1.Validators.required]],
            marketingRights: ['', [forms_1.Validators.required]]
        });
    };
    AddItemComponent.prototype.onSubmit = function () {
        if (this.newItemForm.valid) {
            this.newItemForm.value['id'] = this.gridItems.length;
            var newItem = this.newItemForm.value;
            this.dataService.addGridItem(newItem);
            alert('Item Added Successfully');
            this.newItemForm.reset();
        }
        else {
            alert('Please fill all the fields');
        }
    };
    AddItemComponent = __decorate([
        core_1.Component({
            selector: 'app-add-item',
            templateUrl: './add-item.component.html',
            styleUrls: ['./add-item.component.scss']
        })
    ], AddItemComponent);
    return AddItemComponent;
}());
exports.AddItemComponent = AddItemComponent;
