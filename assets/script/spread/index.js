/* global $, ClipboardJS, ga */
;(function () {
  const form = $('#spread-form')
  const link = $('#spread-link')
  const linkBack = $('#spread-link-back')
  const linkClipboard = new ClipboardJS('#spread-link-button')
  const linkInput = $('#spread-link-input')
  const shareUrl = form.data('share-url')
  const shareUrlEncoded = encodeURIComponent(shareUrl)
  const socialLinks = $('[data-share-social]')

  let referrerEmail
  let referrerName

  form.submit(function (event) {
    event.preventDefault()

    referrerEmail = $('#email').val()
    referrerName = $('#name').val()

    linkInput.val(getReferrerUrl('link'))

    socialLinks.each(function () {
      const me = $(this)

      me.attr(
        'href',
        me
          .attr('href')
          .replace(
            shareUrlEncoded,
            encodeURIComponent(getReferrerUrl(me.data('share-social')))
          )
      )
    })

    link.show()
    form.hide()

    trackEvent('Submit', referrerEmail)
  })

  linkBack.click(function (event) {
    event.preventDefault()

    link.hide()
    form.show()

    trackEvent('Back')
  })

  linkInput.click(function () {
    linkInput.select()

    trackEvent('Share', 'select')
  })

  linkClipboard.on('success', function (event) {
    const linkButton = event.trigger

    linkButton.innerText = 'Copied link'

    setTimeout(function () {
      linkButton.innerText = 'Copy link'
    }, 2000)

    trackEvent('Share', 'copy')
  })

  socialLinks.click(function () {
    trackEvent('Share', $(this).data('share-social'))
  })

  function getReferrerUrl(medium) {
    return (
      shareUrl +
      '?r=' +
      encodeURIComponent(
        btoa(
          JSON.stringify({
            email: referrerEmail,
            name: referrerName,
            medium: medium,
          })
        )
      )
    )
  }

  function trackEvent(action, label) {
    ga('send', 'event', 'Spread', action, label)
  }
})()
