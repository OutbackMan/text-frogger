import * as Debug from "../Debug.js";

let us_keys = ["Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
"PrintScreen", "ScrollLock", "Pause"
"~","`", "1", "!", "2", '"', "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+"
"Backspace", "Insert", "Home", "PageUp", 

class _TxtEngineInputHandler {
  constructor(x_scale, y_scale) {
	for (let key_index = 0; key_index < this._us_keys.length; ++key_index) {
	  this.keys[this._us_keys[key_index]] = this._create_input_btn();
	}

	this.pointer = Object.create(null);
	this.pointer.left_btn = this._create_btn_holder();
	this.pointer.right_btn = this._create_btn_holder();
	this.pointer.scroll_btn = this._create_btn_holder();
	this.pointer.scroll_btn.delta = 0.0;
	this.pointer.x = 0;
	this.pointer.y = 0;
	this._pointers_down = [];
	this._prev_pointers_x_distance = -1;
	this._prev_pointers_y_distance = -1;
  }
    
  _create_btn_holder() {
	let btn = Object.create(null);
	btn.is_down = false;
	btn.is_pressed = false;
	btn.is_released = false;
	return btn;
  }

  _update_btn_holder(evt, is_pressed, is_down, is_released) {
    if (evt.defaultPrevented) {
      return; 
    }  
    let btn = this._get_input_btn_from_evt(evt); 

    btn.is_pressed = is_pressed;
    btn.is_down = is_down;
    btn.is_released = is_released;
     
	evt.preventDefault();
  }

  _get_btn_holder_from_evt(evt) {
    if (typeof evt.pointerId === "undefined") {
      return this.keys[evt.key];
	}

    if (evt.button === 0) {
	  return this.pointer.left_btn;
	}
	if (evt.button === 1) {
	  return this.pointer.scroll_btn;
	}
	if (evt.button === 2) {
	  return this.pointer.right_btn;
	}
  }

  window.onpointermove = (evt) => {
    if (evt.defaultPrevented) {
      return; 
    }  

    this.pointer.x = evt.clientX; 	
	this.pointer.y = evt.clientY; 	

    for (let i = 0; i < this._pointers_down.length; ++i) {
	  if (this._pointers_down[i].pointerId === evt.pointerId) {
        this._pointers_down[evt.pointerId] = evt;
	  }
	}
	  
	if (this._pointers_down.length === 2) {
      let pointer_x_diff = this._pointers_down[0].clientX -
	                         this._pointers_down[1].clientX;
      let pointer_y_diff = this._pointers_down[0].clientY -
	                         this._pointers_down[1].clientY;

      let delta_x = this._prev_pointers_x_distance / Math.abs(pointer_x_diff);
      let delta_y = this._prev_pointers_y_distance / Math.abs(pointer_y_diff);

	  this.pointer.delta_x = (pointer_x_diff < this._prev_pointers_x_distance) ?
	                           (-1) * delta_x : delta_x;
	  this.pointer.delta_y = (pointer_x_diff < this._prev_pointers_y_distance) ? 
	                           (-1) * delta_y : delta_y;

      this._prev_pointers_x_distance = cur_x_distance;
      this._prev_pointers_y_distance = cur_y_distance;
	}

    evt.preventDefault();
  }

  window.onkeypress = (evt) => this._update_input_btn(evt, true, false, false);

  window.onkeydown = (evt) => this._update_btn(evt, false, true, false);

    this._keyup_reset = null;
    window.onkeyup = function ex(evt) {
	  this._update_btn(evt, false, false, true);
	  if (this._keyup_reset !== null) {
	    clearTimeout(this._keyup_reset);
	  }

	  this._keyup_reset = setTimeout(() => {
        this._update_btn(evt, false, false, false); 
	  }, 150);
	}

  this._pointerup_reset = null;
  window.onpointerup = (evt) => {
    this.pointer.is_dragging = false;	  
	this.pointer.start_x = null;
	this.pointer.start_y = null;

	this._update_btn(evt, false, false, true);
	
    for (let i = 0; i < this._pointers_down.length; ++i) {
	  if (this._pointers_down[i].pointerId === evt.pointerId) {
          this._pointers_down.splice(i, 1);
		  break;
		}
	  }

	this._pointer_up_reset = setTimeout(() => {
	}, 150);
  }

   window.onpointerdown = (evt) => {
     this.pointer.is_dragging = true;
     this.pointer.start_x = evt.clientX;
     this.pointer.start_y = evt.clientY;

     this._pointers_down.push(evt);
	 this._update_btn(evt, false, true, false);
   }


	this._wheel_reset = null;
    window.onwheel = (evt) => { 
	  this.pointer.delta_x = evt.deltaX;
	  this.pointer.delta_y = evt.deltaY;

	  if (this._wheel_reset !== null) {
	    clearTimeout(this._wheel_reset);
	  }

	  this._wheel_reset = setTimeout(() => {
        this._update_btn(evt, false, false, false); 
	  }, 150);
	};


  } 

}

