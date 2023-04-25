import React, { useState, useContext } from 'react'

import GistsTable from './gistsTable'
import UserSearch from './userSearch'

const GistsComponent = (props:any): JSX.Element => {
  const [gists, setGists] = useState<object | null>(null)
  const setDataCallback = (data:any) => { setGists(data) }

  return (
    <div>
      <UserSearch setDataCallback={setDataCallback} />
      <GistsTable gists={gists} />
      {/* TODO: Add isLoading component */}
    </div>
  )
}

export default GistsComponent
