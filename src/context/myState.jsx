import React, { useState } from 'react'
import MyContext from './myContext'

export default function myState({children}) {
    const [loading , setLoading] = useState(false);
  return (
    <MyContext.Provider value={{
        loading , setLoading
    }}>
        {children}
        
      
    </MyContext.Provider>
  )
}
