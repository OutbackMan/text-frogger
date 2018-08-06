let width = 3;                                                                  
let height = 2;                                                                 
                                                                                
let ctx = document.querySelector("canvas").getContext("2d");                    
ctx.font = "normal 16px monospace";                                             
ctx.textBaseline = "top";                                                       
                                                                                
                               
// clear context on render()                               
                               
let buffer = [                                                                  
  new Char("e", "red"), new Char("a", "green"), new Char("t", "red"),           
  new Char("f", "yellow"), new Char("l", "black"), new Char("y", "orange")         
];                                                                              
                                                                                
for (let row = 0; row < height; ++row) {                            
  let row_gradient = ctx.createLinearGradient(0, row, width - 1, row);       
                                                                                
  let gradient_stop = 0.0;                                                            
  let row_str = "";                                                             
  for (let col = 0; col < width; ++col) {                           
    let [ch_glyph, ch_color] = Object.values(buffer[row * width + col]);
    
    let stop_inc = (col + 1) / width;               
                                                                                
    row_gradient.addColorStop(gradient_stop, ch_color);                             
    if (col + 1 === width) {            
      row_gradient.addColorStop(1.0, ch_color);           
    } else {                                                                    
      row_gradient.addColorStop(gradient_stop + stop_inc, ch_color);          
    }                                                                           
                                                                                                                                    
    gradient_stop += stop_inc;                                                      
    row_str += ch_glyph;                                                      
  }                                                                             
                                                                                
  ctx.fillStyle = row_gradient;                                                 
  ctx.fillText(0, row, row_str);                                            
}                                       
