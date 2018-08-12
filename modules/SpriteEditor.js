import TxtEngine from "./lib/TxtEngine.js";
import * as Utils from "./Utils.js";

export default class SpriteEditor extends TxtEngine {
  constructor(canvas_dom_elem, width, height, default_bg, default_fg, default_ch) {
    super(canvas_dom_elem, width, height, default_bg, default_fg, default_ch);

    this.active_label = "move";
	this.are_hovering_over_label = false;
	this.recent_hovering_label = null;

    this.labels = {
	  "move": this._create_touchable_label(3, 4, "MOVE", "blue", "white", () => {
	            if (!this.is_active) {
				  this.labels[this.active_tool].is_active = false;
				  this.active_tool = "move";
	              document.body.style.cursor = "move";	  
	              move_label.fg_color = Utils.darken(move_label.fg_color, 0.3);
	            } else {
	              this.is_active = true;	  
	            }
	          }),
	};
  }	

  _create_label(x, y, txt, bg_color, fg_color) {
    let label = Object.create(null);
    label.x = x;
    label.y = y;
    label.txt = txt;
    label.bg_color = bg_color;
    label.fg_color = fg_color;
	label.width = txt.length;

    label.update = () => {
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
  }

  _is_hovering_over_label(label) {
    return (this.input.pointer.x >= label.x && this.input.pointer.x < label.width &&
	         this.input.pointer.y === label.y);
  }

  _has_clicked_label(label) {
    return (this.input.pointer.has_touched && this._is_hovering_over_label(label));
  }

  _create_variable_label(x, y, txt, bg_color, fg_color, variable, max_width) {
    let variable_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	variable_label.width = txt.length + max_width + 2;
	variable_label.variable = variable;

    variable_label.update = () => {
	  this.render_str(x, y, `${txt}: ${variable.substr(0, max_width)}`, bg_color, fg_color);	
    };
  }

  _create_input_label(x, y, txt, bg_color, fg_color, max_width) {
    let input_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	input_label.content = new Array(max_width);
	input_label.is_active = false;
	input_label.width = txt.length + max_width + 2; // for ':<space>'

    input_label.hover_reset(want_to_revert) {
      if (!want_to_revert) {
	    document.body.style.cursor = "text";
	  } else 
	}

    input_label.update = () => {
	  if (!input_label.is_active) {
	    if (this._are_hovering_over_label(input_label)) {
		  if (this.recent_hovering_label !== null) {
		    this.labels[this.recent_hovering_label].hover_reset(true);
		  }
	      this.are_hovering_over_a_label = true; 
		  this.recent_hovering_label = input_label;
		  input_label.hover_reset(false);
		}
		if (this._has_clicked_label(input_label)) {
		  input_label.hover_reset(true);

	      let cursor_pos = 10; // alter
		  this.labels[this.active_label].is_active = false;
		  input_label.is_active = true;
		}
	  } else {
	    // handle char input	  
	  }
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
  }

  _create_touchable_label(x, y, txt, bg_color, fg_color, on_touch) {
    let touchable_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	touchable_label.is_active;

    touchable_label.update = () => {
	  if (!touchable_label.is_active) {
	    if (this._is_hovering_over_label(touchable_label)) {
	      touchable_label.fg_color = Utils.lighten(touchable_label.fg_color, 0.3);	
		} 
	  }
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
  }

  _create_tool_label(x, y, txt, bg_color, fg_color, on_active) {
    let input_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	let input_label.content = new Array(max_width);

    variable_label.update = () => {
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
	  
  }

  update(delta_time) {
	this.are_hovering_over_a_label = false;

    this.shortcuts.forEach()
    
	this.labels.forEach((label) => {
      label.update_and_render();
	});

	if (!this.are_hovering_over_label && this.recent_hovering_label !== null) {
	  this.hovering_label.reset_hover();
	}
  }

}

}
