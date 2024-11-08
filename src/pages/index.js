import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Parallax } from "react-parallax";
import { getImage } from 'gatsby-plugin-image';
import Footer from "../components/footer";
import { Container, Typography, Button, Box } from '@mui/material';
import Layout from '../components/layout';
import "../components/materialize.css";
import { Link } from 'gatsby';

export default function IndexPage({ children }) {
  const data = useStaticQuery(graphql`
    query {
      guitar: file(relativePath: { eq: "guitar.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, height: 1080, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
      solo: file(relativePath: { eq: "solo.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, height: 1080, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `);

  const guitarImage = getImage(data.guitar.childImageSharp.gatsbyImageData).images.fallback.src;
  const soloImage = getImage(data.solo.childImageSharp.gatsbyImageData).images.fallback.src;

  return (
    <Layout>
      <Parallax bgImage={guitarImage} className="responsive-img" strength={600}>
        <div style={{ height: 280 }}>
          <h1 style={{ textAlign: "center", color: "#fff", paddingTop: 200 }}></h1>
        </div>
      </Parallax>

      <Container className="container">
        <Box component="section" id="section" className="section">
          <Container id="content" className="section">
            <Typography variant="h2" gutterBottom className="header">
              Gatsby Rock Festival
            </Typography>
            <Typography variant="h5" gutterBottom className="flow-text">
              Traga a sua banda para participar do maior festival de Rock do estado. São três noites de música com bandas de garagem tentando criar seu espaço, além de grandes shows com nomes consagrados nacionalmente.
            </Typography>
            <br/><br/>
            <Box mt={5}>
              <Typography variant="h3" component="div">
                <i className="mdi-content-send brown-text"></i>
              </Typography>
              <Typography variant="h6" align="right" paragraph className="right-align light">
                Faça já sua inscrição e coloque a sua banda para tocar
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                component={Link}
                to="/inscricao"
                className="btn-large waves-effect waves-light red">
                QUERO ME INSCREVER
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>

      <Parallax bgImage={soloImage} className="responsive-img" strength={600}>
        <div style={{ height: 280 }}>
          <h1 style={{ textAlign: "center", color: "#fff", paddingTop: 230 }}>
            <Footer />
          </h1>
        </div>
      </Parallax>
    </Layout>
  );
}

export const Head = () => <title>Home - Gatsby Rock Festival</title>;
