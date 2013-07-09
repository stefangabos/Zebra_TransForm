##Zebra_TransForm

####A tiny jQuery plugin for replacing checkboxes, radio buttons and select boxes

Attempting to use CSS only to style check boxes, select boxes and radio buttons in order to achieve the same look and feel across browsers and operating systems it’s a lost cause: it simply cannot be done. In order to consistently style these form controls cross browser, we will use a combination of CSS and jQuery.

**Zebra_TransForm** is a tiny (around 4KB minified) plugin for jQuery for styling the appearance of check boxes, radio buttons and select boxes without sacrificing functionality and accessibility. This jQuery plugin works by overlaying stylable elements over the native controls. It works in sync with the form’s original elements copying the events attached to these, preserving the tabindex, giving visual feedback when focused, being accessible via keyboard, and looking and behaving in the same way in all major browsers – Firefox, Chrome, Safari, Opera and Internet Explorer 7+ (in IE6 it will not replace original elements)

##Requirements

Zebra_TransForm has no dependencies other than jQuery 1.5.2+
##How to use

First, load the latest version of jQuery from a CDN and provide a fallback to a local source, like:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="public/javascript/jquery-1.9.1.js"><\/script>')</script>
```

Load the Zebra_TransForm plugin

```html
<script type="text/javascript" src="path/to/zebra_transform.js"></script>
```

Load the plugin’s stylesheet file

```html
<link rel="stylesheet" href="path/to/zebra_transform.css" type="text/css">
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

    // if you plan on using the plugin's "update" method
    // you must instantiate the plugin with the "new" keyword
    // and assign it to a variable
    var transform = new $.Zebra_TransForm();

    // call the plugin's "update" method
    transform.update();
});
```

Configuration options and demos on the **[project's homepage](http://stefangabos.ro/jquery/zebra-transform/)**