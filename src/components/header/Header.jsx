import React from 'react';
import './header.css'

export default function Header() {
  return (
    <section id="main-header" style={{backgroundImage: `url('/assets/background.jpg')`}}>
      <div className="header-wrapper">
        <div className="container-default header-container">
          <div className="heading">
            <h3 className="title">Trivia Questions game</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
