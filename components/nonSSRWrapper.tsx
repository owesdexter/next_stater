import dynamic from 'next/dynamic'
import React from 'react'
const NonSSRWrapper = ({children}:any) => (
  <>
    {children}
  </>
)
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false
})