import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/layout';
import Footer from "../../components/footer"

export default function BandaPost({ data, children }) {
    const image = getImage(data.mdx.frontmatter.hero_image);

    const breadcrumbs = [
        { title: 'Home', path: '/' },
        { title: 'Bandas', path: '/bandas' },
        { title: data.mdx.frontmatter.title, path: `/bandas/${data.mdx.frontmatter.slug}` },
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Box className="container" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', minHeight: '78vh' }}>
                <Box sx={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
                    <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                        {data.mdx.frontmatter.title}
                    </Typography>
                    <GatsbyImage
                        image={image}
                        alt={data.mdx.frontmatter.hero_image_alt}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            marginBottom: '16px',
                            objectFit: 'cover',
                            objectPosition: 'top'
                        }}
                    />
                    <Typography variant="h5" component="h5" sx={{ textAlign: 'left', fontSize: '1.5rem' }}>
                        {children}
                    </Typography>
                </Box>
            </Box>
            <Footer />
        </Layout>
    );
}

export const query = graphql`
    query($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                slug
                hero_image_alt
                hero_image {
                    childImageSharp {
                        gatsbyImageData(
                            width: 600
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
            }
        }
    }
`;

export const Head = ({ data }) => <title>{data.mdx.frontmatter.title}</title>;