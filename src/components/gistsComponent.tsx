import React, { useState, useEffect } from 'react';
import { Octokit } from 'octokit'

interface UserName {
  userName: string
}

export function GistsComponent(props:UserName) {
  const [data, setData] = useState<object | null>(null)
  const { userName } = props

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await octokit.request(`GET /users/{userName}/gists`, {
        userName: userName
      })
      const json = await result.data

      setData(json as object)
    }

    fetchData()
      .catch(console.error)
  }, [])

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}
