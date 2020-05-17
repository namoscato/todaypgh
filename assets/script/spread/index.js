/* global $, btoa, ClipboardJS */
(function () {
  const form = $('#spread-form')
  const link = $('#spread-link')
  const linkBack = $('#spread-link-back')
  const linkInput = $('#spread-link-input')
  const linkClipboard = new ClipboardJS('#spread-link-button')

  form.submit(function (event) {
    event.preventDefault()

    linkInput.val(
      form.data('share-url') +
      '?r=' +
      encodeURIComponent(btoa(JSON.stringify({
        email: $('#email').val(),
        name: $('#name').val()
      })))
    )

    link.show()
    form.hide()
  })

  linkBack.click(function (event) {
    event.preventDefault()

    link.hide()
    form.show()
  })

  linkInput.click(function () {
    linkInput.select()
  })

  linkClipboard.on('success', function (event) {
    const linkButton = event.trigger

    linkButton.innerText = 'Copied link'

    setTimeout(function () {
      linkButton.innerText = 'Copy link'
    }, 2000)
  })
})()
