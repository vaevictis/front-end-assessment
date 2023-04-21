import React, { useState, useEffect } from 'react'
import { Octokit } from 'octokit'
import TextField from '@mui/material/TextField'



export function GistsComponent(props:any) {
  const [data, setData] = useState<object | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const searchGists = (evt:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value)
  }

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_TOKEN
    })

    if (inputValue == '') { return }

    const fetchData = async ():Promise<any> => {
      const result = await octokit.request(`GET /users/{userName}/gists`, {
        userName: inputValue
      })
      const json = await result.data

      setData(json as object)
    }

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      fetchData()
        .catch(console.error)
    }, 500)

    return () => clearTimeout(timer)

  }, [inputValue])

  return (
    <div>
      <TextField fullWidth={true} onChange={searchGists} value={inputValue} />
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}
