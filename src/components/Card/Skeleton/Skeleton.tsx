import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={565}
    height={221}
    viewBox="0 0 565 221"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="502" height="211" />
  </ContentLoader>
)

export default Skeleton
