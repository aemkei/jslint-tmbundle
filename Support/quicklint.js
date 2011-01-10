var env = process.env || process.ENV,
  file = env.TM_FILEPATH,
  sys = require("sys"),
  fs = require("fs"),
  evals = process.binding('evals'),
  body = "",
  js_lint_lib = fs.readFileSync(__dirname + '/fulljslint.js', 'utf8'),
  options_file = fs.readFileSync(__dirname + '/settings.js', 'utf8');

function write() {
  body += [].splice.call(arguments, 0).join("");
}

function finish_file(){
  sys.puts(body);
}

function check_errors(errors){
  if (errors){
    write(errors.length + " Error" + (errors.length > 1 ? "s" : ""));
  }  
}

function initialize() {
  
  evals.Script.runInThisContext(js_lint_lib);
  evals.Script.runInThisContext(options_file);
  
  var input = fs.readFileSync(file, 'utf8'),
    success = JSLINT(input, LINT_OPTIONS),
    data = JSLINT.data();
    
  check_errors(data.errors);
  
  finish_file();
}

initialize();