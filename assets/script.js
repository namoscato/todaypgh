/* global $, ga */
$('[data-track-event]').click(function () {
  ga('send', 'event', 'Button', 'Click', $(this).data('track-event'))
})
