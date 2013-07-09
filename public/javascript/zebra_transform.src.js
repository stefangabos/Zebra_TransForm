/**
 *  Zebra_TransForm
 *
 *  A tiny (3KB minified) jQuery plugin for styling the appearance of checkboxes, radio buttons and select boxes without
 *  sacrificing functionality and accessibility: the elements preserve their <em>tabindex</em>, give visual feedback when
 *  having the focus, can be accessed by using the keyboard, and look and behave in the same way in all major browsers.
 *
 *  Visit {@link http://stefangabos.ro/jquery/zebra-transform/} for more information.
 *
 *  For more resources visit {@link http://stefangabos.ro/}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    2.3.2 (last revision: July 09, 2013)
 *  @copyright  (c) 2011 - 2013 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_TransForm
 */
;(function($) {

    $.Zebra_TransForm = function(elements, options) {

        // plugin's default options
        var defaults = {

                style_disabled_labels:  true

            },

            // to avoid confusions, use "plugin" to reference the current instance of the object
            plugin = this;

        // this will hold the merged default, and user-provided options
        plugin.settings = {}

        // the "constructor" method that gets called when the object is created
        var init = function() {

            // don't do anything for IE6
            if (browser.name == 'explorer' && browser.version == 6) return;

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // if invalid collection of element to replace
            if (undefined == elements || typeof elements.each != 'function')

                // replace all replaceable elements
                elements = $('input[type="checkbox"], input[type="radio"], select');

            // replace elements
            plugin.update(elements);

            // when window is resized
            $(window).bind('resize', function() {

                // iterate over the replaced elements
                elements.each(function() {

                    var $element = $(this);

                    // remove the wrapper from the original elements
                    $element.parent('.Zebra_TransForm_Wrapper').replaceWith($element);

                });

                // apply the replacements again
                plugin.update(elements)

            });

        }

        /**
         *  If you dynamically add or enable/disable controls, call this method to update the elements' style
         *
         *  @param  mixed    A jQuery object or a collection of jQuery objects as returned by jQuery's selector engine
         *
         *  @return void
         */
        plugin.update = function(elements)
        {

            // iterate through replaceable elements
            elements.each(function() {

                var

                    // reference to jQuery version of the element that needs to be replaced
                    $element = $(this),

                    // reference to the actual DOM element
                    element = this,

                    // get the type of the element
                    type =  $element.is('input:checkbox') ? 'checkbox' :
                            ($element.is('input:radio') ? 'radio' :
                            ($element.is('select') ? 'select' :
                            false));

                // if element is a supported type
                if (type) {

                    // make the first letter capital
                    type = type.charAt(0).toUpperCase() + type.slice(1);

                    var

                        // reference to the replacement div
                        replacement = $element.data('Zebra_TransForm_' + type),

                        // get some of the element's attributes
                        attributes = {

                            'checked':      $element.attr('checked'),
                            'disabled':     $element.attr('disabled'),
                            'multiple':     $element.attr('multiple'),
                            'size':         $element.attr('size')

                        }

                    // if element is not a list or a multi-select box
                    if (!(type == 'Select' && (attributes.multiple || attributes.size))) {

                        // if element was replaced before, remove the replacement from
                        // the DOM as we will be creating it again
                        if (replacement) replacement.remove();

                        var

                            // get some of the element's CSS properties
                            styles = {

                                'width':            $element.outerWidth(),
                                'height':           $element.outerHeight(),
                                'marginLeft':       parseInt($element.css('marginLeft'), 10) || 0,
                                'marginTop':        parseInt($element.css('marginTop'), 10) || 0

                            },

                            // we create a wrapper for the parent element so that we can later position the replacement div
                            // also, make sure the wrapper inherits some important css properties of the parent element
                            wrapper = jQuery('<span>', {'class': 'Zebra_TransForm_Wrapper'}).css({
                                'display':  $element.css('display'),
                                'position': $element.css('position') == 'static' ? 'relative' : $element.css('position'),
                                'float':    $element.css('float'),
                                'top':      $element.css('top'),
                                'right':    $element.css('right'),
                                'bottom':   $element.css('bottom'),
                                'left':     $element.css('left'),
                                'width':    $element.css('width')
                            }),

                            // create the replacement div
                            replacement =

                                jQuery('<div>', {'class': 'Zebra_TransForm_' + type}).

                                // the replacement div will be invisible for now
                                css('visibility', 'hidden');

                        // put the parent element inside the wrapper
                        // also, make sure we set some important css properties for it
                        $element = $element.replaceWith(wrapper).appendTo(wrapper).css({
                            'position': 'relative',
                            'top':      'auto',
                            'right':    'auto',
                            'bottom':   'auto',
                            'left':     'auto'
                        });

                        // if element is a checkbox or radio button
                        if (type != 'Select')

                            // create the tick and add it to the replacement div
                            replacement.append(jQuery('<div>', {

                                'class':    (type == 'Checkbox' ? 'Zebra_TransForm_Checkbox_Tick' : 'Zebra_TransForm_Radio_Dot')

                            // when the replacement is clicked
                            })).bind('click', function() {

                                // trigger the original element's "onChange" event
                                $element.trigger('change');

                            });

                        // if element is a select box
                        else {

                            var

                                // create the arrow element
                                // and add it to the replacement div
                                arrow = jQuery('<div>', {'class': 'Zebra_TransForm_Arrow'}).appendTo(replacement),

                                // create the element showing the currently selected value
                                // and clone the original element's font related CSS properties
                                text = jQuery('<div>', {'class': 'Zebra_TransForm_Text'}).css({

                                    'fontFamily':   $element.css('fontFamily'),
                                    'fontSize':     $element.css('fontSize'),
                                    'fontStyle':    $element.css('fontStyle'),
                                    'fontWeight':   $element.css('fontWeight'),
                                    'width':        styles.width

                                // add the text value of the currently selected option, and add everything to the replacement div
                                }).text(element.options[element.selectedIndex].text).appendTo(replacement.css('background', $element.css('background')));

                        }

                        // add the replacement div to the DOM, right next to the element it replaces
                        // we need to add it to the DOM now so that we can use width(), outerWidth(), etc functions later
                        replacement.insertAfter($element);

                        // get the original element's events
                        var events = $element.data('events');

                        // if there are any events attached to the original element
                        if (events)

                            // iterate through the attached event types
                            for (var event_type in events)

                                // iterate through all the events of a specific type
                                for (var idx in events[event_type])

                                    // copy the event to the replacement element
                                    // (make sure that the function context is the original element -> $.proxy)
                                    replacement[event_type]($.proxy(events[event_type][idx].handler, $element.get(0)));

                        // if element is a checkbox or radio button
                        if (type != 'Select')

                            // place the replacement div so that it's *exactly* above the original element
                            replacement.css({

                                'left': ((styles.width - replacement.width()) / 2) + styles.marginLeft,
                                'top':  ((styles.height - replacement.height()) / 2) + styles.marginTop

                            // style the element according to its state
                            }).addClass(

                                // is checked (but not disabled)
                                (attributes.checked && !attributes.disabled ? 'Zebra_TransForm_' + type + '_Checked' : '') +

                                // is disabled (but not checked)?
                                (attributes.disabled && !attributes.checked ? 'Zebra_TransForm_' + type + '_Disabled' : '') +

                                // is both disabled and checked
                                (attributes.disabled && attributes.checked ? ' Zebra_TransForm_' + type + '_Checked_Disabled' : '')

                            );

                        // if element is a select box
                        else {

                            // if select box is disabled, style accordingly
                            if (attributes.disabled) replacement.addClass('Zebra_TransForm_Select_Disabled');

                            // get some CSS properties
                            $.extend(styles, {

                                'paddingTop':       parseInt($element.css('paddingTop'), 10) || 0,
                                'paddingRight':     parseInt($element.css('paddingRight'), 10) || 0,
                                'paddingBottom':    parseInt($element.css('paddingBottom'), 10) || 0,
                                'paddingLeft':      parseInt($element.css('paddingLeft'), 10) || 0

                            });

                            // the select box needs to be above the replacement div
                            $element.css('z-index', 20);

                            // if browser is Internet Explorer 7
                            if (browser.name == 'explorer' && browser.version == 7) {

                                // since IE7 doesn't support paddings on select boxes, we'll emulate that by
                                // adding margins to the select box, while keeping the replacement div in the
                                // select box's original position

                                // emulate paddings by setting the margins
                                $element.css({
                                    'marginTop':    styles.paddingTop,
                                    'marginBottom': styles.paddingBottom,
                                    'marginLeft':   styles.paddingLeft,
                                    'marginRight':  styles.paddingRight
                                });

                                // the width and height of the replacement div need to be increased
                                // to accomodate padding
                                styles.height += (styles.paddingTop + styles.paddingBottom);
                                styles.width += (styles.paddingLeft + styles.paddingRight);

                            }

                            // place the replacement div so that it's *exactly* above the original element
                            replacement.css({

                                // because the replacement div doesn't have its "width" and "height" set yet,
                                // outerWidth and outerHeight will return the size of the borders for now

                                'left':     styles.marginLeft,
                                'top':      styles.marginTop,
                                'width':    styles.width - replacement.outerWidth(),
                                'height':   styles.height - replacement.outerHeight()

                            });

                            // position the arrow
                            arrow.css({

                                'top':      (replacement.innerHeight() - arrow.outerHeight()) / 2,
                                'right':    browser.name == 'safari' ? 0 : styles.paddingRight

                            });

                            // position the text
                            text.css({

                                'top':  (replacement.innerHeight() - text.outerHeight()) / 2,
                                'left': styles.paddingLeft

                            });

                        }

                        // handle events on the original element
                        $element.bind({

                            // when the element receives focus
                            'focus': function() {

                                // add a class to the replacement div
                                replacement.addClass('Zebra_TransForm_' + type + '_Focus');

                            },

                            // when the element loses focus
                            'blur': function() {

                                // remove a class from the replacement div
                                replacement.removeClass('Zebra_TransForm_' + type + '_Focus');

                            },

                            // when the original element's state changes
                            'change': function() {

                                // if element is not disabled
                                if (!$element.attr('disabled')) {

                                    // if we're doing checkboxes
                                    if (type == 'Checkbox') {

                                        // toggle a class on the replacement div
                                        replacement.toggleClass('Zebra_TransForm_Checkbox_Checked');

                                        // set the "checked" attribute accordingly
                                        if (replacement.hasClass('Zebra_TransForm_Checkbox_Checked'))

                                            $element.attr('checked', 'checked');

                                        else

                                            $element.removeAttr('checked', 'checked');

                                    // if we're doing radio buttons
                                    } else if (type == 'Radio') {

                                        // find all radio buttons sharing the name of the currently clicked
                                        // and iterate through the found elements
                                        $('input:radio[name=' + $element.attr('name') + ']').each(function() {

                                            // reference to the jQuery version of the element
                                            var $control = $(this);

                                            // remove the "checked" attribute
                                            $control.removeAttr('checked');

                                            // remove a class from the replacement div
                                            $control.data('Zebra_TransForm_Radio').removeClass('Zebra_TransForm_Radio_Checked');

                                        });

                                        // add class to replacement div of the currently clicked element
                                        replacement.addClass('Zebra_TransForm_Radio_Checked');

                                        // set the "checked" attribute of the currently clicked element
                                        // remember, we remove these in the lines above
                                        $element.attr('checked', 'checked');

                                    // if select boxes
                                    } else

                                        // put the text value in the replacement div
                                        text.html(element.options[element.selectedIndex].text);

                                }

                            },

                            'keyup': function(e) {

                                // if element is a select box 
                                if (type == 'Select')

                                    // put the text value in the replacement div
                                    text.text(element.options[element.selectedIndex].text);

                            }

                        // make the original element *almost* invisible
                        // (if the element is visible it will be part of the tab-order and accessible by keyboard!)
                        // and save a reference to the replacement div
                        }).css('opacity', '0.0001').data('Zebra_TransForm_' + type, replacement);

                        // make the replacement div visible
                        replacement.css('visibility', 'visible');

                    // if a multi-select box or a list
                    } else if (type == 'Select' && (attributes.multiple || attributes.size))

                        // style the element according to its current state
                        $element.addClass(

                            // if a multi-select or a list
                            attributes.multiple || attributes.size ? 'Zebra_TransForm_List' : ''

                        );

                    // get the attached label
                    var label = $('label[for="' + $element.attr('id') + '"]');

                    // if an attached label exists
                    if (label)

                        //  style the label according to its current state
                        label.addClass(

                            // if element is disabled and labels attached to disabled controls are to be "disabled"
                            attributes.disabled && plugin.settings.style_disabled_labels ? 'Zebra_TransForm_Label_Disabled' : ''

                        );

                }

            });

        }

        // since with jQuery 1.9.0 the $.browser object was removed, we rely on this piece of code from
        // http://www.quirksmode.org/js/detect.html to detect the browser
        var browser = {
        	init: function () {
        		this.name = this.searchString(this.dataBrowser) || '';
        		this.version = this.searchVersion(navigator.userAgent)
        			|| this.searchVersion(navigator.appVersion)
        			|| '';
        	},
        	searchString: function (data) {
        		for (var i=0;i<data.length;i++)	{
        			var dataString = data[i].string;
        			var dataProp = data[i].prop;
        			this.versionSearchString = data[i].versionSearch || data[i].identity;
        			if (dataString) {
        				if (dataString.indexOf(data[i].subString) != -1)
        					return data[i].identity;
        			}
        			else if (dataProp)
        				return data[i].identity;
        		}
        	},
        	searchVersion: function (dataString) {
        		var index = dataString.indexOf(this.versionSearchString);
        		if (index == -1) return;
        		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        	},
        	dataBrowser: [
                {
                    string: navigator.vendor,
        			subString: "Apple",
        			identity: "safari",
        			versionSearch: "Version"
                },
        		{
        			string: navigator.userAgent,
        			subString: 'MSIE',
        			identity: 'explorer',
        			versionSearch: 'MSIE'
        		}
        	]
        }
        browser.init();

        // call the "constructor" method
        init();

    }

})(jQuery);