var env = process.env || process.ENV,
  file = env.TM_FILEPATH,
  sys = require("util"),
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

function message(title, count){
  return count + " " + title + (count > 1 ? "s" : "");
}

function check_errors(entries){
  
  var errors = 0,
    warnings = 0,
    messages = [];


  if (entries){
    entries.forEach(function(entry) {
      if (entry && (entry.id == "(warning)")){
        warnings++;
      } else {
        errors++
      }
    });
  }
  
  if (errors){
    messages.push(message("error", errors));
  }  
  
  if (warnings){
    messages.push(message("warning", warnings));
  }
  
  write(messages.join(", "));
}

function initialize() {
  
  evals.NodeScript.runInThisContext(js_lint_lib);
  evals.NodeScript.runInThisContext(options_file);
  
  var input = fs.readFileSync(file, 'utf8'),
    success = JSLINT(input, LINT_OPTIONS),
    data = JSLINT.data();
    
  check_errors(data.errors);
  
  finish_file();
}

initialize();