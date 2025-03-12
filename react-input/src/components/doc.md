# React Input Types Documentation

This document explains the various input types defined in the project. Every input type builds on the common BaseInput properties (unless noted otherwise).

---

## BaseInput
_All input types extend these base properties:_

- **id**  
  Type: string (optional)  
  Default: undefined  
  Description: Unique identifier for the input element.

- **title**  
  Type: string (optional)  
  Default: undefined  
  Description: Label or title displayed for the input.

- **type**  
  Type: Type (required)  
  Default: _(determined by specific type)_  
  Description: Determines the input type. E.g., "text", "checkbox", etc.

- **name**  
  Type: string (required)  
  Default: N/A  
  Description: The name attribute for form data submission.

- **register**  
  Type: any (required)  
  Default: N/A  
  Description: Registration function, generally used with form libraries.

- **loading**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Indicates whether the input is in a loading state.

- **disabled**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Disables the input if true.

- **onChange / onBlur**  
  Type: Function (optional)  
  Default: undefined  
  Description: Event handlers for change and blur events.

- **placeholder**  
  Type: string (optional)  
  Default: undefined  
  Description: Placeholder text for the input.

- **required**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Marks the input as required.

- **className, wrapperClassName, titleClassName**  
  Type: string (optional)  
  Default: undefined  
  Description: CSS classes for styling the input, its wrapper, and title.

- **defaultValue**  
  Type: any (optional)  
  Default: undefined  
  Description: The initial or default value of the input.

- **customValidations, validationComponent, validationOn, notValidClassName**  
  Type: Custom validations / React component / string settings  
  Default: undefined  
  Description: Properties handling custom validation logic and error display.

- **before, after / beforeClassName, afterClassName**  
  Type: any / string (optional)  
  Default: undefined  
  Description: Elements and their styling that appear before/after the input.

- **loadingClassName, loadingObject**  
  Type: string / React.ReactNode (optional)  
  Default: undefined  
  Description: Custom CSS class and element for showing loading state.

- **componentStructure**  
  Type: ComponentDescriptor (optional)  
  Default: undefined  
  Description: Defines a custom layout or structure for the input component.

- **disabledClassName, wrapInside**  
  Type: string / boolean (optional)  
  Default: undefined  
  Description: Additional styling for disabled states or wrapping the input in a container.

---

## Specific Input Types

### Text Input
_Extends BaseInput with text-specific properties._

- **type**  
  Value: "text"  
  Description: Defines the input as a text field.

- **mask**  
  Type: string (optional)  
  Default: undefined  
  Description: Mask pattern to format the input value.

- **maskChar**  
  Type: string (optional)  
  Default: undefined  
  Description: Character used to fill masked positions.

- **maxLength**  
  Type: number (optional)  
  Default: undefined  
  Description: Maximum number of characters allowed.

- **minLength**  
  Type: number (optional)  
  Default: undefined  
  Description: Minimum number of characters required.

---

### Checkbox Input
_Extends BaseInput for boolean selections._

- **type**  
  Value: "checkbox"  
  Description: Indicates that the input is a checkbox.

- **titleClickable**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Makes the title clickable to toggle the checkbox.

---

### Password Input
_Extends BaseInput for password fields._

- **type**  
  Value: "password"  
  Description: Defines the input as a password field.

- **showIcon & hideIcon**  
  Type: any (optional)  
  Default: undefined  
  Description: Custom icons to show or hide the password.

- **togglePasswordVisibilityClassName**  
  Type: string (optional)  
  Default: undefined  
  Description: Custom CSS class for the visibility toggle button.

- **maxLength & minLength**  
  Type: number (optional)  
  Default: undefined  
  Description: Enforces length restrictions on the password.

---

### Decimal Input
_Extends BaseInput for decimal numbers._

- **type**  
  Value: "decimal"  
  Description: Specifies that the input handles decimal numbers.

- **maxValue & minValue**  
  Type: number (optional)  
  Default: undefined  
  Description: Restricts the number to a given range.

