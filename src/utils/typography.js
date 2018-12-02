import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

delete Wordpress2016.googleFonts

// Wordpress2016.headerFontFamily= ['Lato', 'sans-serif'];
// Wordpress2016.bodyFontFamily= ['Lato', 'san-serif'];
Wordpress2016.headerFontFamily = ['Lato', 'sans-serif']
Wordpress2016.bodyFontFamily = ['Lato', 'san-serif']
const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale