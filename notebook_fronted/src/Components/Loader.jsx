import React from 'react'
import { Triangle } from  'react-loader-spinner'

const Loader = () => {
  return (
    <div className="h-screen w-full grid content-center">
      <div className="my-auto mx-auto">
          <Triangle
              height="80"
              color="#1A202C"
              ariaLabel="triangle-loading"
              visible={true}
          />
      </div>
  </div>
  )
}

export default Loader