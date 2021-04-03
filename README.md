![logo](https://github.com/city41/smaghetti/blob/main/illustrations/logo_140.png?raw=true)
# Smaghetti - SMA4 Level Editor

This is a web based level editor for the game Super Mario Advance 4: Super Mario Bros 3 for the Game Boy Advance.

![screenshot](https://github.com/city41/smaghetti/blob/main/screenshot.png?raw=true)

## Try it

It's available here: https://smaghetti.com

## Status

Very early. The editor itself was from a previous project and is pretty mature. But there is still a lot of work to do reverse engineering the game and adding missing features.

If really curious where things are at or what's next, check out the [trello board](https://trello.com/b/SKzcVqgT/smaghetti)

## Editor quick start

The editor is at https://smaghetti.com/make

It is very user friendly and takes loose inspiration from Nintendo's Mario Maker. 

Proper documentation and tutorial videos will come later, but for now some features that are less obvious:

* keyboard shortcuts, all the toolbar buttons show their shortcut in their tooltip. Also you can focus certain entities in the palete on the left side using numbers 1 through 9. ctrl/cmnd-z undoes, and ctrl/cmnd-shift-z redoes.
* Hold the space bar then click and drag on the canvas to pan it around
* Use your mouse's scrollwheel to zoom in and out
* drag and select entities, then move them.
* select a single entity to edit details about it. Only some entities support this, try the question block.

## License

Smaghetti is MIT licensed. See the LICENSE file. Also see the licenses directory for third party licenses.

# Contributing

A lot more work needs to be done, help is awesome! Here are ways to help

## Reverse engineering

Please see the [wiki](https://github.com/city41/smaghetti/wiki) to see what has been reverse engineered so far. Anything not found in the wiki and/or [here in the codebase](https://github.com/city41/smaghetti/tree/main/src/entities) has not been figured out yet. If you can figure a new sprite id, object parameter, whatever out, it would be great!

TODO: write up a doc showing good ways to reverse engineer

I have made some (very raw) tools to help with reverse engineering: https://smaghetti.com/tools, as well as the many tools made by the community such as Solar Magic Advance and NLZ-GBA.

## Code contributions

PRs are welcome, but please open an issue and discuss with me first before starting any work. That way no one does any wasted effort

## Bug reports

Since Smaghetti is so young, there is a ton of bugs. Feel free to file them here as an issue


