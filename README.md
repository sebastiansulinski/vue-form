# Vue Form Component

Set of components to handle your online form interaction.

You'll find most of the instructions below, but to have a more in depth understanding of how this set of components works, you might want to watch [Advanced VueJs Form Component](https://www.youtube.com/watch?v=DHCa0ZdBXcY&list=PLpxd8S-CfPhMfjmgoIstBbfO3daFmIGz5) series, which shows how it's been built step by step and explains all design decisions.

## Installation

```bash
npm i @ssdcode/vue-form --save-dev
```

## Dependencies

This package makes use of the following packages

```javascript
vue
@ssdcode/cms-partial
@ssdcode/vue-event-bus
@ssdcode/vue-focus-directive
```

which you will have to import and register

```javascript
import Vue from 'vue'
import EventBus from '@ssdcode/vue-event-bus';
import { ErrorHandler } from '@ssdcode/cms-partials';
import { FocusDirective } from '@ssdcode/vue-focus-directive';

window.EventBus = window.EventBus || new EventBus;
window.ErrorHandler = window.ErrorHandler || ErrorHandler;

import VueForm from '@ssdcode/vue-form';

```

Lastly you can register it with your vue instance

```javascript
const app = new Vue({
    el: '#app',
    directives: {
        FocusDirective
    },
    components: {
        // ...
        ...VueForm
    }
});
```

## Styles

Package comes with 2 `scss` files to style your components

```javascript
src/styles/components/_form.scss
src/styles/components/_top-dialog.scss
```

## Main components

#### Top dialog

