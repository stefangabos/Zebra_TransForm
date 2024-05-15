## version 3.0.2 (May 15, 2024)

- minor maintenance update

## version 3.0.1 (February 12, 2022)

- added the `update` method for updating styling after a checkbox or radio button's status is manually updated

## version 3.0.0 (August 08, 2018)

- performance improvements and source code tweaks
- new folder structure
- the home of the plugin is now exclusively on GitHub
- files required in the build process are not included anymore when installing via npm nor when downloading from GitHub

## version 2.4.5 (January 26, 2016)

- the library is now available as an [npm package](https://www.npmjs.com/package/zebra_transform)

## version 2.4.4 (January 20, 2016)

- better integration with [Bower](http://bower.io/)

## version 2.4.3 (January 16, 2016)

- the library now behaves correctly upon clicking a form's "reset" button; thanks to **Dan** for suggesting this
- fixed a bug where resizing the window would render all transformed elements unusable
- some minor code optimizations
- the library is now available as a [Bower](http://bower.io/) package
- added integration with [Grunt](http://gruntjs.com/) for automating [JSHint](https://github.com/gruntjs/grunt-contrib-jshint) & [Uglify](https://github.com/gruntjs/grunt-contrib-uglify) processes

## version 2.4.2 (September 28, 2013)

- updated jQuery version to 1.10.2 and fixed a typo in the manifest file

## version 2.4.1 (August 16, 2013)

- fixed a bug introduced in the previous list where resizing the window would brake the plugin
- fixed an older bug where event handlers were attached to the original element over and over again upon the updates that occur when the window is resized
- dropped the `update` public method
- added a new `remove` public method, used for reverting replaced elements to their initial state
- performance tweaks and code refactoring
- updated source code so JSHint is now (almost completely) happy

## version 2.4.0 (July 24, 2013)

- fixed a bug introduced in the previous version due to which event handlers attached to the original elements got lost when replaced by the plugin
- fixed a bug where event handlers attached by the user were executed *before* the event handlers attached by the plugin; this was especially troublesome with radio buttons and checkboxes where if one had an event handler for the click event for checking the state of the element, the response was always incorrect
- fixed an issue where the selected value of a drop-down text would wrap if there was not enough space for it to fit in
- fixed an issue where the selected value of a drop-down text would go under the drop-down's "arrow" if it was too long
- fixed another bug introduced in the previous release where radio buttons and checkboxes having right or top margin were not correctly replaced
- fixed a few things as indicated by JSFiddle's JSHint; thanks to **Alex Alexandrescu** for suggesting
- increased overall performance
- changed the look of the select box so it should now be more obvious that select boxes can be styled; thanks **Sebastian Popa** for suggesting
- minimum required jQuery version is now 1.7.1

## version 2.3.3 (July 10, 2013)

- added some new keywords to be used in the [jQuery Plugin Registry](https://plugins.jquery.com/)

## version 2.3.2 (July 09, 2013)

- changed the way the replacement elements are placed which are now relative to the parent element
- fixed a bug when select boxes would have their width specified in percents
- fixed a bug where the background of replacement select boxes was always transparent; now it copies the original select box's background
- fixed a small bug with the placement of the arrow for select boxes in Safari
- the project is now also available on [GitHub](https://github.com/stefangabos/Zebra_TransForm)

## version 2.3.1 (January 28, 2013)

- fixed an issue due to which the plugin was not working with jQuery 1.9.0

## version 2.3 (August 14, 2012)

- elements created by the plugin will now also copy the original elements' events which, when triggered, will run in the context of the original element - so this will be the original element rather than the replacement; for example, a `click` event attached to a checkbox will also be triggered when clicking the replacement element; thanks to **Jesse**

## version 2.2 (July 21, 2012)

- fixed a bug due to which the `update` method was not working
- better support for select boxes in all browsers
- many performance tweaks

## version 2.1 (February 19, 2012)

- fixed a bug with select boxes not being correctly replaced on Chrome

## version 2.0.1 (August 07, 2011)

- fixed a bug with the update method. thanks **Michael**

## version 2.0 (July 19, 2011)

- fixed a bug where the plugin was not updating in real time the selected value of a selected box, if the value was selected by pressing the `ENTER` key
- fixed a bug where in IE7 horizontal padding was not taken into account for select boxes
- fixed a bug where disabled select boxes were not styled
- fixed a bug where select box replacements were not replicating the original select box's font styles
- fixed a bug where floated select boxes were incorrectly replaced
- fixed a bug where margins of the replaced elements were not taken into account
- fixed a bug where select boxes were not properly styled on Safari

## version 1.0 (July 10, 2011)

- initial release