function lighten_color(color, scale) {
  shade_color(color, -scale);	
}

function darken_color(color, scale) {
  shade_color(color, scale);	
}

function shade(color, scale) {
  let color_int = parseInt(color.slice(1), 16) >>> 0;
  let base_color = scale < 0 ? 0 : 255;
  let abs_scale = Math.abs(scale);
  
  let red = color_int >> 16;
  let green = (color_int >> 8) & 0xff;
  let blue = color_int & 0xff;

  let new_color = (0xff >>> 0) & ~(0xff << 16) | (red & 0xff << 16);
  
  "#" + Math.round((base_color - red) * abs_scale + red);

}

// retrieve with window.prompt()


