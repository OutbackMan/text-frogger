function lighten_color(color, scale) {
  shade_color(color, -scale);	
}

function darken_color(color, scale) {
  shade_color(color, scale);	
}

function shade(color, scale) {
  let color_int = parseInt(color.slice(1), 16) >>> 0;
  let max_color = scale < 0 ? 0 : 255;
  let abs_scale = Math.abs(scale);
  
  let red = color_int >> 16;
  let green = (color_int >> 8) & 0x00ff;
  let blue = color_int & 0x0000ff;
  
  Math.round((max_color - red) * abs_scale + red);

}

// retrieve with window.prompt()


