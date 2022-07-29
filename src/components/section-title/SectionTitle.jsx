import React from 'react'
import { Grid, Box } from '@mui/material'

import './section-title.css'

export default function SectionTitle({children}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Box className="button-box">
          <div className="title-container w100">
            <span className="button-text">{children}</span>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}
