import BaseTopDialog from './components/Dialogs/BaseTopDialog';
import TopDialog from './components/Dialogs/TopDialog';
import FormWrapper from './components/Form/Wrapper';
import BaseFormValidation from './components/Form/Validator/BaseFormValidation';
import FormValidation from './components/Form/Validator/FormValidation';
import FormTrigger from './components/Triggers/FormTrigger';
import MultiCheckboxTrigger from './components/Triggers/MultiCheckboxTrigger';
import DateInput from './components/Form/Inputs/Input/Date';
import DateTimeInput from './components/Form/Inputs/Input/DateTime';
import EmailInput from './components/Form/Inputs/Input/Email';
import FloatInput from './components/Form/Inputs/Input/Float';
import HiddenInput from './components/Form/Inputs/Input/Hidden';
import NumberInput from './components/Form/Inputs/Input/Number';
import PasswordInput from './components/Form/Inputs/Input/Password';
import TextInput from './components/Form/Inputs/Input/Text';
import TimeInput from './components/Form/Inputs/Input/Time';
import CheckboxInput from './components/Form/Inputs/Input/Checkbox/Checkbox';
import CheckboxGroupInput from './components/Form/Inputs/Input/Checkbox/CheckboxGroup';
import MasterCheckboxInput from './components/Form/Inputs/Input/Checkbox/MasterCheckbox';
import RadioInput from './components/Form/Inputs/Input/Radio';
import SingleSelect from './components/Form/Inputs/Select/Single';
import MultiSelect from './components/Form/Inputs/Select/Multi';
import TextArea from './components/Form/Inputs/TextArea/TextArea';
import WysiwygEditor from './components/Form/Inputs/TextArea/Wysiwyg';

import Error from "./components/Form/Validator/Error";

const Components = {
    BaseTopDialog,
    TopDialog,
    FormWrapper,
    BaseFormValidation,
    FormValidation,
    FormTrigger,
    MultiCheckboxTrigger,
    DateInput,
    DateTimeInput,
    EmailInput,
    FloatInput,
    HiddenInput,
    NumberInput,
    PasswordInput,
    TextInput,
    TimeInput,
    CheckboxInput,
    CheckboxGroupInput,
    MasterCheckboxInput,
    RadioInput,
    SingleSelect,
    MultiSelect,
    TextArea,
    WysiwygEditor,
    Error,
};

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Object.keys(Components).forEach(name => {
        Vue.component(name, Components[name]);
    });
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use({ install });
}

// To allow use as module (npm/webpack/etc.) export component
export default Components;