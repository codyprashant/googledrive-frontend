import React from 'react';
import LoadingOverlay from 'react-loading-overlay'

 
export default function MyLoader({ active, children }) {
  return (
    <LoadingOverlay active={active}  spinner >
      {children}
    </LoadingOverlay>
  )
}