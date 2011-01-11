var env = process.env || process.ENV,
  file = env.TM_FILEPATH,
  sys = require("sys"),
  fs = require("fs"),
  evals = process.binding('evals'),
  body = "",
  js_lint_lib = fs.readFileSync(__dirname + '/fulljslint.js', 'utf8'),
  options_file = fs.readFileSync(__dirname + '/settings.js', 'utf8');


function initialize() {
  
  evals.Script.runInThisContext(js_lint_lib);
  evals.Script.runInThisContext(options_file);
  
  var input = fs.readFileSync(file, 'utf8'),
    success = JSLINT(input, LINT_OPTIONS || {}),
    data = JSLINT.data();
  
  write_css();
  
  check_success(success);
  check_errors(data.errors);
  check("Unused Variables", data.unused);
  check("Implied Globals", data.implieds);
  
  finish_file();
}

function write() {
  body += [].splice.call(arguments, 0).join("");
}

function write_css() {
  write(
    "<style type='text/css'>",
    ".error { color: #F00; }",
    ".success { color: #F00; }",
    "</style>"
  );
}

function finish_file(){
  sys.puts(body);
}

function check_success(success) {
  if (success) {
    write("<h2 class='success'>No Errors</h2>");
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

function check(title, data){
  if (data){
    var links = [];

    write("<h2>" + data.length + " " + title + "</h2>");

    data.forEach(function(error) {
      links.push(link(error.name, error));
    });

    write("<pre>" + links.join(", ") + "</pre>");
  }  
}

function check_errors(errors){
  if (errors){
    write("<h2 class='error'>" + errors.length + " Errors</h2>");

    errors.forEach(function(error) {
      
      if (!error){ return; }
      
      write(link("Line " + error.line + ": " + error.reason, error));
      write(mark_evidence(error));
    });
  }  
}

initialize();