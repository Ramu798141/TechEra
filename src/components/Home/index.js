import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Failure from '../Failure'

import {
  HomeRoute,
  HomeContainer,
  Heading,
  CoursesItemsContainer,
  CourseItem,
  CourseLogo,
  Name,
  LoaderContainer,
} from './styledComponents'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseItems = () => {
    const {coursesList} = this.state

    return (
      <>
        <Heading>Courses</Heading>
        <CoursesItemsContainer>
          {coursesList.map(eachCourse => {
            const {id, name, logoUrl} = eachCourse

            return (
              <Link to={`/courses/${id}`} className="nav-link">
                <CourseItem key={id}>
                  <CourseLogo src={logoUrl} alt={name} />
                  <Name>{name}</Name>
                </CourseItem>
              </Link>
            )
          })}
        </CoursesItemsContainer>
      </>
    )
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="#4656a1" />
    </LoaderContainer>
  )

  refreshCourseItem = () => {
    this.getCoursesDetails()
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItems()
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
      <HomeRoute>
        <Header />
        <HomeContainer>{this.renderResult()}</HomeContainer>
      </HomeRoute>
    )
  }
}

export default Home
