"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lodash_1 = require("lodash");
var prop_types_1 = require("prop-types");
var Field_1 = require("./Field");
var ValidationDecorator_1 = require("./ValidationDecorator");
var react_utils_1 = require("@tacitknowledge/react-utils");
function formSubmit(options) {
    // will be in request library
    console.log(options);
}
/**
 * Form component with *Validation*.
 */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            errors: [],
        };
        _this.formState = {};
        _this.validateOn = '';
        _this.validateOn = props.validateOn;
        _this.populateFormState(lodash_1.filter(props.children, function (child) { return child.type === Field_1.Field; }));
        _this.onSubmitHandler = _this.onSubmitHandler.bind(_this);
        return _this;
    }
    Form.prototype.shouldComponentUpdate = function (nextProps, nextStates) {
        return this.state.errors !== nextStates.errors;
    };
    Form.prototype.onFieldChangedHandler = function (event, fieldName) {
        var _this = this;
        this.formState[fieldName] = event.target.value;
        this.proofValidation('change', function () {
            _this.validateField(fieldName, event.target.value);
        });
    };
    Form.prototype.onSubmitHandler = function (event) {
        var _this = this;
        var ajax = this.props.ajax;
        event.preventDefault();
        this.proofValidation('submit', function () {
            _this.validateForm(function (errors) {
                if (errors.length)
                    return false;
                formSubmit({
                    ajax: Boolean(ajax),
                    formData: _this.formState
                });
            });
        });
    };
    Form.prototype.onFieldClickedHandler = function (event, fieldName) {
        var _this = this;
        this.proofValidation('click', function () {
            _this.validateField(fieldName, event.target.value);
        });
    };
    Form.prototype.onFieldBlurHandler = function (event, fieldName) {
        var _this = this;
        this.proofValidation('blur', function () {
            _this.validateField(fieldName, event.target.value);
        });
    };
    Form.prototype.render = function () {
        var _a = this.props, action = _a.action, method = _a.method, submitLabel = _a.submitLabel;
        return (React.createElement("form", { action: action, method: method, onSubmit: this.onSubmitHandler },
            this.renderChildren(this.props, this.state, {
                handleOnBlur: this.onFieldBlurHandler.bind(this),
                handleOnChange: this.onFieldChangedHandler.bind(this),
                handleOnClick: this.onFieldClickedHandler.bind(this),
            }),
            React.createElement("button", { type: "submit" }, submitLabel)));
    };
    Form.prototype.populateFormState = function (children) {
        var _this = this;
        if (lodash_1.isEmpty(this.formState)) {
            return lodash_1.map(children, function (child) {
                _this.formState[child.props.name] = child.props.value;
            });
        }
    };
    Form.prototype.proofValidation = function (handleType, validate) {
        return this.validateOn.indexOf(handleType) !== -1 ?
            validate() :
            null;
    };
    Form.prototype.extractErrors = function (errors, child) {
        var result = errors.filter(function (error) { return lodash_1.keys(error).indexOf(child.props.name) !== -1; });
        return lodash_1.first(result) ? lodash_1.first(result)[child.props.name] : [];
    };
    Form.prototype.renderChildren = function (formProps, formState, childProps) {
        var _this = this;
        var handleOnBlur = childProps.handleOnBlur, handleOnChange = childProps.handleOnChange, handleOnClick = childProps.handleOnClick;
        var errors = formState.errors;
        return react_utils_1.Children.deepMap(formProps.children, function (child) {
            if (child.type === Field_1.Field) {
                return React.cloneElement(child, {
                    errors: _this.extractErrors(errors, child),
                    handleOnBlur: handleOnBlur,
                    handleOnChange: handleOnChange,
                    handleOnClick: handleOnClick,
                });
            }
            else {
                return child;
            }
        });
    };
    Form.Field = Field_1.Field;
    Form.propTypes = {
        /** "action" - to ba passes as form action. */
        action: prop_types_1.PropTypes.string.isRequired,
        /** "submitLabel" - will be set as label of submit button */
        submitLabel: prop_types_1.PropTypes.string,
        /** children - all children between Form tags */
        children: prop_types_1.PropTypes.arrayOf(prop_types_1.PropTypes.element),
        /** "method" - to ba passes as form method (POST, GET). */
        method: prop_types_1.PropTypes.string,
        /** "validateOn" - array of hooks to trigger validation process ['submit', "blur", "click"]*/
        validateOn: prop_types_1.PropTypes.arrayOf(prop_types_1.PropTypes.string),
    };
    Form.defaultProps = {
        action: '/',
        method: 'POST',
        validateOn: ['submit'],
        submitLabel: 'Submit'
    };
    Form = __decorate([
        ValidationDecorator_1.ValidationDecorator
    ], Form);
    return Form;
}(React.Component));
exports.Form = Form;
//# sourceMappingURL=Form.js.map