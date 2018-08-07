import * as F_ExampleSuite from "./ExampleSuite.js";

export default function run_test_suites() {
  console.info("FROGGER TEST SUITES");
  _run_test_suite("example", F_ExampleSuite);
}

function _run_test_suite(name, module_object) {
  console.group(name.toUpperCase());
  for (let property in module_object) {
    if (typeof module_object[property] === "function") {
      let test_status = module_object[property]();
      let test_status_color = "color: " + (test_status === "PASSED" ? "green" : "red");
      
      console.info(`${property} -- ` + `%c${test_status}`, test_status_color); 
    }  
  }
  console.groupEnd()
}

