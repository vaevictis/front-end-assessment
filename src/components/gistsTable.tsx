import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import ForksTableCell from './forksTableCell'
import FilesTableCell from './filesTableCell'

const extractFileTypes = (gist:any) :Set<string> => {
  let files:string[] = []
  let fileTypes:string[] = []
  let filesList:any = gist.files

  Object.keys(gist.files).forEach((fileKey:string) :void => {
    files.push(filesList[fileKey])
  })
  files.forEach((file:any) => {
    fileTypes.push(file.language)
  })

  let distinctFileTypes = new Set<string>(fileTypes)
  return distinctFileTypes
}

const GistsTable = (props:any): JSX.Element => {
  const {gists} = props
  if (!gists) { return (<h2>No gists</h2>) }

  let rows:any[] = []

  gists.forEach((gist:any) => {
    rows.push({
      description: gist.description,
      fileTypes: extractFileTypes(gist),
      forksUrl: gist.forks_url
    })
  })

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Language</TableCell>
            <TableCell align="left">Last 3 forks by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0 && rows.map((row, idx) => (
            <TableRow
              key={`gist_elm_${idx}`}
            >
              <TableCell component="th" scope="row">{row.description}</TableCell>
              <FilesTableCell fileTypes={row.fileTypes} />
              <ForksTableCell forksUrl={row.forksUrl} />
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GistsTable
