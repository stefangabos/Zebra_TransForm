<img src="https://raw.githubusercontent.com/stefangabos/zebrajs/master/docs/images/logo.png" alt="zebrajs" align="right">

# Zebra TransForm &nbsp;[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=A+tiny+jQuery+plugin+for+replacing+checkboxes,+radio+buttons+and+select+boxes+in+IE7%2B&url=https://github.com/stefangabos/Zebra_TransForm&via=stefangabos&hashtags=jquery,javascript)

*A tiny jQuery plugin for replacing and beautifying checkboxes, radio buttons, and select boxes in IE7+*

[![npm](https://img.shields.io/npm/v/zebra_transform.svg)](https://www.npmjs.com/package/zebra_transform) [![Total](https://img.shields.io/npm/dt/zebra_transform.svg)](https://www.npmjs.com/package/zebra_transform) [![Monthly](https://img.shields.io/npm/dm/zebra_transform.svg)](https://www.npmjs.com/package/zebra_transform) [![](https://data.jsdelivr.com/v1/package/npm/zebra_transform/badge)](https://www.jsdelivr.com/package/npm/zebra_transform) [![License](https://img.shields.io/npm/l/zebra_transform.svg)](https://github.com/stefangabos/zebra_transform/blob/master/LICENSE.md)

> This plugin is mainly intended to be used for styling checkboxes, radio buttons and select boxes in older versions of Internet Explorer, like IE7 and IE8, but it can also be used in other browser if you want to consistently style these form controls cross-browser.

**Zebra TransForm** is a tiny (~5KB minified) jQuery plugin for styling the appearance of check boxes, radio buttons and select boxes without sacrificing functionality and accessibility. This jQuery plugin works by overlaying stylable elements over the native controls. It works in sync with the form's original elements copying the attached event handlers, preserving the tabindex, giving visual feedback when focused, being accessible via keyboard, and looking and behaving in the same way in all major browsers – Chrome, Firefox, Safari, Edge, Opera and Internet Explorer 7+ (in IE6 it will not replace original elements).

## 🎂 Support the development of this project

Your support means a lot and it keeps me motivated to keep working on open source projects.<br>
If you like this project please ⭐ it by clicking on the star button at the top of the page.<br>
If you are feeling generous, you can buy me a coffee by donating through PayPal, or you can become a sponsor.<br>
Either way - **Thank you!** 🎉

[<img src="https://img.shields.io/github/stars/stefangabos/zebra_transform?color=green&label=star%20it%20on%20GitHub" width="132" height="20" alt="Star it on GitHub">](https://github.com/stefangabos/Zebra_TransForm) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MRK6AVGGRV7NU) [<img src="https://img.shields.io/badge/-Sponsor-fafbfc?logo=GitHub%20Sponsors">](https://github.com/sponsors/stefangabos)

## Demo

See the [demos](https://stefangabos.github.io/Zebra_TransForm/index.html)

## Requirements

Zebra TransForm has no dependencies other than jQuery 1.7.1+

## Installation

Zebra TransForm is available as an [npm package](https://www.npmjs.com/package/zebra_transform). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in packages.json
npm install zebra_transform --save
```

Load the latest version of jQuery from a CDN and provide a fallback to a local source, like:

```html
<script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
<script>window.jQuery || document.write('<script src="path/to/jquery-3.5.0.js"><\/script>')</script>
```

Load the Zebra TransForm plugin

```html
<script src="path/to/zebra_transform.js"></script>
```

Alternatively, you can load Zebra TransForm from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_transform) like this:
```html
<!-- for the most recent version, not recommended in production -->
<script src="https://cdn.jsdelivr.net/npm/zebra_transform@latest/dist/zebra_transform.min.js"></script>

<!-- for a specific version -->
<script src="https://cdn.jsdelivr.net/npm/zebra_transform@3.0.0/dist/zebra_transform.min.js"></script>

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Load the style sheet file from a local source

```html
<link rel="stylesheet" href="path/to/zebra_transform.css" type="text/css">
```

...or from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_transform)

```html
<!-- for the most recent version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/zebra_transform@3.0.0/dist/css/zebra_transform.min.css">

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Now, within the DOM-ready event do

```javascript
$(document).ready(function() {

    // style all checkboxes, radio buttons and selects on the page
    var transform = new $.Zebra_TransForm();

    // unless you're planning on using the "update" method
    // you can instantiate the plugin without the "new" keyword
    // and without assigning it to a variable:
    $.Zebra_TransForm();

    // style checkboxes only
    $.Zebra_TransForm($('input[type="checkbox"]'));

    // style checkboxes and radio buttons only
    $.Zebra_TransForm($('input[type="checkbox"], input[type="radio"]'));

    // style checkboxes, radio buttons and selects (same as first example)
    $.Zebra_TransForm($('input[type="checkbox"], input[type="radio"], select'));

    // style checkboxes of a specific parent
    $.Zebra_TransForm($('#element input[type="checkbox"]'));

    // style only a specific element
    $.Zebra_TransForm($('#element'));

    // if you plan on reverting elements to their original state
    // you must instantiate the plugin with the "new" keyword
    // and assign it to a variable
    var zt = new $.Zebra_TransForm();

    // revert elements to their original state
    zt.remove();

});
```

## Configuration options

## Properties

<table width"100%">
    <thead>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>style_disabled_labels</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">true</td>
        <td valign="top">
            If set to <code>true</code>, labels attached to disabled checkboxes and radio buttons will also be styled to
            look disabled.
        </td>
    </tr>
    </tbody>
</table>

## Methods

### `remove()`

Call this method if you want to revert elements to their original state .

```javascript
var zt = new $.Zebra_TransForm();

zt.remove();
```

### `update()`

Call this method to update element styling after manually changing a checlbox or a radio button's status.

```javascript
var zt = new $.Zebra_TransForm();

zt.update();
```

## Sponsors

Cross browser/device testing is done with

[![BrowserStack](https://github.com/stefangabos/Zebra_Dialog/raw/master/examples/browserstack.png)](https://www.browserstack.com/)
