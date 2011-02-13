Basic iPad Draggability functionality
=====================================

This jQuery plugin attaches drag/drop events to an HTML element

Installation
------------
Download the code to your javascript project
@$ git clone git@github.com:mikeweber/jquery.iPadDraggable.git@

... and add the jQuery library and this plugin to your HTML head
@<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>@
@<script type="text/javascript" src="/javascripts/iPadDraggable/jquery.iPadDraggable.js"></script>@

Usage
-----
Simply call .iPadDraggable() against the jQuery element you want to make draggable
@$(document).ready(function() { $('.draggable').iPadDraggable() }@

By default, if you've added a .handle element within your draggable element, that will be the element in charge of moving
the container. Otherwise you can also pass in an option to specify another handle selector.
@$(document).ready(function() { $('.draggable').iPadDraggable('.custom_handle') }@
or
@$(document).ready(function() { $('.draggable').iPadDraggable('> div') }@

Another option is to specify the container element that is absolutely positioned. e.g you're using a library
that adds an absolutely position container element that is out of your control:
@
  <div id="container" class="unwanted-container-element-added-by-another-library">
    <div class="draggable">
      <div class="header">Title</div>
      <div class="body">This is my content</div>
    </div>
  </div>
@

You would make it draggable by calling
@
  $(document).ready(function() {
    $('.draggable').iPadDraggable('.header', '.unwanted-container-element-added-by-another-library')
  })
@

Tips
----
This will only work for an element that exists when the DOM is ready. If you want to stay unobtrusive and you're working with
popup windows that come into existence after loading data into a modal window from an AJAX query, you might want to use
[LowPro](https://github.com/danwrong/low-pro-for-jquery). LowPro allows you to add the iPadDraggable declaration once and
have it continue to work as your DOM changes.

@
var iPadDraggableBehavior = $.klass({
  initialize: function() {
    $(this.element).iPadDraggable()
  }
})

jQuery(function($) {
  $('.draggable').attach(iPadDraggableBehavior);
});
@
