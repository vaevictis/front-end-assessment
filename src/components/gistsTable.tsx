import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const GistsTable = (props:any): JSX.Element => {
  const {gists} = props
  // debugger
  if (!gists) { return (<h2>No Gists</h2>) }

  let rows:any[] = []

  gists.forEach((gist:any) => {
    // debugger
      if (!gist) { return (<h2>No Gists</h2>) }

    console.log('description', gist?.description)
    rows.push(gist?.description)
    // Object.keys(gist.files).forEach(fileKey => {
    //   console.log('fileKey', fileKey)
    // })

    // filenames = gist.files.keys
    // return {filename: gist.files}
  })

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">File name</TableCell>
            <TableCell align="left">File type</TableCell>
            <TableCell align="left">Language</TableCell>
            <TableCell align="left">Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0 && rows.map((row) => (
            <TableRow
              key={row.description}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="left">rien</TableCell>
              <TableCell align="left">rien</TableCell>
              <TableCell align="left">rien</TableCell>
              <TableCell align="left">rien</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <p>{JSON.stringify(gists)}</p>
    </div>
  )
}

export default GistsTable
