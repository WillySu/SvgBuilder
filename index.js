(() => {
  const width = 128;
  const height = 128;
  const numberOfGeometry = 2;
  let galleryRows = 3;
  let galleryCols = 3;
  const { getCentricSquarePatterns, getGalleryThumbnailPatterns } = SvgBuilderPatterns;
  const centricSquareSvgBuilder = new SvgBuilder({
    width,
    height,
    elements: getCentricSquarePatterns({
      width, height, numberOfGeometry
    })
  });
  const galleryThumbnailSvgBuilder = new SvgBuilder({
    width,
    height,
    elements: getGalleryThumbnailPatterns({
      width, height, rows: galleryRows, cols: galleryCols
    })
  });
  const widthField = {
    label: 'Width',
    attrs: { name: 'width', min: 1, type: 'number', value: width }
  };
  const heightField = {
    label: 'Height',
    attrs: { name: 'height', min: 1, type: 'number', value: height }
  };
  const PATTERNS = [
    {
      svgBuilder: centricSquareSvgBuilder,
      formBuilder: new FormBuilder({
        fields: [
          widthField,
          heightField,
          {
            label: 'Number',
            attrs: { name: 'numberOfGeometry', min: 1, type:'number', value: numberOfGeometry }
          }
        ],
        callback: (field, value) => {
          if (field === 'numberOfGeometry') {
            const { width: w, height: h } = centricSquareSvgBuilder;
            const elements = getGalleryThumbnailPatterns({
              width: w, height: h, numberOfGeometry: value
            });
            centricSquareSvgBuilder.update({ field: 'elements', value: elements });
          } else {
            centricSquareSvgBuilder.update({ field, value });
          }
        }
      })
    },
    {
      svgBuilder: galleryThumbnailSvgBuilder,
      formBuilder: new FormBuilder({
        fields: [
          widthField,
          heightField,
          {
            label: 'Rows',
            attrs: { name: 'rows', min: 1, type:'number', value: galleryRows }
          },
          {
            label: 'Cols',
            attrs: { name: 'cols', min: 1, type:'number', value: galleryCols }
          }
        ],
        callback: (field, value) => {
          if (field === 'rows' || field === 'cols') {
            const { width: w, height: h } = galleryThumbnailSvgBuilder;
            galleryRows = field === 'rows' ? value : galleryRows;
            galleryCols = field === 'cols' ? value : galleryCols;
            const elements = getGalleryThumbnailPatterns({
              width: w, height: h, rows: galleryRows, cols: galleryCols
            });
            galleryThumbnailSvgBuilder.update({ field: 'elements', value: elements });
          } else {
            galleryThumbnailSvgBuilder.update({ field, value });
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
