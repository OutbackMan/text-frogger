import * as F_PhysicsTestSuite from "./PhysicsTestSuite.js";
import * as F_MessageTestSuite from "./MessageTestSuite.js";

export default function run_test_suites() {
  console.info("FROGGER TEST SUITES");
  _run_test_suite("physics", F_PhysicsTestSuite);
}

function _run_test_suite(name, module_object) {
  console.group(name.toUpperCase());
  for (let property in module_object) {
	if (module_object.hasOwnProperty(property) && typeof module_object[property] === "function") {
	  console.info(`${property} -- ` + `%c${module_object[property]()}`, "color: green");
	}  
  }
  console.groupEnd()
}

function test_something() {
  let test_condition = (1 === 0);

  console.assert(test_condition, `failure`);

  return !test_condition ? "PASSED" : return "";
}
