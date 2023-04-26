import Header from '../Header'

import {
  NotFoundRoute,
  NotFoundContainer,
  NotFoundImage,
  Heading,
  Text,
} from './styledComponents'

const NotFound = () => (
  <NotFoundRoute>
    <Header />
    <NotFoundContainer>
      <NotFoundImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <Heading>Page Not Found</Heading>
      <Text>We are sorry, the page you requested could not found</Text>
    </NotFoundContainer>
  </NotFoundRoute>
)

export default NotFound
