import 'typeface-lato'
import 'prismjs/themes/prism-tomorrow.css'
import './src/styles/global.scss'

export const onServiceWorkerUpdateFound = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
