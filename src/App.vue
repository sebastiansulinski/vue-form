<template>
  <div id="app">

    <!-- external buttons -->

    <div class="grid-x">

      <div class="cell small-12 medium-3 large-2">

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

      </div>

      <div class="cell small-12 medium-6 large-4 medium-offset-3 large-offset-6 medium-text-right">

        <nav class="expanded button-group">

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

        </nav>

      </div>

    </div>

    <!-- form -->

    <form-wrapper
      group="update-form"
      action="/"
      :collections="{ address: {}, colours: [], fruit: [] }"
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

        <fieldset class="fieldset">

          <legend>Personal details</legend>

          <div class="grid-x grid-margin-x">

            <div class="cell small-12 medium-6">

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

            </div>

            <div class="cell small-12 medium-6"></div>

            <div class="cell small-12 medium-6">

              <text-input
                :group="group"
                label="First name: *"
                name="first_name"
                v-model="fields.first_name"
                maxlength="30"
                autocomplete="given-name"
                :validation="{
                    'required': 'Please provide your first name',
                    'min:2': 'Minimum length 2 chars.',
                    'max:30': 'Maximum length 30 chars.',
                }"
                :error="error"
                :disabled="isDisabled"
                current-value="Sebastian"
              ></text-input>

            </div>

            <div class="cell small-12 medium-6">

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

            </div>

            <div class="cell small-12 medium-6">

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

            </div>

            <div class="cell small-12 medium-6">

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

            </div>

            <div class="cell small-12 medium-6">

              <text-input
                :group="group"
                name="address.line_1"
                label="Address line 1: *"
                v-model="fields.address.line_1"
                :validation="{
                    'required': 'Please provide your address'
                }"
                :error="error"
                :disabled="isDisabled"
              ></text-input>

            </div>

            <div class="cell small-12 medium-6">

              <text-input
                :group="group"
                name="address.line_2"
                label="Address line 2:"
                v-model="fields.address.line_2"
                :disabled="isDisabled"
              ></text-input>

            </div>

            <div class="cell small-12 medium-6">

              <text-input
                :group="group"
                label="Town: *"
                name="address.town"
                v-model="fields.address.town"
                :validation="{
                    'required': 'Please provide your town name'
                }"
                :error="error"
                :disabled="isDisabled"
              ></text-input>

            </div>

            <div class="cell small-12 medium-6">

              <text-input
                :group="group"
                label="Post code: *"
                name="address.post_code"
                v-model="fields.address.post_code"
                maxlength="10"
                :validation="{
                    'required': 'Please provide your post code',
                    'max:10': 'Maximum 10 characters'
                }"
                :error="error"
                current-value="LN20"
                :disabled="isDisabled"
              ></text-input>

            </div>

          </div>

        </fieldset>

        <div class="grid-x grid-margin-x">

          <div class="cell small-12 medium-6">

            <fieldset class="fieldset">

              <legend>Consents</legend>

              <div class="checkbox-group">

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

                <checkbox-input
                  :group="group"
                  name="terms"
                  label="I agree with the terms & conditions"
                  v-model="fields.terms"
                  :validation="{
                      'accepted': 'You have to agree with our terms & conditions'
                  }"
                  :error="error"
                  validation-css-class="block"
                  :disabled="isDisabled"
                ></checkbox-input>

              </div>

            </fieldset>

          </div>

          <div class="cell small-12 medium-6">

            <fieldset class="fieldset">

              <legend>Colours (exactly 2 items)</legend>

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

            </fieldset>

          </div>

        </div>

        <div class="grid-x grid-margin-x">

          <div class="cell small-12 medium-6">

            <fieldset class="fieldset">

              <legend>City</legend>

              <div class="checkbox-group">

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

              </div>

            </fieldset>

          </div>

          <div class="cell small-12 medium-6">

            <fieldset class="fieldset">

              <legend>Fruit</legend>

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

            </fieldset>

          </div>

        </div>

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

        <div class="divider"></div>

          <div class="grid-x">

              <div class="cell small-12 medium-3 large-2">

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

              </div>

              <div class="cell small-12 medium-6 large-4 medium-offset-3 large-offset-6 medium-text-right">

                  <nav class="expanded button-group">
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

                  </nav>

              </div>

          </div>

      </div>

    </form-wrapper>

    <!-- top dialog -->

    <top-dialog></top-dialog>

  </div>
</template>

<script>

import VueForm from './wrapper.js';

export default {
  name: 'app',
  components: {
      ...VueForm
  }
}
</script>
