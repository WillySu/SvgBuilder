const SvgBuilderUtils = {
  DEFAULT_OPTIONS: {
    fill: 'black',
    strokeWidth: 1
  },
  HORIZONTAL_ALIGN_CENTER: 'center',
  HORIZONTAL_ALIGN_LEFT: 'left',
  HORIZONTAL_ALIGN_RIGHT: 'right',
  NAMESPACE_URI: 'http://www.w3.org/2000/svg',
  PERCENTAGE_REG: /(\d*)\%/,
  TRANSPARENT: 'transparent',
  VERTICAL_ALIGN_MIDDLE: 'middle',
  VERTICAL_ALIGN_BOTTOM: 'bottom',
  VERTICAL_ALIGN_TOP: 'top'
};

SvgBuilderUtils.convertPercentageStringToNumber = (string) => {
  const { PERCENTAGE_REG } = SvgBuilderUtils;
  if (isNaN(string)) {
    const match = PERCENTAGE_REG.exec(string);
    if (Array.isArray(match) && match.length >= 2) {
      return Number(match[1]);
    }
  }
}

SvgBuilderUtils.convertValue = (val, fullLength) => {
  const number = SvgBuilderUtils.convertPercentageStringToNumber(val);
  if (number !== undefined) {
    return number * fullLength / 100;
  }

  if (!isNaN(val)) {
    return Number(val);
  }
}
