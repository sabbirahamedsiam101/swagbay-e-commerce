function colorNameToRgba(colorName, alpha = 0.3) {
  // Create a temporary div element
  const tempDiv = document.createElement("div");
  tempDiv.style.color = colorName;
  document.body.appendChild(tempDiv);

  // Get the computed RGB color (e.g. "rgb(255, 0, 0)")
  const computedColor = getComputedStyle(tempDiv).color;

  // Remove the temporary element
  document.body.removeChild(tempDiv);

  // Extract rgb values from string
  const rgb = computedColor.match(/\d+/g);

  if (rgb) {
    const [r, g, b] = rgb;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // fallback color if parsing fails
  return `rgba(0,0,0,${alpha})`;
}

export default colorNameToRgba;
