import React, { useState, useEffect } from 'react'
import { Octokit } from 'octokit'

import TableCell from '@mui/material/TableCell'

const ForksTableCell = (props:any): JSX.Element => {
  const { forksUrl } = props
  const [forks, setForks] = useState<object[] | null>(null)
  const [avatarUrls, setAvatarUrls] = useState<string[]>([''])

  useEffect(() => {
    // TODO: memoize octokit
    const octokit = new Octokit({
      // TODO: Auth key in there is not safe
      auth: process.env.REACT_APP_GITHUB_TOKEN
    })

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
          avatarUrls.map((url) => {
            {return (<img className="avatar" src={url} />)}
          })
        }
    </TableCell>
  )
}

export default ForksTableCell