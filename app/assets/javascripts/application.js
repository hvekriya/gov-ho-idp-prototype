function ShowHideContent() {
  var self = this;

  self.escapeElementName = function(str) {
    result = str.replace('[', '\\[').replace(']', '\\]')
    return(result);
  };

  self.showHideRadioToggledContent = function () {
    $(".block-label input[type='radio']").each(function () {

      var $radio = $(this);
      var $radioGroupName = $radio.attr('name');
      var $radioLabel = $radio.parent('label');

      var dataTarget = $radioLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (dataTarget) {

        // Set aria-controls
        $radio.attr('aria-controls', dataTarget);

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $radio.closest('form').find(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {
            var $this = $(this);

            var groupDataTarget = $this.parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.addClass('js-hidden');
            // Set aria-expanded and aria-hidden for hidden content
            $this.attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

          var $dataTarget = $('#' + dataTarget);
          $dataTarget.removeClass('js-hidden');
          // Set aria-expanded and aria-hidden for clicked radio
          $radio.attr('aria-expanded', 'true');
          $dataTarget.attr('aria-hidden', 'false');

        });

      } else {
        // If the data-target attribute is undefined for a radio button,
        // hide visible data-target content for radio buttons in the same group

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {

            var groupDataTarget = $(this).parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.addClass('js-hidden');
            // Set aria-expanded and aria-hidden for hidden content
            $(this).attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

        });
      }

    });
  }
  self.showHideCheckboxToggledContent = function () {

    $(".block-label input[type='checkbox']").each(function() {

      var $checkbox = $(this);
      var $checkboxLabel = $(this).parent();

      var $dataTarget = $checkboxLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

        // Set aria-controls
        $checkbox.attr('aria-controls', $dataTarget);

        // Set aria-expanded and aria-hidden
        $checkbox.attr('aria-expanded', 'false');
        $('#'+$dataTarget).attr('aria-hidden', 'true');

        // For checkboxes revealing hidden content
        $checkbox.on('click', function() {

          var state = $(this).attr('aria-expanded') === 'false' ? true : false;

          // Toggle hidden content
          $('#'+$dataTarget).toggleClass('js-hidden');

          // Update aria-expanded and aria-hidden attributes
          $(this).attr('aria-expanded', state);
          $('#'+$dataTarget).attr('aria-hidden', !state);

        });
      }

    });
  }
}

$(document).ready(function() {

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  var toggleContent = new ShowHideContent();
  toggleContent.showHideRadioToggledContent();
  toggleContent.showHideCheckboxToggledContent();

});









// Collapsibles

function collapsibles() {


  $('.collapsible-item').each(function() {


    // Variables
    var $this    = $(this),
        $header  = $(this).find('.collapsible-heading > *'),
        $content = $(this).find('.collapsible-content');


    // Create a unique ID
    var $id = 'collapsible-' + $(this).index();


    // Add button inside $header
    $header.wrapInner('<button aria-expanded="false" aria-controls="' + $id + '">');
    var $button = $header.children('button');


    // Add attributes to collapsible content
    $content.attr({
      'id' : $id,
      'aria-hidden' : true,
      'style' : 'display: none;'
    });


    // Initialise
    if (($this).hasClass('is-open')) {

      $button.attr('aria-expanded', true);
      $content.attr('aria-hidden', false).toggle();

    }


    // Toggle state
    $button.on('click', function(e) {

      e.preventDefault();

      var state = $(this).attr('aria-expanded') === 'false' ? true : false;

      $button.attr('aria-expanded', state);
      $content.attr('aria-hidden', !state).toggle();

    });


  });


}


// Collapse

function collapse() {


  $('.collapse-item').each(function() {


    // Variables
    var $this    = $(this),
        $header  = $(this).find('.collapse-title'),
        $content = $(this).find('.collapse-content');


    // Create a unique ID
    var $id = 'collapse-' + $(this).index();


    // Add button inside $header
    $header.wrapInner('<button aria-expanded="false" aria-controls="' + $id + '">');
    var $button = $header.children('button');


    // Add attributes to collapsible content
    $content.attr({
      'id' : $id,
      'aria-hidden' : true,
      'style' : 'display: none;'
    });


    // Initialise
    if (($this).hasClass('is-open')) {

      $button.attr('aria-expanded', true);
      $content.attr('aria-hidden', false).toggle();

    }


    // Toggle state
    $button.on('click', function(e) {

      e.preventDefault();

      var state = $(this).attr('aria-expanded') === 'false' ? true : false;

      $button.attr('aria-expanded', state);
      $content.attr('aria-hidden', !state).toggle();

    });


  });


}





    // Show toggled content for control
    function showToggledContent ($control, $content) {
      // Show content
      if ($content.hasClass('js-hidden')) {
        $content.removeClass('js-hidden')
        $content.attr('aria-hidden', 'false')

        // If the controlling input, update aria-expanded
        if ($control.attr('aria-controls')) {
          $control.attr('aria-expanded', 'true')
        }
      }
    }

    // Hide toggled content for control
    function hideToggledContent ($control, $content) {
      $content = $content || getToggledContent($control)

      // Hide content
      if (!$content.hasClass('js-hidden')) {
        $content.addClass('js-hidden')
        $content.attr('aria-hidden', 'true')

        // If the controlling input, update aria-expanded
        if ($control.attr('aria-controls')) {
          $control.attr('aria-expanded', 'false')
        }
      }
    }



// Document ready

(function() {

  collapsibles();
  collapse();
})();
