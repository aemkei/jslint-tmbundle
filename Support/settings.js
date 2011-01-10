var LINT_OPTIONS = {
  bitwise: true,    // bitwise operators should not be allowed.
  browser: true,    // the standard browser globals should be predefined.
  // cap: true,        // upper case HTML should be allowed.
  // css: true,        // CSS workarounds should be tolerated.
  debug: true,      // debugger statements should be allowed. 
  devel: true,      // browser globals that are useful, eg: "console", …
  es5: true,        // ES5 syntax should be allowed. 
  evil: true,       // eval should be allowed.
  // forin: true,      // unfiltered for in statements should be allowed.
  fragment: true,   // HTML fragments should be allowed.
  indent: 2,        // The number of spaces used for indentation 
  // maxerr: 50,       // The maximum number of warnings reported
  // maxlen: 100,      // The maximum number of characters in a line
  // nomen: true,      // names should be checked for trailing underbars
  newcap: true,     // Initial Caps must be used with constructor functions.
  on: true,         // HTML event handlers should be allowed.
  // onevar: true,     // Allow only one var statement per function.
  // passfail: true,   // the scan should stop on first error.
  // plusplus: true,   // ++ and -- should not be allowed.
  predef: [],       // Names of predefined global variables. eg: ["$"]
  regexp: true,     // . and [^...] should not be allowed in RegExp. 
  // safe: true,       // Safe subset rules are enforced.
  // strict: true,     // ES5 "use strict"; pragma is required. 
  sub: true,        // subscript notation may be used.
  // undef: true,      // variables must be declared before used.
  // white: true,      // strict whitespace rules apply.
  // widget: true,     // Yahoo Widgets globals should be predefined.
  // rhino: true,      // Rhino environment globals should be predefined.
  // windows: true     // Windows globals should be predefined.
};