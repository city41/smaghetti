# SMA4 Ghidra Loader

This is a plugin for Ghidra that loads a US 1.1 SMA4 ROm into Ghidra with many SMA4 specific things defined.

## Adding the SMA4 specific blocks

run `TS_NODE_FILES=true yarn run-ts-node decomp/scripts/generateGhidraROMBlockHelperClass.ts <path to your sma4 rom>`

This will generate `AddSMA4MemoryBlocks.java` which should be checked into git, so you probably don't need to generate it unless you've made changes to the script.

## How to build

### Prerequisites

You need Java 11 and Gradle. On Ubuntu 20 I did:

`sudo apt install openjdk-11-jdk`
`sudo apt install gradle`

You will also need a local install of Ghidra. Get it from [their releases](https://github.com/NationalSecurityAgency/ghidra/releases) and unzip it somewhere.

### Build

From this directory invoke

`gradle -PGHIDRA_INSTALL_DIR=<absolute path to your gidra install>`

For me it is `ghidra -PGHIDRA_INSTALL_DIR=/home/matt/ghidra/ghidra_10.0.2_PUBLIC`

### build error related to archiveBaseName?

If you get `Could not set unknown property 'archiveBaseName' for task ':buildExtension'`

Then head to `<YOUR-GHIDRA-ROOT>/support` and edit `buildExtension.gradle`.

Change lines 80 and 81 from

```gradle
archiveBaseName = "${ZIP_NAME_PREFIX}_${project.name}"
archiveExtension = 'zip'
```

to

```gradle
def archiveBaseName = "${ZIP_NAME_PREFIX}_${project.name}"
def archiveExtension = 'zip'
```

## How to install

Once built, take the resulting zip file found in `dist/` and copy it to `<YOUR-GHIDRA-ROOT>/Extensions/Ghidra`

Then open Ghidra and **File->Install Extensions...** and check the plugin

## How to use

Launch Ghidra, start a project, import a SMA4 GBA file (must be US 1.1), and choose "SMA4 1.1 US ROM" as the type
