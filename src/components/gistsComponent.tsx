import React, { useState, useEffect} from 'react'

import GistsTable from './gistsTable'
import UserSearch from './userSearch'

const GistsComponent = (props:any): JSX.Element => {
  const [gists, setGists] = useState<object | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const setDataCallback = (data:any) => { setGists(data) }

  useEffect(() => {
    if (gists) {
      setIsLoading(true)
    }
  }, [gists])

  return (
    <div>
      <UserSearch setDataCallback={setDataCallback} />
      {isLoading ?
        <GistsTable gists={gists} /> :
        <h2>Search a Github username...</h2>}
    </div>
  )
}

export default GistsComponent
