# JSLint Textmate Bundle #

* Quick validates your JavaScript files on save.
* Shows detailed infos (errors, unused variables, implied globals).
* Lets you edit custom validation settings.

### Usage ###

* ⌘S - Qucik validate
* ⌃⇧V - Validate Syntax

### Installation ###

Copy and paste the following block to your terminal:

    cd ~/Library/Application\ Support/TextMate/Bundles
    rm -Rf jslint.tmbundle/
    git clone git://github.com/aemkei/jslint-tmbundle.git jslint.tmbundle
    osascript -e 'tell app "TextMate" to reload bundles'

### Requires ###

* [Node.js](nodejs.org/)

_Hint:_ If you see `nodes: command not found`, make sure your `PATH` variable is correctly set. (TextMate > Preferences > Advanced > Shell Variables > PATH)