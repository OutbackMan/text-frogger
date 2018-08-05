import F_Config from "./Config.js";
import * as F_Common from "./Common.js";

export default class TextCtx {
  constructor(canvas_dom_elem, logical_width, logical_height) {
    this._ctx = canvas_dom_elem.getContext("2d");
    this._reset_font();

    this._ch_width = parseFloat(this._ctx.measureText("Hg").width);
    // this._ch_height = 2;
    this._ch_height = parseFloat(this._get_ch_height()); // we want v/h monospace font

    this._logical_width = logical_width;
    this._logical_height = logical_height;
    this._min_canvas_width = parseInt(this._logical_width * this._ch_width, 10);
    this._min_canvas_height = parseInt(this._logical_height * this._ch_height, 10);

    this._scale_to_current_window_dimensions();

    window.addEventListener("resize", (e) => {
      this._scale_to_current_window_dimensions();
    });
    window.addEventListener("orientationchange", (e) => {
      this._scale_to_current_window_dimensions();
    });
  }

  _reset_font() {
    this._ctx.font = "normal 2px monospace";
    this._ctx.textBaseline = "hanging";
    this._ctx.textAlign = "start";
  }

  _get_ch_height() {
    let text_span_elem = document.createElement("span");
    text_span_elem.style = "font: normal 2px monospace;";
    let span_text = document.createTextNode("H"); // only use capitals
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

  render_text(x, y, text, fill_style) {
    if (x < 0 || x >= this._logical_width || y < 0 || y >= this._logical_height) {
      if (F_Config.WANT_DEBUG) {
        F_Common.breakpoint(`Invalid renderer coordinates (${x}, ${y})`);
      } else {
        return;
      } 
    }

    let physical_x = parseInt(x * this._ch_width, 10);
    let physical_y = parseInt(y * this._ch_height, 10);

    if (x + text.length > this._logical_width) {
      console.error(`Text string too long`); 
      debugger;
    }

    this._ctx.fillStyle = fill_style;
    this._ctx.fillText(text, physical_x, physical_y);
  }

  clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height); 
  }
}

