import F_Config from "./Config.js";

export function debug_breakpoint(msg) {
  if (F_Config.WANT_DEBUG) {
    console.info(msg);
    debugger;
  }
}

export function debug_assert(cond, msg) {
  if (F_Config.WANT_DEBUG) {
    console.assert(cond, msg);
    if (!cond) {
      debugger;
    }
  }
}
