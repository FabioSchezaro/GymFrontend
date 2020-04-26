export class Ui {
  lock(element: any) {
      document.getElementById(element).classList.add('is-loading');
      document.getElementById(element).setAttribute('disabled', 'disabled');
  }
  setActive(element: any) {
      document.getElementById(element).classList.add('active');
  }
  unActive(element: any) {
      document.getElementById(element).classList.remove('active');
  }
  unlock(element: any) {
      document.getElementById(element).classList.remove('is-loading');
      document.getElementById(element).removeAttribute('disabled');
  }
  setShowModal(element: any) {
      document.getElementById(element).classList.add('show');
  }
  setHideModal(element: any) {
      document.getElementById(element).classList.remove('show');
  }
}
