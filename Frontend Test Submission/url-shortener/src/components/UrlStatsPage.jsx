import React from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

// Sample data for demo
const mockStats = [
  {
    originalUrl: 'https://www.example.com/long-url-1',
    shortUrl: 'http://short.ly/abc123',
    expiry: '2025-08-01 10:00 AM',
    clicks: 12
  },
  {
    originalUrl: 'https://www.test.com/page',
    shortUrl: 'http://short.ly/test22',
    expiry: '2025-08-15 5:00 PM',
    clicks: 5
  }
];

const UrlStatsPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Statistics
      </Typography>
      <Grid container spacing={3}>
        {mockStats.map((url, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Original URL:</Typography>
                <Typography variant="body2" color="textSecondary">
                  {url.originalUrl}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Shortened URL:</Typography>
                <Typography variant="body2" color="primary">
                  {url.shortUrl}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Expiry:</Typography>
                <Typography variant="body2" color="textSecondary">
                  {url.expiry}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Clicks:</Typography>
                <Typography variant="body2" color="textSecondary">
                  {url.clicks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UrlStatsPage;