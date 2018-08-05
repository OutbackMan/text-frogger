export function breakpoint(msg) {
  console.info(msg);
  debugger;
}

export function assert(cond, msg) {
    console.assert(cond, msg);

    if (!cond) {
      debugger;
    }
}
