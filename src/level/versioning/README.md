# Versioning

Versioning is a system that enables levels to adapt as Smaghetti grows. Whenever the level format changes, versioning will convert old levels to the new format.

The first version is 5.0.0, which is a legacy holdover from the localstorage versions. Could have easily started with 1.0.0 or 0.0.0, but 5.0.0 is fine.

# When to convert

After loading a level from:
- localstorage (editor, LevelChooserModal)
- server (editor, profile)

basically anytime a level is loaded from anywhere, it should run through convertLevelToLatestVersion.

# how to create a new version

versions should follow semantic versioning as much as possible

1. increment CURRENT_VERSION in convertLevelToLatestVersion.ts and add a comment explaining the bump
2. create a from_<previous-current-version>_to_<new-current-version>.ts file that does the conversion
3. add the converter to the array in convertLevelToLatestVersion.ts, making sure the versions in the froms and tos all line up.
4. update smaghetti.d.ts to be the latest version for all types
5. inside the from*.ts file, store the previous types from smaghetti.d.ts for documentation as well as a guide on how to do the conversion

# legacy levels

legacy levels are those created before 5.0.0. They have no version (the only version at the time was stored in the localStorage key, a dumb decision...), and I have decided to not attempt to convert them. If a user tries to load them, they will just fail and the user will get an error.