export default class TxtEngine {
  constructor(canvas_dom_elem, logical_width, logical_height) {
    this._ctx = canvas_dom_elem.getContext("2d");
    this._reset_font();

    this._ch_width = parseFloat(this._ctx.measureText("M").width);
    this._ch_height = parseFloat(this._get_ch_height());

    this._logical_width = logical_width;
    this._logical_height = logical_height;
    this._min_canvas_width = parseInt(this._logical_width * this._ch_width, 10);
    this._min_canvas_height = parseInt(this._logical_height * this._ch_height, 10);

	this._ch_buffer = new Array(logical_width * logical_height);
	for (let i = 0; i < logical_width * logical_height; ++i) {
      this._ch_buffer[i] = Object.create(null);
      this._ch_buffer[i].glyph = " ";
      this._ch_buffer[i].bg_color = "white";
      this._ch_buffer[i].fg_color = "black";
	}

    this.on_touch_device = (typeof window.orientation !== "undefined");

    this._scale_to_current_window_dimensions();

    window.onresize = window.onorientationchange = (evt) => {
      this._scale_to_current_window_dimensions();
    });

    this.input = new _TxtEngineInputHandler(this._x_scale * this._ch_width, this._y_scale * this._ch_height);
  }

  start() {
    window.requestAnimationFrame(this._update);	  
  }

  _update(frame_start_time) {
    if (typeof this._update.when_last_frame === "undefined") {
      this._update.when_last_frame = frame_start_time;
    }

    let time_between_frames = frame_start_time - this._update_loop.when_last_frame;
    this._update_loop.when_last_frame = frame_start_time;

    this.update(time_between_frames)

    this.render();

	window.requestAnimationFrame(this._update);
  }

  create() {
    throw new Error("create() must be implemented by child class");	  
  }

  update() {
    throw new Error("update() must be implemented by child class");	  
  }

  get width() {
    return this._logical_width;	  
  }

  get height() {
    return this._logical_height;	  
  }

  // TODO(Ryan): Implementing own event system will negate the need for this
  _get_renderer_from_screen_coords(x, y) {
    return [
      parseInt(x / (this._x_scale * this._ch_width), 10),
	  parseInt(y / (this._y_scale * this._ch_height), 10)
	];
  }

  _reset_font() {
    this._ctx.font = "normal 2px monospace";
    this._ctx.textBaseline = "hanging";
    this._ctx.textAlign = "left";
  }

  _get_ch_height() {
    let text_span_elem = document.createElement("span");
    text_span_elem.style = "font: normal 2px monospace;";
    let span_text = document.createTextNode("Hg");
    text_span_elem.appendChild(span_text);

    let moveable_div_elem = document.createElement("div");
    moveable_div_elem.style = "display: inline-block; width: 1px; height: 0px;";

    let wrapper_div_elem = document.createElement("div");
    wrapper_div_elem.appendChild(text_span_elem);
    wrapper_div_elem.appendChild(moveable_div_elem);

    document.body.appendChild(wrapper_div_elem);

    moveable_div_elem.style.verticalAlign = "bottom";
    let ch_height = moveable_div_elem.getBoundingClientRect().top - text_span_elem.getBoundingClientRect().top;

    document.body.removeChild(wrapper_div_elem);

    return ch_height;
  }

  _scale_to_current_window_dimensions() {
    if (window.innerWidth < this._min_canvas_width) {
      this._ctx.canvas.width = this._min_canvas_width; 
    } else {
      this._ctx.canvas.width = window.innerWidth;
    }
    if (window.innerHeight < this._min_canvas_height) {
      this._ctx.canvas.height = this._min_canvas_height; 
    } else {
      this._ctx.canvas.height = window.innerHeight;
    }
    
    this._reset_font();
    
    const NUM_CH_COULD_BE_DISPLAYED_X = parseInt(this._ctx.canvas.width / this._ch_width, 10);
    const NUM_CH_COULD_BE_DISPLAYED_Y = parseInt(this._ctx.canvas.height / this._ch_height, 10);

    this._x_scale = NUM_CH_COULD_BE_DISPLAYED_X / this._logical_width;
    this._y_scale = NUM_CH_COULD_BE_DISPLAYED_Y / this._logical_height;

    this._ctx.scale(this._x_scale, this._y_scale);
  }

  render_ch(x, y, glyph, bg_color, fg_color) {
    if (x < 0) {
	  TR_Debug.breakpoint(`Invalid coordinates (${x}, ${y}): x must be >= 0`);	
	  x = 0; 
	} 
	if (x >= this._logical_width) {
	  TR_Debug.breakpoint(`Invalid coordinates (${x}, ${y}): x must be < ${this._logical_width}`);	
	  x = this._logical_width - 1;
	} 
	if (y < 0) {
	  TR_Debug.breakpoint(`Invalid coordinates (${x}, ${y}): y must be >= 0`);	
	  y = 0;
	} 
	if (y >= this._logical_height) {
	  TR_Debug.breakpoint(`Invalid coordinates (${x}, ${y}): y must be < ${this._logical_height}`);	
	  y = this._logical_height - 1;
	} 

    let ch_buf_index = y * this._logical_width + x;
    this._ch_buffer[ch_buf_index].glyph = glyph;
    this._ch_buffer[ch_buf_index].bg_color = bg_color;
    this._ch_buffer[ch_buf_index].fg_color = fg_color;
  }

  render_str(x, y, str, bg_color, fg_color) {
    if (x + str.length - 1 >= this._logical_width) {
	  TR_Debug.breakpoint(`Text "${text}" drawn at (${x}, ${y}) exceeds canvas width`);
	  // canvas cuts off text by default
    }

    for (let ch_index = 0; ch_index < str.length; ++ch_index) {
      this.set_ch(x + ch_index, y, str[ch_index], bg_color, fg_color);
	}
  }

  render() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height); 

    for (let row = 0; row < this._logical_height; ++row) { 
	  const TOTAL_CH_WIDTH = parseInt(this._ch_width * this._logical_width, 10);
      let bg_gradient = this._ctx.createLinearGradient(0, 0, TOTAL_CH_WIDTH, 0);       
      let fg_gradient = this._ctx.createLinearGradient(0, 0, TOTAL_CH_WIDTH, 0);       

      let gradient_stop = 0.0;                                                            
      const GRADIENT_STOP_INC = 1 / this._logical_width;               
      let row_str = "";                                                             

      for (let col = 0; col < this._logical_width; ++col) {                           
        const [CH_GLYPH, CH_BG_COLOR, CH_FG_COLOR] = Object.values(this._ch_buffer[row * this._logical_width + col]);

        bg_gradient.addColorStop(gradient_stop, CH_BG_COLOR);                             
        bg_gradient.addColorStop(gradient_stop + GRADIENT_STOP_INC, CH_BG_COLOR);

        fg_gradient.addColorStop(gradient_stop, CH_FG_COLOR);                             
        fg_gradient.addColorStop(gradient_stop + GRADIENT_STOP_INC, CH_FG_COLOR);

        gradient_stop += GRADIENT_STOP_INC;                                                      
        row_str += CH_GLYPH;                                                      
      }                                                                             

      const START_Y = parseInt(row * this._ch_height, 10);
      this._ctx.fillStyle = bg_gradient;
	  this._ctx.fillRect(0, START_Y, TOTAL_CH_WIDTH, parseInt(this._ch_height, 10));
                                                                                
      this._ctx.fillStyle = fg_gradient;
      this._ctx.fillText(row_str, 0, START_Y);
    }                                       
  }
}
