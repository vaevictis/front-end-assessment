import React from 'react'
import TableCell from '@mui/material/TableCell'
import Chip from '@mui/material/Chip'

const FilesTableCell = (props:any): JSX.Element => {
  const { fileTypes } = props
  const massagedFileTypes: string[] = new Array(...fileTypes)

  if (massagedFileTypes.length === 0) {
    return (<span>No file types</span>)
  }
  return (
    <TableCell align="left">
      {massagedFileTypes.map((fileType, idx) => (
        <Chip key={`filetype_${idx}`} sx={{ marginRight: '1em' }} label={fileType} variant='outlined' />
      ))}
    </TableCell>
  )
}

export default FilesTableCell
