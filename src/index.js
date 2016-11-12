import raf from 'raf'

const easeInOutQuint = (t, b, _c, d) => {
  const c = _c - b

  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t * t + b
  } else {
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  }
}

const init = ({
  className = 'js-tinyscroll',
  duration = 2000,
  ease = easeInOutQuint
} = {}) => {
  const els = [ ...document.querySelectorAll(`.${className}`) ]

  els.map(el => {
    const href = el.getAttribute('href')

    if (href && href.indexOf('#') === 0) {
      const id = href.substring(1)
      const target = document.getElementById(id)

      el.addEventListener('click', e => {
        e.preventDefault()

        const begin = document.body.scrollTop
        const end = begin + target.getBoundingClientRect().top
        const startTime = Date.now()

        const scroll = () => {
          const now = Date.now()
          const time = now - startTime

          if (time < duration) {
            document.body.scrollTop = ease(time, begin, end, duration)
            raf(scroll)
          } else {
            document.body.scrollTop = end
          }
        }

        raf(scroll)
      })
    }
  })
}

export default init