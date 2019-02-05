/* ---------------------------------------------
expandAll v.1.3.4
http://adipalaz.awardspace.com/experiments/jquery/expand.html
Requires: jQuery v1.3+
Copyright (c) 2009 Adriana Palazova
Dual licensed under the MIT (http://adipalaz.awardspace.com/docs/mit-license.txt) and GPL (http://adipalaz.awardspace.com/docs/gpl-license.txt) licenses.
------------------------------------------------ */
(function($) {
$.fn.expandAll = function(options) {
    var defaults = {
         //expTxt : '[Show History]',
         //cllpsTxt : '[Hide History]',
         //cllpsEl : '.collapse', // the collapsible element
         trigger : '.expand', // the elements that contain the trigger of the toggle effect on the individual collapsible sections
         ref : '.expand', // the switch 'Expand All/Collapse All' is inserted before the 'ref'
         showMethod : 'show',
         hideMethod : 'hide',
         //state : 'hidden', // the collapsible elements are hidden by default
         speed : 0,
         oneSwitch : true
    };
    var o = $.extend({}, defaults, options);

    var toggleTxt = o.expTxt;
    if (o.state == 'hidden') {
      $(this).find(o.cllpsEl).hide();
      $(this).find(o.trigger + ' > a.open').removeClass('open');
    } else {
      toggleTxt = o.cllpsTxt;
    }

    return this.each(function(index) {
        var referent, $cllps, $tr;
        if (o.ref) {
            var container;
            if (this.id.length) {
              container = '#' + this.id;
            } else if (this.className.length) {
              container = this.tagName.toLowerCase() + '.' + this.className.split(' ').join('.');
            } else {container = this.tagName.toLowerCase();}
            referent = $(this).find("'" + o.ref + ":first'");
            $cllps = $(this).closest(container).find(o.cllpsEl);
            $tr = $(this).closest(container).find(o.trigger + ' > a');
        } else {
            referent = $(this);
            $cllps = $(this).find(o.cllpsEl);
            $tr = $(this).find(o.trigger + ' > a');
        }
        if (o.oneSwitch) {
            referent.before('<p class="switch"><a href="#" class="myDashLink">' + toggleTxt + '</a></p>');
        } else {
            referent.before('<p class="switch1"><a href="#" class="myDashLink">' + o.expTxt + '</a>&nbsp;|&nbsp;<a href="#" class="myDashLink">' + o.cllpsTxt + '</a></p>');
        }

        referent.prev('p').find('a').click(function() {
            if ($(this).text() == o.expTxt) {
              if (o.oneSwitch) {$(this).text(o.cllpsTxt);}
              $tr.addClass('open');
              $cllps[o.showMethod](o.speed);
            } else {
              if (o.oneSwitch) {$(this).text(o.expTxt);}
              $tr.removeClass('open');
              $cllps[o.hideMethod](o.speed);
            }
            return false;
    });
});};
/* ---------------------------------------------
Toggler
http://adipalaz.awardspace.com/experiments/jquery/expand.html
When using this script, please keep the above url intact.
------------------------------------------------ */
$.fn.toggler = function(options) {
    var defaults = {
         cllpsEl : 'div.collapse',
         method : 'slideToggle',
         speed : 'slow',
         container : '', //the common container of all groups with collapsible content (optional)
         initShow : '.shown' //the initially expanded sections (optional)
    };
    var o = $.extend({}, defaults, options);

    $(this).wrapInner('<a style="display:block" href="#" title="Expand/Collapse" />');
    return this.each(function() {
      var container;
      (o.container) ? container = o.container : container = 'div';
      if (o.initShow) {
        $(this).closest(container).find(o.initShow).show().prev().find('a').addClass('open');
      }
      $(this).click(function() {
          $(this).find('a').toggleClass('open').end()
          .next(o.cllpsEl)[o.method](o.speed);
          return false;
    });
});};
$.fn.toggleHeight = function(speed, easing, callback) {
    return this.animate({height: 'toggle'}, speed, easing, callback);
};
//http://www.learningjquery.com/2008/02/simple-effects-plugins:
$.fn.fadeToggle = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle'}, speed, easing, callback);
};
$.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
})(jQuery);
////////////////////////////
/* ---
Sample usage:
$(function() {
    // Call toggler() with the default options. If we add class="shown" to some of the collapsible elements, they will be expanded when the page loads:
    $("#container  h4.expand").toggler();
    // Call expandAll():
    $("#container").expandAll({showMethod: "slideDown", hideMethod: "slideUp", speed: 400});
});
Sample markup:
<div id="container>
  <h4 class="expand">Title 1</h4>
  <div class="collapse shown">...</div>
  <h4 class="expand">Title 2</h4>
  <div class="collapse">...</div>
</div>

--- */
