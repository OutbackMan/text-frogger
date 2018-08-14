import SpriteEditor from "./modules/SpriteEditor.js";

function sprite_editor() {
  const SPRITE_EDITOR_INSTANCE = new SpriteEditor(
                                       document.querySelector(".SpriteEditor"),
									   100,
									   100,
                                                                           "black",
                                                                           "white",
                                                                           " "
								 );
  SPRITE_EDITOR_INSTANCE.start();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", sprite_editor);
} else {
  sprite_editor();	
}
