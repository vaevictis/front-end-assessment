import React, { useState, useEffect } from 'react'
import { Octokit } from 'octokit'

import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
})

type Forker = {
  forkUrl: string,
  avatarUrl: string,
  login: string
}

const ForksTableCell = (props:any): JSX.Element => {
  const { forksUrl } = props
  const [forks, setForks] = useState<object[] | null>(null)
  const [forkers, setForkers] = useState<Forker[]>([])

  // FIXME: This would quickly become a bottleneck.
  // I end up looping and making an extra API request for every gist
  // after I'm fetching the paginated gists.
  // This is a clear n+1 problem.

  useEffect(() => {
    // TODO: migrate to the integrated Octokit syntax
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
  }, [forksUrl])

  useEffect(() => {
    if (!forks) {return}

    extractForkerData(forks)
  }, [forks])

  const extractForkerData = (forks:any[]) :void => {
    const forkerData: Forker[] = []
    forks.forEach((fork:any) :void => {
      forkerData.push({
        avatarUrl: fork.owner.avatar_url,
        forkUrl: fork.html_url,
        login: fork.owner.login
      })
    })

    setForkers(forkerData)
  }
  if (!forkers) {
    return (<TableCell align="left">No Forks yet</TableCell>)
  }

  return (
    <TableCell align="left">
      <Stack>
        {forkers.map((forker, idx) => (
          <span key={`forker_${idx}`}>
            <a href={forker.forkUrl} target="_blank" rel="noreferrer">
              <img className="avatar" alt="forker's avatar" src={forker.avatarUrl} />
            </a>
            <span> {forker.login}</span>
          </span>
        ))}
      </Stack>
    </TableCell>
  )
}

export default ForksTableCell
