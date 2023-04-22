import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const GistsTable = (props:any): JSX.Element => {
  const {gists} = props
  if (!gists) { return (<h2>No Gists</h2>) }

  let rows:any[] = []

  gists.forEach((gist:any) => {
      if (!gist) { return (<h2>No Gists</h2>) }

    rows.push({
      description: gist.description,
      fileTypes: extractFileTypes(gist)
    })
  })

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">File types</TableCell>
            <TableCell align="left">Language</TableCell>
            <TableCell align="left">Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0 && rows.map((row, idx) => (
            <TableRow
              key={`gist_elm_${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="left">{row.fileTypes}</TableCell>
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

const extractFileTypes = (gist:any) :string[] => {
  let files:string[] = []
  let fileTypes:string[] = []
  let filesList:any = gist.files

  Object.keys(gist.files).forEach((fileKey:string) :void => {
    files.push(filesList[fileKey])
  })
  files.forEach((file:any) => {
    fileTypes.push(file.language)
  })

  return fileTypes
}



export default GistsTable
