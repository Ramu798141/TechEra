import styled from 'styled-components'

export const FailureContainer = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
`

export const FailureImage = styled.img`
  width: 35%;
`

export const FailureHeading = styled.h1`
  color: #1e293b;
  font-size: 37px;
  font-weight: 600;
  margin-bottom: 0px;
  margin-top: 40px;
`

export const FailureText = styled.p`
  color: #64748b;
  font-size: 17px;
  font-weight: 500;
`

export const RetryButton = styled.button`
  background-color: #4656a1;
  height: 35px;
  width: 80px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-width: 0px;
  border-radius: 5px;
  outline: none;
`
