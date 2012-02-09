var env = process.env || process.ENV,
  file = env.TM_FILEPATH,
  sys = require("util"),
  fs = require("fs"),
  evals = process.binding('evals'),
  body = "",
  js_lint_lib = fs.readFileSync(__dirname + '/fulljslint.js', 'utf8'),
  options_file = fs.readFileSync(__dirname + '/settings.js', 'utf8');


function initialize() {
  
  evals.NodeScript.runInThisContext(js_lint_lib);
  evals.NodeScript.runInThisContext(options_file);
  
  var input = fs.readFileSync(file, 'utf8'),
    success = JSLINT(input, LINT_OPTIONS || {}),
    data = JSLINT.data(),
    errors = [],
    warnings = [];
  
  write_css();
  
  if (data.errors){
    data.errors.forEach(function(error) {
      if (error && (error.id == "(warning)")){
        warnings.push(error);
      } else {
        errors.push(error);
      }
    });
  }

  
  check_success(success);
  check_errors("Error", errors);
  check_errors("Warning", warnings);
  check("Unused Variable", data.unused);
  check("Implied Global", data.implieds);
  
  finish_file();
}

function write() {
  body += [].splice.call(arguments, 0).join("");
}

function write_css() {
  write(
    "<style type='text/css'>",
    ".error { color: #F00; }",
    ".success { color: #0F0; }",
    "</style>"
  );
}

function finish_file(){
  sys.puts(body);
}

function check_success(success) {
  if (success) {
    write("<h2>No Errors</h2>");
    write("Well done!");
  }
}

function mark_evidence(error, undefined) {
    
  if (error.evidence === undefined) { return; }
  
  var mark = "";
  
  for (var i = 0; i < error.character-1; i++){
    mark += " ";
  }
  
  mark = "\n" + mark + "^";
  
  return "<pre>" + error.evidence + mark + "</pre>";
}

function link(text, options){
  var url = "txmt://open?url=file://" + escape(file);

  if (options.line){ 
    url += '&line=' + options.line; 
  }
  
  if (options.character){ 
    url += '&column=' + options.character; 
  }
  
  return "<a href='" + url + "'>" + text  + "</a>";
}


function pluralize(text, count){
  return text + (count > 1 ? "s" : "");
}

function check(title, data){
  
  var count = data && data.length;
  
  if (count){
    var links = [];

    write("<h3>" + data.length + " " + pluralize(title, count) + ":</h3>");

    data.forEach(function(error) {
      links.push(link(error.name, error));
    });

    write("<pre>" + links.join(", ") + "</pre>");
  }  
}

function check_errors(title, errors){
  
  var count = errors && errors.length;
  
  if (count){
    write("<h2>" + count + " " + pluralize(title, count) + "</h2>");

    errors.forEach(function(error) {
      
      if (!error){ return; }
      
      write(link("Line " + error.line + ": " + error.reason, error));
      write(mark_evidence(error));
    });
  }  
}

initialize();