const SvgBuilderPatterns = {
  getBorderPatterns: ({ width, height, numberOfGeometry = 1 }) => {
    const elements = [];
    const wRatio = width / numberOfGeometry;
    const hRatio = height / numberOfGeometry;

    for (let i = 0; i < numberOfGeometry; i++) {
      const x = Math.round(wRatio * i / 2);
      const y = Math.round(hRatio * i / 2);
      const w = width - x * 2;
      const h = height - y * 2;

      elements.push({
        x, y, w, h,
        options: {
          fill: 'transparent'
        }
      });
    }

    return elements;
  }
};

