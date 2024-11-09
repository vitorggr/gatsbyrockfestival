import React, { useState } from 'react';
import Layout from '../components/layout';
import Footer from "../components/footer";
import { Box, Grid2, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ReactPaginate from 'react-paginate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function BandasPage() {
    const data = useStaticQuery(graphql`
        query {
            allMdx(sort: {frontmatter: {title: DESC}}) {
                nodes {
                    frontmatter {
                        title
                        slug
                        hero_image_alt
                        hero_image {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 400
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                    id
                    excerpt
                }
            }      
        }`
    );

    const ITEMS_PER_PAGE = 9;
    const items = data.allMdx.nodes;
    const [currentPage, setCurrentPage] = useState(0);

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = items.slice(startIndex, endIndex);

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <Layout >
            <Box className="container" sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '85vh', 
            }}>
                <Box className="main">
                    <Box className="section" id="section">
                        <Grid2 container spacing={4}>
                            {currentItems.map((item) => {
                                const image = getImage(item.frontmatter.hero_image.childImageSharp);

                                return (
                                    <Grid2 xs={12} sm={6} lg={4} key={item.id}>
                                        <Card>
                                            <CardMedia>
                                                <GatsbyImage
                                                    className="imagem responsive-img"
                                                    image={image}
                                                    alt={item.frontmatter.hero_image_alt}
                                                    style={{
                                                        height: 250,
                                                        width: '100%',
                                                        objectPosition: 'top'
                                                    }}
                                                />
                                            </CardMedia>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {item.frontmatter.title}
                                                </Typography>
                                                <Link to={`/bandas/${item.frontmatter.slug}`}>
                                                    Saiba mais
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                );
                            })}
                        </Grid2>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <ReactPaginate
                                breakLabel={<MoreHorizIcon />}
                                nextLabel={<ArrowForwardIcon />}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={Math.ceil(items.length / ITEMS_PER_PAGE)}
                                previousLabel={<ArrowBackIcon />}
                                renderOnZeroPageCount={null}
                                containerClassName="pagination"
                                pageLinkClassName="page-link"
                                previousLinkClassName="page-link"
                                nextLinkClassName="page-link"
                                activeLinkClassName="active"
                                disabledLinkClassName="disabled"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Layout>
    );
}

export const Head = () => <title>Bandas - Gatsby Rock Festival</title>;