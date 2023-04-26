import React, { useState, useEffect, useRef } from 'react'
import { Octokit } from 'octokit'
import debounce from 'lodash/debounce'
import TextField from '@mui/material/TextField'

const UserSearch = (props:any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const {setDataCallback} = props
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
  })

  const handleChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(evt.currentTarget.value)
    setInputValue(evt.currentTarget.value)
  }

  const debouncedSearch = useRef(
    debounce(async (input) => {
      fetchData(input).catch(console.error)
    }, 500)
  ).current

  const fetchData = async (username:string):Promise<any> => {
    setIsLoading(true)
    const result = await octokit
      .paginate(octokit.rest.gists.listForUser, {
        username,
      })
      .then((gists) => {
        return gists
      })
      .catch((err) => {
        console.error(err)
      })

    setDataCallback(result)
    setIsLoading(false)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  if (isLoading) {
    return <h2>Loading Gists...</h2>
  }

  return (
    <TextField
      inputRef={input => input && input.focus()}
      sx={{ marginBottom: '20px' }}
      className={'search-field'}
      value={inputValue}
      InputProps={{inputProps: {style: {textAlign: 'center'}}}}
      fullWidth={true}
      onChange={handleChange} />
  )
}

export default UserSearch
