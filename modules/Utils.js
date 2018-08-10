export function lighten_color(color, scale) {
  _shade_color(color, -scale);	
}

export function darken_color(color, scale) {
  _shade_color(color, scale);	
}

function _shade_color(color, scale) {
  let color_num = parseInt(color.slice(1), 16);
  let base_color = scale < 0 ? 0 : 255;
  let abs_scale = Math.abs(scale);
  
  let red_component = (color_num >> 16);
  let red_component_num = Math.round((base_color - red_component) * abs_scale + red_component) * 
							0x10000;

  let green_component = (color_int >> 8) & 0xff;
  let green_component_num = Math.round((base_color - green_component) * abs_scale + green_component) * 
							  0x100;

  let blue_component = color_int & 0xff;
  let blue_component_num = Math.round((base_color - blue_component) * abs_scale + blue_component);

  let possibly_overflowed_hex_color_str = `${0x1000000 + red_component_num +
								green_component_num + blue_component_num}`;
  
  let in_bounds_hex_color_str = possibly_overflowed_hex_color_str.slice(1);

  return `#${in_bounds_hex_color_str}`; 
}
