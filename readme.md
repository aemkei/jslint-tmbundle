# JSLint Textmate Bundle #


A JavaScript validation and code quality bundle for TextMate using the [latest](https://github.com/douglascrockford/JSLint) [JSLint](jslint.com) version. Read more about it [here](http://tech.groups.yahoo.com/group/jslint_com/message/1730).

### Features ###

* Quick validation on file save (displays a tooltip on error only).
* Detailed infos (errors, unused variables, implied globals).
* Custom validation settings.

### Usage ###

*  ⌘S - Quick Validate
* ⌃⇧V - Validate Syntax

### Installation ###

Copy and paste the following block to your terminal:

    cd ~/Library/Application\ Support/TextMate/Bundles
    rm -Rf jslint.tmbundle/
    git clone git://github.com/aemkei/jslint-tmbundle.git jslint.tmbundle
    osascript -e 'tell app "TextMate" to reload bundles'

### Settings ###

You can customize the JSLint options using the "`Edit Settings`" command.

### Requires ###

* [Node.js](http://nodejs.org/)

### Troubleshooting ###

If you see `node: command not found`, make sure your `PATH` variable is correctly set.    

TextMate > Preferences > Advanced > Shell Variables > PATH