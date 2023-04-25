import React, { useState, useEffect, useRef } from 'react'
import { Octokit } from 'octokit'
import debounce from 'lodash/debounce'
import TextField from '@mui/material/TextField'

const UserSearch = (props:any): JSX.Element => {
  const {setDataCallback} = props
  const octokit = new Octokit()

  const handleChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(evt.currentTarget.value)
  }

  const debouncedSearch = useRef(
    debounce(async (input) => {
      fetchData(input).catch(console.error)
    }, 500)
  ).current

  const fetchData = async (input:string):Promise<any> => {
    // TODO: Paginate (right now I'm just getting 30 first results)
    const result = await octokit.request(`GET /users/{userName}/gists`, {
      userName: input
    })
    const json = await result.data
    setDataCallback(json)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <TextField fullWidth={true} onChange={handleChange} />
  )
}

export default UserSearch
