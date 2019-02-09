# Vue Form Component

Set of components to handle your online form interaction

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

Lastly you can bind your vue instance

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