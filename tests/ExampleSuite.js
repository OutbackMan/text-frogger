export function test_something() {
  let test_condition = (1 === 1);

  console.assert(test_condition, `${test_something.name} failure`);

  return test_condition ? "PASSED" : "^^^ FAILED ^^^";
}
