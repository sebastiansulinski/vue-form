<template>
  <div id="app" class="max-w-4xl mx-auto pt-16 pb-4">
    <FormWrapper
      group="profile"
      :disabled="false"
      :fields="{
        title: '',
        name: 'Seb',
        address: {
          billing: {},
          shipping: {},
        },
        shipping_same: true,
        body:
          '&lt;div class=&quot;mt-10 relative lg:mt-0&quot;&gt;&lt;img alt=&quot;Image&quot; class=&quot;relative rounded-md mx-auto&quot; src=&quot;https://images.unsplash.com/photo-1546851985-99a1f88224f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80&quot; /&gt;&lt;/div&gt;',
      }"
      action="http://localhost:3000/profile"
      :helpers="{ section: 1 }"
      behaviour="confirmClear"
      v-slot="{
        fields,
        helpers,
        errors,
        processing,
        disabled,
        toggleDisable,
      }"
    >
      <div>
        <nav
          class="flex rounded-md border border-solid border-gray-900 bg-gray-800 overflow-hiden mb-2 text-white font-semibold"
        >
          <span
            class="py-2 px-4 cursor-pointer border-r border-solid border-gray-900"
            :class="{ 'text-gray-400': helpers.section === 1 }"
            @click="helpers.section = 1"
            >Fist</span
          >
          <span
            class="py-2 px-4 cursor-pointer border-r border-solid border-gray-900"
            :class="{ 'text-gray-400': helpers.section === 2 }"
            @click="helpers.section = 2"
            >Second</span
          >
          <span
            class="py-2 px-4 cursor-pointer border-r border-solid border-gray-900"
            :class="{ 'text-red-500': disabled }"
            @click="toggleDisable"
          >
            <span v-if="disabled">Disabled</span>
            <span v-else>Enabled</span>
          </span>
        </nav>
        <div v-if="helpers.section === 1">
          <div class="relative">
            <select-input
              v-model="fields.title"
              :disabled="disabled"
              class="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
              empty-option-label="Select title"
              :options="[
                { value: 'mr', name: 'Mr' },
                { value: 'mrs', name: 'Mrs' },
              ]"
            ></select-input>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <div
            class="text-red-600 text-sm pb-4"
            v-text="(errors.errors || {}).title"
          ></div>
          <text-input
            type="text"
            v-model="fields.name"
            :disabled="disabled"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
          ></text-input>
          <div
            class="text-red-600 text-sm pb-4"
            v-text="(errors.errors || {}).name"
          ></div>
          <text-input
            type="text"
            v-model="fields.address.billing.line_1"
            :disabled="disabled"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
          ></text-input>
          <div
            class="text-red-600 text-sm pb-4"
            v-text="(errors.errors || {}).address"
          ></div>
          <label class="block py-3 mb-2">
            <checkbox-input
              name="shipping_same"
              class="mr-1"
              :disabled="disabled"
              @change="fields.shipping_same = !fields.shipping_same"
              :checked="fields.shipping_same"
            ></checkbox-input>
            Shipping address is the same as billing
          </label>
          <div v-if="!fields.shipping_same">
            <text-input
              type="text"
              v-model="fields.address.shipping.line_1"
              :disabled="disabled"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
            ></text-input>
          </div>
        </div>
        <div v-if="helpers.section === 2">
          <textarea
            rows="5"
            cols="10"
            v-model="fields.body"
            :disabled="disabled"
            class="rounded-md border border-gray-400 w-full py-2 px-4"
          ></textarea>
        </div>
        <button
          type="submit"
          class="py-2 px-4 text-white rounded-md shadow-md"
          :class="[processing ? 'bg-red-500' : 'bg-blue-500']"
        >
          Update
        </button>
      </div>
    </FormWrapper>

    <NotificationContainer
      class="fixed inset-x-0 top-0"
      v-slot="{ notification, dismiss }"
    >
      <div
        class="relative"
        :class="[notification.type === 'error' ? 'bg-red-600' : 'bg-green-600']"
      >
        <div class="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div class="pr-16 sm:text-center sm:px-16">
            <p class="font-medium text-white">
              <span v-html="notification.message"></span>
            </p>
          </div>
          <div
            class="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start"
          >
            <button
              type="button"
              class="flex p-2 rounded-md focus:outline-none transition ease-in-out duration-150"
              :class="[
                notification.type === 'error'
                  ? 'hover:bg-red-500 focus:bg-red-500'
                  : 'hover:bg-green-500 focus:bg-green-500',
              ]"
              aria-label="Dismiss"
              @click="dismiss"
            >
              <svg
                class="h-6 w-6 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </NotificationContainer>
  </div>
</template>

<script>
import FormWrapper from './components/FormWrapper';
import { NotificationContainer } from '@ssdcode/vue-notification';
import {
  TextInput,
  SelectInput,
  CheckboxInput,
} from '@ssdcode/vue-form-inputs';
export default {
  name: 'App',
  components: {
    FormWrapper,
    NotificationContainer,
    TextInput,
    SelectInput,
    CheckboxInput,
  },
};
</script>

<style>
@import url('~tailwindcss/dist/base.css');
@import url('~tailwindcss/dist/components.css');
@import url('~tailwindcss/dist/utilities.css');
</style>
