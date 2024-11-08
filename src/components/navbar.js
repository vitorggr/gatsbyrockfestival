import React, { useEffect } from "react";
import { Link, useStaticQuery, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import M from 'materialize-css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./materialize.css";

export default function Navbar() {

  useEffect(() => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      },
      logo: file(relativePath: { eq: "logo.PNG" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `);

  const logo = getImage(data.logo.childImageSharp.gatsbyImageData).images.fallback.src;

  return (
    <>
      <div className="navbar-fixed">
        <nav className="black" role="navigation">
          <div className="nav-wrapper">
            <ul className="left">
              <li><img id="logo-container" className="brand-logo responsive-img" alt={data.site.siteMetadata.title} src={logo} /></li>
            </ul>
            <a href="#" data-target="mobile-menu" className="sidenav-trigger right">
              <IconButton
                edge="end"
                color="inherit"
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              >
                <MenuIcon />
              </IconButton>
            </a>
            <div id="navbar">
              <ul className="right hide-on-med-and-down">
                <li className="active"><Link to="/">Início</Link></li>
                <li className="active"><Link to="/bandas">Bandas</Link></li>
                <li className="active"><Link to="/inscricao">Inscrição</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-menu">
        <li className="active"><Link to="/">Início</Link></li>
        <li className="active"><Link to="/bandas">Bandas</Link></li>
        <li className="active"><Link to="/inscricao">Inscrição</Link></li>
      </ul>
    </>
  );
}