- **separator**  
  Type: string (optional)  
  Default: undefined  
  Description: Character used as the decimal separator.

---

### Integer Input
_Extends BaseInput for integer numbers._

- **type**  
  Value: "integer"  
  Description: Specifies the input handles integer values.

- **maxValue & minValue**  
  Type: number (optional)  
  Default: undefined  
  Description: Limits the input within a defined range.

- **separator**  
  Type: string (optional)  
  Default: undefined  
  Description: Separator character for displaying groups of digits.

- **maxLength & minLength**  
  Type: number (optional)  
  Default: undefined  
  Description: Limits on the number of digits allowed.

---

### Calendar Input
_Extends BaseInput for date or calendar functionality._

- **type**  
  Value: "calendar"  
  Description: Specifies the input is a calendar picker.

- **locale**  
  Type: "persian" | "english" (required)  
  Default: N/A  
  Description: Determines the language/locale of the calendar.

- **range**  
  Type: boolean (optional)  
  Default: undefined  
  Description: If true, enables selecting a date range.

- **maxDate & minDate**  
  Type: Date | string (optional)  
  Default: undefined  
  Description: Sets the selectable date boundaries.

- **onlyMonth**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Allows selection of only the month.

- **separator, format, dateSeparator**  
  Type: string (optional)  
  Default: undefined  
  Description: Patterns and separators for formatting dates.

- **class, portal, editable**  
  Type: string / any / boolean (optional)  
  Default: undefined  
  Description: Additional settings for styling, portal-based rendering, and editability.

---

### Select Input
_Extends BaseInput and omits or customizes some properties from react-select._

- **type**  
  Value: "select"  
  Description: Denotes the input as a select dropdown.

- **multiple**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Allows multiple selections if true.

- **disabled**  
  Type: boolean (optional)  
  Default: undefined  
  Description: Disables the select if true.

- **portal**  
  Type: any (optional)  
  Default: undefined  
  Description: Renders the dropdown list into a portal element.

*Note: Inherits additional settings from react-select with some properties omitted.*

---

### Textarea Input
_Extends BaseInput for multiline text input._

- **type**  
  Value: "textarea"  
  Description: Indicates a textarea element.

- **maxLength & minLength**  
  Type: number (optional)  
  Default: undefined  
  Description: Limits on the number of characters allowed.

---

### File Input
_Extends BaseInput for file uploads._

- **type**  
  Value: "file"  
  Description: Specifies the input is for file selection.

- **maxValue & minValue**  
  Type: number (optional)  
  Default: undefined  
  Description: (Typically define maximum and minimum file size constraints.)

---

## Additional Types & Interfaces

### ErrorTypes
Defines potential validation error messages:
- Properties: minValue, maxValue, minLength, maxLength, email, phoneNumber, required, etc  
  All are strings, representing custom error messages.

### InputMasterContextProps
Used for managing validation state within the component context:
- **validationErrors**: ErrorTypes  
- **defaultProps**: DefaultProps (optional)  
- **setValidationErrors**: Function to update errors  
- **onValidationFailed**: Callback when validation fails

### ValidationComponentProps
Properties for custom validation components:
- **errors**  
  Type: Array<string> (optional)  
  Default: undefined  
  Description: A list of validation error messages.

### CustomValidation & CustomValidations
Custom validation rules:
- **CustomValidation**  
  - **func**: (value: any) => boolean  
  - **error**: string (optional)  
- **CustomValidations**  
  Type: Array of CustomValidation

### ComponentDescriptor & InputComponent
They allow defining structure and custom sub-components for inputs:
- **ComponentDescriptor** can be a simple InputComponent or a complex object defining wrapper, before/after elements, title, and validation areas.
- **InputComponent**  
  - **type**: "input"  
  - **props**: Object of additional properties  
  - **content**: React.ReactNode  
  - **hasValueClassName**: string (optional)

---

This documentation serves as a guide to understand each type, its inherited properties, and specialized settings for various input components in this project.
