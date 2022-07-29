import React from 'react'
import { Container} from "@mui/material";

import './body.css'

export default function Body({ children }) {

  return (
    <section id="main-body">
        <div className="body-wrapper">
          <Container className="main-body-container">
            <div className="container-default">
              {children}
            </div>
          </Container>
        </div>
    </section>
  )
}
