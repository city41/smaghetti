![logo](https://github.com/city41/smaghetti/blob/main/illustrations/logo_140.png?raw=true)

# Smaghetti - SMA4 Level Editor

This is a web based level editor for the game Super Mario Advance 4: Super Mario Bros 3 for the Game Boy Advance.

![screenshot](https://github.com/city41/smaghetti/blob/main/screenshotCropped.png?raw=true)

[Invaded Beach by Nauts](https://smaghetti.com/editor/HTCbl1q6/Invaded-Beach/)

## Try it

It's available here: https://smaghetti.com

## Status

Smaghetti at this point is pretty far along. The [roadmap](https://smaghetti.com/roadmap) marks it as being alpha quality, mostly because several big features are missing from the editor.

At the time of writing, 323 entities exist in Smaghetti. That represents almost every item/enemy/terrain/etc in the game. There aren't many left that need to be added. Mostly what is missing -- entity wise -- are "meta" controls such as sprites that influence auto scrolling. You can create a rather nice level these days, and [many people have](https://smaghetti.com/levels).

## Editor quick start

The editor is at https://smaghetti.com/editor

It is very user friendly and takes loose inspiration from Nintendo's Mario Maker.

Proper documentation and tutorial videos will come later, but for now just start playing with it, most people have been able to figure it out. If you get stuck, start a discussion here in the repo. I always welcome feedback to make things better.

## License

Smaghetti is MIT licensed. See the LICENSE file. Also see the licenses directory for third party licenses.

# Contributing

A lot more work needs to be done, help is awesome! Here are ways to help

## Reverse engineering

The [discussions](https://github.com/city41/smaghetti.com/discussions) are now where most reverse engineering talk is taking place. There is also the [wiki](https://github.com/city41/smaghetti/wiki) and [issues](https://github.com/city41/smaghetti/issues).

### Full on decompilation effort

As of this writing I have [began the effort](https://github.com/city41/smaghetti/discussions/138) of truly reverse engineering the game with the goal of fully decompiling the game back to C code using tools such as Ghidra and Radare2. If you have experience with this or want to contribute, please comment in the discussion.

### HexTree tool

This tool is growing to be pretty powerful. It really lets you explore and manipulate a level. I need to document a bit how it works, but just playing with it should enable one to figure out most of its features.

![screenshot](https://github.com/city41/smaghetti/blob/main/hexTreeScreenshot.png?raw=true)

It is here: https://smaghetti.com/tools/hex-tree

There are some other minor tools listed here too: https://smaghetti.com/tools

## Code contributions

PRs are welcome, but please open an issue and discuss with me first before starting any work. That way no one does any wasted effort. The code is pretty messy and in many parts of the codebase I'm more focused on figuring stuff out than creating clean code. So I am refactoring pretty often. I'd hate to merge a refactor that really harms someone else's PR.

## Subreddit

General discussion subreddit here: https://reddit.com/r/smaghetti

## Code of Conduct

Smaghetti's code of conduct can be read [here](https://github.com/city41/smaghetti/blob/main/CODE_OF_CONDUCT.md). In short: be inclusive, be nice, don't ask for or share any copyrighted items including ROMs and e-reader levels.
