import React from 'react';
import { Link } from 'gatsby';
import { Box, Breadcrumbs, Typography } from '@mui/material';

const Breadcrumb = ({ breadcrumbs }) => {
    return (
        <Box sx={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '4px', marginBottom: '16px' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', fontSize: '0.875rem', marginBottom: '8px', height: '20px' }}>
                {breadcrumbs.map((breadcrumb, index) => {
                    if (index === breadcrumbs.length - 1) {
                        return (
                            <Typography key={index} color="text.primary">
                                {breadcrumb.title}
                            </Typography>
                        );
                    }
                    return (
                        <Link key={index} to={breadcrumb.path}>
                            <Typography key={index} color="text.secondary">
                                {breadcrumb.title}
                            </Typography>
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
};

export default Breadcrumb;