import {
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureText,
  RetryButton,
} from './styledComponents'

const Failure = props => {
  const {refreshCourseItem} = props

  const onRetryButton = () => {
    refreshCourseItem()
  }

  return (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <FailureHeading>Oops! Something Went Wrong</FailureHeading>
      <FailureText>We cannot seem to find the page you looking for</FailureText>
      <RetryButton type="button" onClick={onRetryButton}>
        Retry
      </RetryButton>
    </FailureContainer>
  )
}

export default Failure
