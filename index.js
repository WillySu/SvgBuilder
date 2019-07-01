(() => {
  const width = 128;
  const height = 128;
  const numberOfGeometry = 2;
  const squareSvgBuilder = new SvgBuilder({
    width,
    height,
    elements: SvgBuilderPatterns.getBorderPatterns({
      width, height, numberOfGeometry
    })
  });
  const PATTERNS = [
    {
      svgBuilder: squareSvgBuilder,
      formBuilder: new FormBuilder({
        fields: [
          {
            label: 'Width',
            attrs: { name: 'width', min: 1, type:'number', value: width }
          },
          {
            label: 'Height',
            attrs: { name: 'height', min: 1, type:'number', value: height }
          },
          {
            label: 'Number',
            attrs: { name: 'numberOfGeometry', min: 1, type:'number', value: numberOfGeometry }
          }
        ],
        callback: (field, value) => {
          if (field === 'numberOfGeometry') {
            const { width: w, height: h } = squareSvgBuilder;
            const elements = SvgBuilderPatterns.getBorderPatterns({
              width: w, height: h, numberOfGeometry: value
            });
            squareSvgBuilder.update({ field: 'elements', value: elements });
          } else {
            squareSvgBuilder.update({ field, value });
          }
        }
      })
    }
  ];

  function init () {
    const mainHolder = document.getElementById('main');

    PATTERNS.forEach((p) => {
      const { formBuilder, svgBuilder } = p;
      const patternHolder = document.createElement('div');
      patternHolder.setAttribute('class', 'pattern-holder');

      const svgHolder = document.createElement('div');
      const formHolder = document.createElement('div');

      svgHolder.appendChild(svgBuilder.svg);
      formHolder.appendChild(formBuilder.form);

      patternHolder.appendChild(svgHolder);
      patternHolder.appendChild(formHolder);

      mainHolder.appendChild(patternHolder);
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