Include `<top-dialog>` just before the closing div with id `#app` (or whichever one serves as your app's wrapper)

```html
<div id="app">

    // ... page elements
    
    <top-dialog></top-dialog>
    
</div>
```

#### Form wrapper

```html
<form-wrapper 
    group="update-form"
    action="/"
    v-cloak
>

    <div slot-scope="{
        group,
        fields,
        error,
        isDisabled,
        processing,
        reset,
        clear,
        disableEvent,
        enableEvent
    }">

        //... form inputs and buttons go here

    </div>

</form-wrapper>
```

or if you are providing support for older browsers that do not support object destructuring:

```html
<form-wrapper 
    group="update-form"
    action="/"
    v-cloak
>

    <div slot-scope="props">

        //... form inputs and buttons go here

    </div>

</form-wrapper>
```

**Please make sure that in this case you will have to prepend `props.*` to all properties you'll use within the rest of this documentation i.e. `v-model="props.fields.last_name"` as opposed to just `v-model="fields.last_name"`**

## Input components

The package comes with component for most commonly used input types.
Most of them can render validation errors by just passing `:validation` and `:error` props.
To overwrite the way the validation is rendered, you can pass it between the opening and closing tag of the given input component.

#### Text input

Please note `:group="group"` represents group associated with the `form-wrapper`, hence after destructuring slot scope you can pass it in dynamically

```html
<text-input
    :group="group"
    label="Last name: *"
    name="last_name"
    v-model="fields.last_name"
    maxlength="30"
    autocomplete="family-name"
    :validation="{
        'required': 'Please provide your last name',
        'min:2': 'Minimum length 2 chars.',
        'max:30': 'Maximum length 30 chars.',
    }"
    :error="error"
    :disabled="isDisabled"
></text-input>
```

#### Email input

```html
<email-input
    :group="group"
    label="Email: *"
    name="email"
    v-model="fields.email"
    :validation="{
        'required': 'Please provide a valid email address',
        'email': 'Invalid email address'
    }"
    :error="error"
    :disabled="isDisabled"
></email-input>
```

#### Password input

```html
<password-input
    :group="group"
    name="password"
    label="Password: *"
    v-model="fields.password"
    autocomplete="off"
    :validation="{
        'required': 'Please provide your password',
        'password': 'Invalid password format',
    }"
    :error="error"
    :disabled="isDisabled"
></password-input>
```

#### Other `input` types

In addition to the three input components above there are also the following available:

```html
date-input
time-input
datetime-input
hidden-input
number-input
```

#### Radio input

Because radio button renders multiple inputs, but expects a single value, validation needs to be rendered outside of the component.
When rendering validation outside of the component, you only need to pass the `:validation` rules (without associated messages) in the form of the array - as shown in the example below.

```html
<form-validation
    id="city"
    name="city"
    :show="error.has('city')"
    :validation="{
        'required': 'Please select your city',
        'in': 'Please select your city',
    }"
    :error="error"
    css-class="block"
></form-validation>

<radio-input
    :group="group"
    name="city"
    :options="[
        {
          name: 'London',
          value: 1,
        },
        {
          name: 'Paris',
          value: 2,
        },
        {
          name: 'Madrid',
          value: 3,
        },
        {
          name: 'Amsterdam',
          value: 6,
        }
    ]"
    v-model="fields.city"
    :validation="['required', 'in:1,2,3,6']"
    :error="error"
    :disabled="isDisabled"
></radio-input>
```

#### Single checkbox

You can specify what value should be returned for `checked` and `unchecked` status of the checkbox using `true-value` (when checked) and `false-value` (otherwise). The `current-value` property allows you to specify value of the input when the form first loads - allowing you to have it automatically checked if it is the same as `true-value`.

If you omit `true/false-value` properties, by default boolean `true/false` will be used.

```html
<checkbox-input
    :group="group"
    name="share"
    label="Please share my data with third party"
    v-model="fields.share"
    :validation="{
        'required': 'Invalid selection',
        'in:a': 'We have to share your data'
    }"
    :error="error"
    current-value="a"
    true-value="a"
    false-value="b"
    validation-css-class="block"
    :disabled="isDisabled"
></checkbox-input>
```

If you would like to exclude the unchecked field from the list of inputs when sending the request, use the `remove-when-false` property and set it to `true`:

```html
<checkbox-input
    :group="group"
    name="privacy"
    label="I agree with the privacy policy"
    v-model="fields.privacy"
    :validation="{
        'required': 'You have to agree with our privacy policy'
    }"
    :error="error"
    :remove-when-false="true"
    validation-css-class="block"
    :disabled="isDisabled"
></checkbox-input>
```

#### Group of checkboxes (produces array)

This input produces array consisting of all checked values i.e. `['blue', 'green', 'orange']`. 

Again, because it is a multi select, validation is being rendered outside of the input component.

```html
<form-validation
    id="colours"
    name="colours"
    :show="error.has('colours')"
    :validation="{
        'required': 'Please select exactly 2 items',
        'min': 'Please select exactly 2 items',
        'max': 'Please select exactly 2 items'
    }"
    :error="error"
    css-class="block"
></form-validation>
    
<div class="checkbox-group">

    <checkbox-group-input
        :group="group"
        name="colours"
        :current-value="['blue']"
        :options="[
            {
              name: 'Blue',
              value: 'blue',
            },
            {
              name: 'Green',
              value: 'green',
            },
            {
              name: 'Orange',
              value: 'orange',
            }
        ]"
        v-model="fields.colours"
        :validation="['required', 'min:2', 'max:2']"
        :error="error"
        :disabled="isDisabled"
    ></checkbox-group-input>
    
</div>
```

#### Single select

```html
<single-select
    :group="group"
    name="title"
    label="Title: *"
    v-model="fields.title"
    :options="[
        {
          name: 'Mr',
          value: 1,
        },
        {
          name: 'Mrs',
          value: 2,
        },
        {
          name: 'Ms',
          value: 3,
        },
        {
          name: 'Master',
          value: 4,
        },
        {
          name: 'Miss',
          value: 5,
        }
    ]"
    placeholder="Please select one"
    :focus="true"
    :validation="{
        'required': 'Please select your title',
        'in:1,2,3,4,5': 'Invalid selection'
    }"
    :error="error"
    :disabled="isDisabled"
></single-select>
```

#### Multi select (produces array)

With `multi-select` you can specify array of items representing `current-value` property to pre-select them when form first loads.

```html
<multi-select
    :group="group"
    name="fruit"
    v-model="fields.fruit"
    :options="[
        {
            name: 'Apple',
            value: 'apple',
        },
        {
            name: 'Orange',
            value: 'orange',
        },
        {
            name: 'Grapefruit',
            value: 'grapefruit',
        },
        {
            name: 'Banana',
            value: 'banana',
        }
    ]"
    :validation="{ 'required': 'Please select your fruits' }"
    :error="error"
    :current-value="['banana', 'apple']"
    input-css-class="margin-bottom-0"
    :disabled="isDisabled"
></multi-select>
```

#### Text area

To allow us pass validation as well as content to the `text-area` component, we are using named slots with `body` representing content for the input and `validation` to replace default validation.

```html
<text-area
    :group="group"
    name="excerpt"
    label="Excerpt: *"
    v-model="fields.excerpt"
    :validation="{
        'required': 'Please provide the excerpt',
        'min:3': 'Minimum 3 characters',
        'max:10': 'Maximum 10 characters',
    }"
    :error="error"
    :disabled="isDisabled"
>    
    <div slot="body">Content goes here</div>    
</text-area>
```

or with both, `body` and `validation`

```html
<text-area
    :group="group"
    name="excerpt"
    label="Excerpt: *"
    v-model="fields.excerpt"
    :validation="['required', 'min:3', 'max:10']"
    :error="error"
    :disabled="isDisabled"
>   
    <div slot="body">Content goes here</div>    
    <div slot="validation">
        <form-validation
            id="colours"
            name="colours"
            :show="error.has('colours')"
            :validation="{
                'required': 'Please provide the excerpt',
                'min': 'Minimum 3 characters',
                'max': 'Maximum 10 characters',
            }"
            :error="error"
            css-class="block"
        ></form-validation>
    </div>    
</text-area>
```

#### CKEDITOR

The `wysiwyg-editor` component will render CKEditor window.

For this component to work, you have to make sure that the instance of `CKEIDTOR` is globally available i.e. import it in the header of your document `<script src="//cdn.ckeditor.com/4.11.2/full/ckeditor.js"></script>`.

The same way as `text-area`, you can pass the content and validation using named slots `body` and `validation`.

Make sure that the value you pass to `body` slot is encoded i.e. using `htmlentities`.

This component takes additional 2 properties `components-css`, which is the path pointing to the css file that should be styling wysiwyg content and general `config` to pass any additional CKEDITOR specific configuration options. For more information on `config` see [CKEDITOR_config](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html).

```html
<wysiwyg-editor
    :group="group"
    name="body"
    label="Body: *"
    v-model="fields.body"
    :validation="{
        'required': 'Please provide the body'
    }"
    :error="error"
    contents-css="./assets/editor.css"
    :config="{ height: '30rem' }"
    :disabled="isDisabled"
>
    <div slot="body">&lt;h1&gt;Body&lt;/h1&gt;</div>
</wysiwyg-editor>
```

#### Switch input

// todo

## Triggers

To interact with the form, you can either use buttons within the `form-wrapper`

```html
<form-wrapper 
    group="update-form"
    action="/"
    v-cloak
>

    <div slot-scope="{
        group,
        fields,
        error,
        isDisabled,
        processing,
        reset,
        clear,
        disableEvent,
        enableEvent
    }">
    
        // ...
    
        <button
            type="submit"
            class="expanded button"
            v-show="!processing"
            :disabled="isDisabled"
        ><i class="fas fa-check fa-fw"></i> SUBMIT</button>
        <button
            type="button"
            disabled
            class="button"
            v-show="processing"
        ><i class="fas fa-spinner fa-spin fa-fw"></i> PROCESSING</button>
        
        <button
            type="button"
            class="secondary button"
            @click="disableEvent"
            v-if="!isDisabled"
        ><i class="fas fa-power-off fa-fw"></i> DISABLE</button>
        <button
            type="button"
            class="success button"
            @click="enableEvent"
            v-if="isDisabled"
        ><i class="fas fa-power-off fa-fw"></i> ENABLE</button>
        
        <button
            type="button"
            class="alert button"
            @click="reset"
            :disabled="isDisabled"
        ><i class="fas fa-eraser fa-fw"></i> RESET</button>
        
        <button
            type="button"
            class="warning button"
            @click="clear"
            :disabled="isDisabled"
        ><i class="fas fa-times fa-fw"></i> CLEAR</button>
    
    </div>
    
</form-wrapper>
```

or outside of it. When using triggers outside of the `form-wrapper` you have to make sure that they have `group` property matching the form you're trying to bind them to.

You also need to specify what event should they `fire` on click.
There are several events that a `form-wrapper` is listening to:

* `submit`: submits the form
* `reset`: resets the form input
* `clear`: clears the form input
* `disable-started`: sets isDisabled flag to true
* `disable-ended`: sets isDisabled flag to false


```html
<form-trigger group="update-form" fire="submit" v-cloak>
    <span
        slot-scope="{ isDisabled, trigger, processing }"
        class="expanded button"
        :class="{ disabled: isDisabled }"
        @click="trigger"
    >
        <span v-if="!processing">
            <i class="fas fa-check fa-fw"></i> SUBMIT
        </span>
        <span v-else>
            <i class="fas fa-spinner fa-spin fa-fw"></i> PROCESSING
        </span>
    </span>
</form-trigger>

<form-trigger
    group="update-form"
    fire="disable-started"
    v-cloak
>
    <span
        slot-scope="{ isDisabled, trigger }"
        class="secondary button"
        @click="trigger"
        v-if="!isDisabled"
    >
        <i class="fas fa-power-off fa-fw"></i> DISABLE
    </span>
</form-trigger>

<form-trigger
    group="update-form"
    fire="disable-ended"
    v-cloak
    :always-enabled="true"
>
    <span
        slot-scope="{ isDisabled, trigger }"
        class="success button"
        @click="trigger"
        v-if="isDisabled"
    >
        <i class="fas fa-power-off fa-fw"></i> ENABLE
    </span>
</form-trigger>

<form-trigger group="update-form" fire="reset" v-cloak>
    <span
        slot-scope="{ isDisabled, trigger, processing }"
        class="alert button"
        :class="{ disabled: isDisabled }"
        @click="trigger"
    >
        <span v-if="!processing">
            <i class="fas fa-eraser fa-fw"></i> RESET
        </span>
        <span v-else>
            <i class="fas fa-spinner fa-spin fa-fw"></i> PROCESSING
        </span>
    </span>
</form-trigger>

<form-trigger group="update-form" fire="clear" v-cloak>
    <span
        slot-scope="{ isDisabled, trigger, processing }"
        class="warning button"
        :class="{ disabled: isDisabled }"
        @click="trigger"
    >
    <span v-if="!processing">
        <i class="fas fa-times fa-fw"></i> CLEAR
    </span>
    <span v-else>
        <i class="fas fa-spinner fa-spin fa-fw"></i> PROCESSING
    </span>
    </span>
</form-trigger>
```

## Validation

// todo

## Top Dialog

// todo

## Master checkbox

// todo

## Depending dropdowns

// todo