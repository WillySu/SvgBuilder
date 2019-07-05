class SvgBuilder {
  // args: { width, height, title, selected, disabled, onClick, elements }
  // elements: { x, y, w, h, vAlign, hAlign, xAdjust, yAdjust, options }
  // options: { fill, strokeWidth }
  constructor (args) {
    const keys = Object.keys(args);
    keys.forEach(k => this[k] = args[k]);

    this.svg = this.getSvg();
  }

  getElements () {
    const {
      DEFAULT_OPTIONS,
      HORIZONTAL_ALIGN_LEFT,
      HORIZONTAL_ALIGN_CENTER,
      HORIZONTAL_ALIGN_RIGHT,
      NAMESPACE_URI,
      VERTICAL_ALIGN_TOP,
      VERTICAL_ALIGN_MIDDLE,
      VERTICAL_ALIGN_BOTTOM,
      convertValue
    } = SvgBuilderUtils;
    const { width, height, elements = [] } = this;

    return elements.map((el, i) => {
      const { x, y, w, h, vAlign, hAlign, xAdjust, yAdjust, options = {} } = el;
      const optionsToUsed = { ...DEFAULT_OPTIONS, ...options };
      const rectW = convertValue(w, width);
      const rectH = convertValue(h, height);

      let rectX = 0;
      if (x !== undefined) {
        rectX = convertValue(x, width);
      } else if (hAlign === HORIZONTAL_ALIGN_LEFT) {
        rectX = 0;
      } else if (hAlign === HORIZONTAL_ALIGN_CENTER) {
        rectX = width / 2 - rectW / 2;
      } else if (hAlign === HORIZONTAL_ALIGN_RIGHT) {
        rectX = width - rectW;
      }

      if (xAdjust) {
        rectX = rectX + xAdjust;
      }

      let rectY = 0;
      if (y !== undefined) {
        rectY = convertValue(y, height);
      } else if (vAlign === VERTICAL_ALIGN_TOP) {
        rectY = 0;
      } else if (vAlign === VERTICAL_ALIGN_MIDDLE) {
        rectY = height / 2 - rectH / 2;
      } else if (vAlign === VERTICAL_ALIGN_BOTTOM) {
        rectY = height - rectH;
      }

      if (yAdjust) {
        rectY = rectY + yAdjust;
      }

      const rect = document.createElementNS(NAMESPACE_URI, 'rect');
      rect.setAttribute('x', rectX);
      rect.setAttribute('y', rectY);
      rect.setAttribute('width', rectW);
      rect.setAttribute('height', rectH);
      Object.keys(optionsToUsed).forEach((k) => {
        rect.setAttribute(k, optionsToUsed[k]);
      });

      return rect;
    });
  }

  getSvg () {
    const { NAMESPACE_URI } = SvgBuilderUtils;
    const { width, height, title, selected, disabled, onClick } = this;
    const classNameList = ['svg-builder'];
    if (selected) {
      classNameList.push('selected');
    }
    if (disabled) {
      classNameList.push('disabled');
    }

    const childElements = this.getElements();
    if (title && !disabled) {
      const titleTag = document.createElement('title');
      titleTag.appendChild(document.createTextNode(title));
      childElements.push(titleTag);
    }

    const svg = document.createElementNS(NAMESPACE_URI, 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('class', classNameList.join(' '));

    if (typeof onClick === 'function') {
      svg.addEventListener('click', onclick);
    }

    childElements.forEach(ele => svg.appendChild(ele));

    return svg;
  }

  update ({ field, value }) {
    if (this[field] !== value) {
      this[field] = value;

      const newSvg = this.getSvg();
      this.svg.parentNode.appendChild(newSvg);
      this.svg.parentNode.removeChild(this.svg);
      this.svg = newSvg;
    }
  }
}
