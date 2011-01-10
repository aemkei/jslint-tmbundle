# JSLint Textmate Bundle #

* Quick validates your JavaScript files on save.
* Shows detailed infos (errors, unused variables, implied globals).
* Lets you edit custom validation settings.

### Usage ###

* ⌘S - Quick Validate
* ⌃⇧V - Validate Syntax

### Installation ###

Copy and paste the following block to your terminal:

    cd ~/Library/Application\ Support/TextMate/Bundles
    rm -Rf jslint.tmbundle/
    git clone git://github.com/aemkei/jslint-tmbundle.git jslint.tmbundle
    osascript -e 'tell app "TextMate" to reload bundles'

### Requires ###

* [Node.js](nodejs.org/)

### Troubleshooting ###

If you see `node: command not found`, make sure your `PATH` variable is correctly set.    

TextMate > Preferences > Advanced > Shell Variables > PATH