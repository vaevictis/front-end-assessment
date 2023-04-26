import React, { useState, useEffect } from 'react'
import { Octokit } from 'octokit'

import TableCell from '@mui/material/TableCell'

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
})

type Avatar = {
  url: string,
  avatarUrl: string
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

    forks.forEach((fork:any) :void => {
      avatarData.push({
        avatarUrl: fork.owner.avatar_url,
        url: fork.owner.html_url
      })
    })

    setAvatars(avatarData)
  }
  if (!avatars) {
    return (<TableCell align="left">No Forks yet</TableCell>)
  }

  return (
    <TableCell align="left">
        {avatars.map((avatar, idx) => (
          <a key={`avatar_img_${idx}`} href={avatar.url} target="_blank">
            <img className="avatar" src={avatar.avatarUrl} />
          </a>
        ))}
    </TableCell>
  )
}

export default ForksTableCell
