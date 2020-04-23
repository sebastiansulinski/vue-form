export default class Behaviour {
  static confirmWithDialogAndReset(form, response) {
    form.enable();
    form.reset();

    Behaviour.confirm(form, response);
  }

  static confirmWithDialogAndClear(form, response) {
    form.enable();
    form.clear();

    Behaviour.confirm(form, response);
  }

  static confirm(form, response) {
    form.stopProcessingAjaxCall();

    window.EventBus.fire('top-alert', {
      id: form.group,
      message: response.data.message,
    });
  }

  static redirect(form, response) {
    window.location.href = response.data.url;
  }

  static reload() {
    window.location.reload();
  }

  static sleep(form) {
    form.stopProcessingAjaxCall();
  }
}
