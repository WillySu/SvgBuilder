/*
[{ name, type, attrs }]
*/

class FormBuilder {
  constructor ({ fields, callback }) {
    this.callback = callback;
    this.fields = fields;
    this.form = this.createForm();
  }

  getInputs () {
    return this.fields.map((f) => {
      const { attrs = {}, callback, label: labelText } = f;
      const label = document.createElement('label');
      label.setAttribute('class', 'form-builder-label');

      const input = document.createElement('input');
      input.setAttribute('class', 'form-builder-input');

      const callbackToUse = callback || this.callback;
      if (callbackToUse) {
        input.addEventListener('change', ev => callbackToUse(attrs.name, ev.target.value));
      }

      Object.keys(attrs).forEach(k => input.setAttribute(k, attrs[k]));

      const heading = labelText || attrs.name;
      if (heading) {
        label.appendChild(document.createTextNode(heading + ': '));
      }
      label.appendChild(input);

      return label;
    });
  }

  createForm () {
    const form = document.createElement('form');
    form.setAttribute('class', 'form-builder');

    const inputLabels = this.getInputs();
    inputLabels.forEach(input => form.appendChild(input));

    return form;
  }
}
