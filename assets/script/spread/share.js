/* global $, atob, ga */
;(function () {
  let referrer = getUrlParam('r')

  if (!referrer) {
    return
  }

  referrer = JSON.parse(atob(referrer))

  const paramParts = []
  const referrerEmail = referrer.email
  const referrerName = referrer.name

  if (referrerName) {
    $('#text-referrer-name').text(referrerName)

    paramParts.push(referrerName)
  }

  if (referrerEmail) {
    paramParts.push(referrerEmail)
  }

  if (paramParts.length) {
    const shareLink = $('a[data-share-your-story]')

    shareLink.attr(
      'href',
      shareLink.data('prefilled-url') +
        encodeURIComponent(paramParts.join(' - '))
    )

    ga('set', {
      campaignSource: referrerEmail || referrerName,
      campaignMedium: referrer.medium,
      campaignName: 'spread-the-love'
    })
  }

  function getUrlParam (name) {
    const params = window.location.search.substring(1).split('&')
    let paramParts
    let i

    for (i = 0; i < params.length; i++) {
      paramParts = params[i].split('=')

      if (paramParts[0] === name) {
        return undefined === paramParts[1]
          ? null
          : decodeURIComponent(paramParts[1])
      }
    }
  }
})()
