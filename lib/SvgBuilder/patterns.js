const SvgBuilderPatterns = {
  getCentricSquarePatterns: ({ width, height, numberOfGeometry = 1 }) => {
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
  },
  getGalleryThumbnailPatterns: ({ width, height, rows = 3, cols = 3 }) => {
    const elements = [{
      x: 0, y: 0, w: width, h: height, options: { fill: 'transparent' }
    }];
    const squareW = width / rows;
    const squareH = height / cols;
    const w = Math.round(squareW * 0.8);
    const h = Math.round(squareH * 0.8);
    const spacingW = Math.round(squareW * 0.1);
    const spacingH = Math.round(squareH * 0.1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = Math.round(r * squareW + spacingW);
        const y = Math.round(c * squareH + spacingH);
        elements.push({ x, y, w, h });
      }
    }

    return elements;
  }
};
