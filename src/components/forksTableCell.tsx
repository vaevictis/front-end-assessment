import React, { useState, useEffect } from 'react'
import { Octokit } from 'octokit'

import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
})

type Avatar = {
  forkUrl: string,
  avatarUrl: string,
  login: string
}

const ForksTableCell = (props:any): JSX.Element => {
  const { forksUrl } = props
  const [forks, setForks] = useState<object[] | null>(null)
  const [avatars, setAvatars] = useState<Avatar[]>([])

  useEffect(() => {
    const fetchData = async ():Promise<any> => {
      const result = await octokit.request(`GET ${forksUrl}`, {
        forksUrl: forksUrl,
        per_page: 3
      })

      const json = await result.data
      setForks(json as object[])
    }

    fetchData()
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!forks) {return}

    extractAvatarData(forks)
  }, [forks])

  const extractAvatarData = (forks:any[]) :void => {
    const avatarData: Avatar[] = []
    // debugger
    forks.forEach((fork:any) :void => {
      avatarData.push({
        avatarUrl: fork.owner.avatar_url,
        forkUrl: fork.html_url,
        login: fork.owner.login
      })
    })

    setAvatars(avatarData)
  }
  if (!avatars) {
    return (<TableCell align="left">No Forks yet</TableCell>)
  }

  return (
    <TableCell align="left">
      <Stack>
        {avatars.map((avatar, idx) => (
          <span key={`avatar_${idx}`}>
            <a href={avatar.forkUrl} target="_blank">
              <img className="avatar" src={avatar.avatarUrl} />
            </a>
            <span> {avatar.login}</span>
          </span>
        ))}
      </Stack>
    </TableCell>
  )
}

export default ForksTableCell
