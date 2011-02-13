(function($) {
  // Add draggable functionality to an element for the iPad
  // options:
  //  handle:     Pass in a selector for the element that will act as the handle i.e. the part of the element that is in charge of moving it. 
  //              Otherwise it will default to using a child element with the class 'handle' and if none exists, the entire element becomes draggable.
  //  container:  Pass in an optional container selector. This should be used for any libraries that add uncontrollable markup for the element that sets
  //              the draggable window's absolute position e.g. The YUI2 modal overlay adds a container object which controls the absolute positioning, 
  //              but I didn't know of a way to add a custom class to the container, so this option takes care of that limitation.
  //  debugMode:  Setting this option to true will add a small 'console' to the top left corner of the window that shows information about the draggable
  //              element's position. It also changes the background color of the element being dragged to help you figure out if you're passing in the 
  //              correct arguments.
  $.fn.iPadDraggable = function(handle, container, debugMode) {
    var startLeft, startTop, touchStartX, touchStartY, translateX, translateY
    var draggableWindow = $(this)
    
    // If a container selector was passed in and that container selector found an element, use that element as the draggable window
    containers = draggableWindow.parents(container)
    if (container && containers.length != 0) draggableWindow = containers
    
    // If a child element has a class of 'handle', or another selector that was passed in, use it as the handle
    // Otherwise use the whole container as the handle
    if (!handle) handle = '.handle'
    var dragHandle = draggableWindow.find(handle)[0]
    if (!dragHandle) dragHandle = draggableWindow[0]
    
    if (debugMode) {
      // Add a fixed position element that displays where the element was when the touch event started, how much it's being translated at the moment, and where the final position of the element should be
      addConsole()
      setTimeout(function() { 
        startLeft = parseInt(draggableWindow.css('left'))
        startTop  = parseInt(draggableWindow.css('top'))
        debugStartPosition()
        $j('#curPos').css('background', '#FFF')
      }, 3000)
    }
    
    // When the touchstart event is triggered track where the element was at the beginning
    dragHandle.addEventListener('touchstart', function(event) {
      event.preventDefault()
      
      var touch = event.touches[0]
      touchStartX = touch.pageX
      touchStartY = touch.pageY
      
      // Remember where the window started so we can reset the position after the user lifts their finger
      startLeft = parseInt(draggableWindow.css('left'))
      startTop  = parseInt(draggableWindow.css('top'))
      if (debugMode) debugStartPosition()
    }, false)
    
    dragHandle.addEventListener('touchmove', function(event) {
      event.preventDefault()
      
      var touch = event.targetTouches[0]
      translateX = touch.pageX - touchStartX
      translateY = touch.pageY - touchStartY
      
      // We can add effects to the transform CSS attribute as well as let the browser better handle the smooth translation of
      // moving the window around rather than just following the absolute position of the user's finger
      draggableWindow.css('-webkit-transform', 'translate(' + translateX + 'px, ' + translateY + 'px)')
      if (debugMode) debugCurrentPosition()
    }, false)
    
    dragHandle.addEventListener('touchend', function(event) {
      event.preventDefault()
      
      finalLeft = startLeft + translateX
      finalTop  = startTop  + translateY
      
      // Set the new window position and clear the translate value so the absolute position is now reset
      draggableWindow.css('-webkit-transform', 'translate(0px, 0px)')
      draggableWindow.css('left', finalLeft + 'px')
      draggableWindow.css('top',  finalTop  + 'px')
      if (debugMode) debugFinalPosition()
    }, false)
    
    // Debug mode helpers
    function addConsole() { $('body').append('<div id="curPos" style="position: fixed; left: 0; top: 0; width: 80px; height: 60px; background: #FFF;"><div class="start"></div><div class="current"></div><div class="final"></div></div>') }
    function debugStartPosition() { $j('#curPos .start').html(startLeft + 'x' + startTop); $j('#curPos').css('background', 'gray'); draggableWindow.css('background', 'red') }
    function debugCurrentPosition() { $j('#curPos .current').html(translateX + 'x' + translateY); draggableWindow.css('background', 'green') }
    function debugFinalPosition() { $j('#curPos .final').html(finalLeft + 'x' + finalTop); $j('#curPos').css('background', '#FFF'); draggableWindow.css('background', 'red') }
    
    return this
  }
})(jQuery)
