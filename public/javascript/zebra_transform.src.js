/**
 *  Zebra_TransForm
 *
 *  A tiny (4KB minified) jQuery plugin for styling the appearance of checkboxes, radio buttons and select boxes without
 *  sacrificing functionality and accessibility: the elements preserve their event handlers, their <em>tabindex</em>,
 *  give visual feedback when having the focus, can be accessed by using the keyboard, and look and behave in the same
 *  way in all major browsers.
 *
 *  Visit {@link http://stefangabos.ro/jquery/zebra-transform/} for more information.
 *
 *  For more resources visit {@link http://stefangabos.ro/}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    2.4.1 (last revision: September 28, 2013)
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
            plugin = this, timeout;

        // this will hold the merged default, and user-provided options
        plugin.settings = {};

        /**
         *  Constructor method
         *
         *  @return void
         */
        var init = function() {

            // don't do anything for IE6
            if (browser.name === 'explorer' && browser.version === 6) return;

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // if invalid collection of element to replace
            if (undefined === elements || typeof elements.each !== 'function')

                // replace all replaceable elements
                elements = $('input[type="checkbox"], input[type="radio"], select');

            // handle window resize
            $(window).on('resize.Zebra_TransForm', function() {

                // we use timeouts so that we do not call the "update" method on *every* step of the resize event

                // clear a previously set timeout upon subsequent requests
                clearTimeout(timeout);

                // set timeout again
                timeout = setTimeout(function() {

                    // update replacements
                    update();

                }, 100);

            });

            // update replacements
            update();

        };

        /**
         *  Method for handling element replacement.
         *
         *  @access private
         *
         *  @return void
         */
        var update = function(remove)
        {

            // iterate through replaceable elements
            elements.each(function() {

                var

                    // reference to jQuery element that needs to be replaced
                    $element = $(this),

                    // reference to the DOM element
                    element = this,

                    // get type of element
                    type =  $element.is('input:checkbox') ? 'checkbox' :
                            ($element.is('input:radio') ? 'radio' :
                            ($element.is('select') ? 'select' :
                            false)),

                    attributes, wrapper, replacement, styles, events, arrow, text, label;

                // if element is a supported type
                if (type) {

                    // make the first letter capital
                    type = type.charAt(0).toUpperCase() + type.slice(1);

                    // get some of the element's attributes
                    attributes = {

                            'checked':      $element.attr('checked'),
                            'disabled':     $element.attr('disabled'),
                            'multiple':     $element.attr('multiple'),
                            'size':         $element.attr('size')

                        };

                    // if element is not a list or a multi-select box
                    if (!(type === 'Select' && (attributes.multiple || attributes.size))) {

                        // reference to the wrapper
                        wrapper = $element.data('Zebra_TransForm_Wrapper');

                        // if element was replaced before
                        if (wrapper) {

                            // replace the wrapper with the original element
                            wrapper.replaceWith($element);

                            // also, remove that class so we get the element's original css properties back
                            $element.removeClass('Zebra_TransForm_Replaced');

                        }

                        // if replacements need to be removed
                        if (remove) {

                            // remove the reference to the wrapper
                            $element.removeData('Zebra_TransForm_Wrapper').

                                // if element is a multi-select or a list, also remove this class
                                removeClass('Zebra_TransForm_List');

                            // if element is disabled and disabled labels need to be styled
                            if (attributes.disabled && plugin.settings.style_disabled_labels) {

                                // get the attached label
                                label = $('label[for="' + $element.attr('id') + '"]');

                                // if an attached label exists
                                if (label)

                                    // remove the styling from the attached label
                                    label.removeClass('Zebra_TransForm_Label_Disabled');

                            }

                            // unbind events set by the plugin
                            $element.unbind('.Zebra_TransForm');

                            // set the original element's opacity back
                            $element.css('opacity', 1);

                            // don't go further
                            return;

                        }

                        // we create a wrapper for the parent element so that we can later position the replacement div
                        // also, make sure the wrapper inherits some important css properties of the parent element
                        wrapper = $('<span>', {'class': 'Zebra_TransForm_Wrapper'}).css({

                            'display':  $element.css('display'),
                            'position': $element.css('position') === 'static' ? 'relative' : $element.css('position'),
                            'float':    $element.css('float'),
                            'top':      $element.css('top'),
                            'right':    $element.css('right'),
                            'bottom':   $element.css('bottom'),
                            'left':     $element.css('left'),
                            'width':    $element.css('width'),
                            'margin':   $element.css('margin')

                        });

                        // create the replacement element
                        replacement = $('<div>', {'class': 'Zebra_TransForm_' + type + (type === 'Radio' ? ' Zebra_TransForm_Radio_' + $element.attr('name') : '')}).

                                // the replacement div will be invisible for now
                                css('visibility', 'hidden');

                        // put the parent element inside the wrapper
                        // also, add a class that will reset some of its css properties
                        $element.wrap(wrapper).addClass('Zebra_TransForm_Replaced');

                        // since wrap() uses a copy of the given HTML structure
                        // we need to use that particular copy from now on
                        wrapper = $element.parent('.Zebra_TransForm_Wrapper');

                        // get some of the element's CSS properties
                        styles = {

                            'position': $element.position(),
                            'width':    $element.outerWidth(),
                            'height':   $element.outerHeight()

                        };

                        // if element is a checkbox or radio button
                        if (type !== 'Select')

                            // create the tick element
                            replacement.append($('<div>', {

                                'class':    (type === 'Checkbox' ? 'Zebra_TransForm_Checkbox_Tick' : 'Zebra_TransForm_Radio_Dot')

                            }));

                        // if element is a select box
                        else {

                            // create the arrow element
                            // and add it to the replacement div
                            arrow = $('<div>', {'class': 'Zebra_TransForm_Arrow'}).appendTo(replacement),

                            // create the element showing the currently selected value
                            // and clone the original element's font related CSS properties
                            text = $('<div>', {'class': 'Zebra_TransForm_Text'}).css({

                                'fontFamily':   $element.css('fontFamily'),
                                'fontSize':     $element.css('fontSize'),
                                'fontStyle':    $element.css('fontStyle'),
                                'fontWeight':   $element.css('fontWeight')

                            // add the text value of the currently selected option, and add everything to the replacement div
                            }).text(element.options[element.selectedIndex].text).appendTo(replacement.css('background', $element.css('background')));

                        }

                        // add the replacement div to the DOM, right next to the element it replaces
                        // we need to add it to the DOM now so that we can use width(), outerWidth(), etc functions later
                        replacement.appendTo(wrapper);

                        // if element is a checkbox or radio button
                        if (type !== 'Select')

                            // place the replacement div so that it's *exactly* above the original element
                            replacement.css({

                                'left': ((styles.width - replacement.width()) / 2) + styles.position.left,
                                'top':  ((styles.height - replacement.height()) / 2) + styles.position.top

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

                            // get some CSS properties of the original element
                            $.extend(styles, {

                                'paddingTop':       parseInt($element.css('paddingTop'), 10) || 0,
                                'paddingRight':     parseInt($element.css('paddingRight'), 10) || 0,
                                'paddingBottom':    parseInt($element.css('paddingBottom'), 10) || 0,
                                'paddingLeft':      parseInt($element.css('paddingLeft'), 10) || 0

                            });

                            // if browser is Internet Explorer 7
                            if (browser.name === 'explorer' && browser.version === 7) {

                                // since IE7 doesn't support paddings on select boxes, we'll emulate that by
                                // adding margins to the select box, while keeping the replacement div in the
                                // select box's original position

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

                                'left':     0,
                                'top':      0,
                                'width':    styles.width - replacement.outerWidth(),
                                'height':   styles.height - replacement.outerHeight()

                            });

                            // position the arrow
                            arrow.css({

                                'top':      (replacement.innerHeight() - arrow.outerHeight()) / 2,
                                'right':    browser.name === 'safari' ? 0 : styles.paddingRight

                            });

                            // position the text
                            text.css({

                                'top':      (replacement.innerHeight() - text.outerHeight()) / 2,
                                'left':     styles.paddingLeft,
                                'width':    styles.width - (styles.paddingRight * 3) - parseFloat(arrow.css('width'))

                            });

                        }

                        // if element was not replaced before
                        if (!$element.hasClass('Zebra_TransForm')) {

                            // handle events of the original element
                            // these handlers will be executed *before* any other similar event attached to the element
                            _bind($element, {

                                // when the element receives focus
                                'focus.Zebra_TransForm': function() {

                                    // add a class to the replacement div
                                    replacement.addClass('Zebra_TransForm_' + type + '_Focus');

                                },

                                // when the element loses focus
                                'blur.Zebra_TransForm': function() {

                                    // remove a class from the replacement div
                                    replacement.removeClass('Zebra_TransForm_' + type + '_Focus');

                                },

                                // when the original element's state changes
                                'change.Zebra_TransForm': function() {

                                    // if element is not disabled
                                    if (!$element.attr('disabled')) {

                                        // if we're doing checkboxes
                                        if (type === 'Checkbox')

                                            // toggle a class on the replacement div
                                            replacement.toggleClass('Zebra_TransForm_Checkbox_Checked');

                                        // if we're doing radio buttons
                                        else if (type === 'Radio') {

                                            // iterate through all the replacements for radio buttons sharing the name of the
                                            // currently clicked one
                                            $('.Zebra_TransForm_Radio_' + $(this).attr('name')).each(function() {

                                                // remove a class from the replacement element
                                                $(this).removeClass('Zebra_TransForm_Radio_Checked');

                                            });

                                            // add class to replacement of the currently clicked element
                                            replacement.addClass('Zebra_TransForm_Radio_Checked');

                                        // if select boxes
                                        } else

                                            // put the text value in the replacement div
                                            text.html(element.options[element.selectedIndex].text);

                                    }

                                },

                                // when a key was pressed on the original element
                                'keyup.Zebra_TransForm': function() {

                                    // if element is a select box
                                    if (type === 'Select')

                                        // put the text value in the replacement div
                                        text.text(element.options[element.selectedIndex].text);

                                }

                            });

                            // get the original element's events
                            events = $._data(element, 'events');

                            // if there are any events attached to the original element
                            if (events)

                                // iterate through the attached event types
                                for (var event_type in events)

                                    // iterate through all the events of a specific type
                                    for (var idx in events[event_type])

                                        // copy the event to the replacement element
                                        // (make sure that the function context is the original element -> $.proxy)
                                        replacement.bind((type !== 'Select' && event_type === 'change' ? 'click' : event_type), $.proxy(events[event_type][idx].handler, element));

                        }

                        // make the original element *almost* invisible
                        // (if the element is visible it will be part of the tab-order and accessible by keyboard!)
                        // and save a reference to the wrapper div
                        $element.css('opacity', '0.0001').addClass('Zebra_TransForm').data('Zebra_TransForm_Wrapper', wrapper);

                        // make the replacement div visible
                        replacement.css('visibility', 'visible');

                    // if a multi-select box or a list
                    } else

                        // style the element according to its current state
                        $element.addClass(

                            // if a multi-select or a list
                            attributes.multiple || attributes.size ? 'Zebra_TransForm_List' : ''

                        );

                    // if element is disabled and disabled labels need to be styled
                    if (attributes.disabled && plugin.settings.style_disabled_labels) {

                        // get the attached label
                        label = $('label[for="' + $element.attr('id') + '"]');

                        // if an attached label exists
                        if (label)

                            //  style the attached label
                            label.addClass('Zebra_TransForm_Label_Disabled');

                    }

                }

            });

        };

        /**
         *  Removes replacements and turns elements back to their original state.
         *
         *  @return void
         */
        plugin.remove = function() {

            // unbind handler from the window's resize event
            $(window).unbind('.Zebra_TransForm');

            // remove replacements
            update(true);

        };

        /**
         *  Method for binding event handlers so that they are triggered first
         *
         *  Based on what i've found:
         *  http://stackoverflow.com/questions/4742610/attaching-jquery-event-handlers-so-that-they-are-triggered-first/4742655#4742655
         *  http://stackoverflow.com/questions/2360655/jquery-event-handlers-always-execute-in-order-they-were-bound-any-way-around-t
         *
         *  @return void
         *
         *  @access private
         */
        var _bind = function(el, binds) {

            // iterate through the {event-type: function} object
            for (var type in binds) {

                // if the same handler is attached to multiple events, split events by white space
                type = type.split(/\s+/);

                // the number of events
                var len = type.length;

                // for each event
                while(len--)

                    // iterate through the elements given as argument
                    el.each(function() {

                        // append our handler to the list
                        $(this).on(type[len], binds[type]);

                        // get the list of handlers attached for the current event
                        // taking name spaces into account
                        var evt = $._data(this, 'events')[type[len].split('.')[0]];

                        // make the last handler be executed first
                        evt.splice(0, 0, evt.pop());

                    });

            }

            // return the element so we can chain
            return el;

        };

        /**
         *  (minimal) Browser detection
         *
         *  Since with jQuery 1.9.0 the $.browser object was removed, we rely on this piece of code from
         *  http://www.quirksmode.org/js/detect.html to detect the browser.
         *
         *  @return void
         *
         *  @access private
         */
        var browser = {
            init: function () {
                this.name = this.searchString(this.dataBrowser) || '';
                this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '';
            },
            searchString: function (data) {
                for (var i=0;i<data.length;i++)    {
                    var dataString = data[i].string;
                    var dataProp = data[i].prop;
                    this.versionSearchString = data[i].versionSearch || data[i].identity;
                    if (dataString) {
                        if (dataString.indexOf(data[i].subString) !== -1)
                            return data[i].identity;
                    }
                    else if (dataProp)
                        return data[i].identity;
                }
            },
            searchVersion: function (dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if (index === -1) return;
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
        };

        browser.init();

        // call the "constructor" method
        init();

    };

})(jQuery);