import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Failure from '../Failure'

import {
  CourseItemRoute,
  CourseItemContainer,
  CourseImage,
  CourseNameAndDescription,
  CourseName,
  Description,
  LoaderContainer,
} from './styledComponents'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    courseItemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseItemDetails = () => {
    const {courseItemDetails} = this.state
    const {imageUrl, name, description} = courseItemDetails

    return (
      <CourseItemContainer>
        <CourseImage src={imageUrl} alt={name} />
        <CourseNameAndDescription>
          <CourseName>{name}</CourseName>
          <Description>{description}</Description>
        </CourseNameAndDescription>
      </CourseItemContainer>
    )
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="#4656a1" />
    </LoaderContainer>
  )

  refreshCourseItem = () => {
    this.getCourseItemDetails()
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItemDetails()
      case apiStatusConstants.failure:
        return <Failure refreshCourseItem={this.refreshCourseItem} />
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <CourseItemRoute>
        <Header />
        {this.renderResult()}
      </CourseItemRoute>
    )
  }
}

export default CourseItemDetails
