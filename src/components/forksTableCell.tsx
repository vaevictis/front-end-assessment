import React, { useState, useEffect } from 'react'
import { Octokit } from 'octokit'

import TableCell from '@mui/material/TableCell'

const octokit = new Octokit()

const ForksTableCell = (props:any): JSX.Element => {
  const { forksUrl } = props
  const [forks, setForks] = useState<object[] | null>(null)
  const [avatarUrls, setAvatarUrls] = useState<string[]>([''])

  useEffect(() => {
    const fetchData = async ():Promise<any> => {
      const result = await octokit.request(`GET ${forksUrl}`, {
        forksUrl: forksUrl,
        per_page: 3
      })
      // TODO: try without passing var in param object

      const json = await result.data
      // debugger
      setForks(json as object[])
    }

    fetchData()
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!forks) {return}
    extractAvatarUrls(forks)
  }, [forks])

  const extractAvatarUrls = (forks:any[]) :void => {
    const avatarUrls:string[] = []

    forks.forEach((fork:any) :void => {
      avatarUrls.push(fork.owner.avatar_url)
    })

    setAvatarUrls(avatarUrls)
  }
  if (!avatarUrls) {
    return (<TableCell align="left">No Forks yet</TableCell>)
  }

  return (
    <TableCell align="left">
        {
          avatarUrls.map((url, idx) => {
            {return (<img  key={`avatar_img_${idx}`} className="avatar" src={url} />)}
          })
        }
    </TableCell>
  )
}

export default ForksTableCell
