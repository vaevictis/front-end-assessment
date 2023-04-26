import React from 'react'
import TableCell from '@mui/material/TableCell'

const FilesTableCell = (props:any): JSX.Element => {
  const { fileTypes } = props
  return (
    <TableCell align="left">
      {new Array(...fileTypes).join(', ')}
    </TableCell>
  )
}

export default FilesTableCell
