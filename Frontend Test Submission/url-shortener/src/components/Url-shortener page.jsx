import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import { logEvent } from '../utils/logger';
import { isValidUrl } from '../utils/validators';

export default function ShortLinkCreator() {
  const [links, setLinks] = useState([{ longUrl: '', ttl: 30, alias: '' }]);
  const [output, setOutput] = useState([]);
  const [msg, setMsg] = useState('');

  const updateField = (idx, key, value) => {
    const clone = [...links];
    clone[idx][key] = key === 'ttl' ? value.replace(/[^0-9]/g, '') : value;
    setLinks(clone);
  };

  const appendLinkInput = () => {
    if (links.length < 5) {
      setLinks([...links, { longUrl: '', ttl: 30, alias: '' }]);
    }
  };

  const createAlias = () => Math.random().toString(36).substring(2, 8);

  const processShortening = () => {
    setMsg('');
    const results = [];

    for (let i = 0; i < links.length; i++) {
      const { longUrl, ttl, alias } = links[i];
      if (!longUrl.trim()) {
        setMsg(`Link #${i + 1} is empty.`);
        return;
      }

      if (!isValidUrl(longUrl)) {
        setMsg(`Invalid URL at entry #${i + 1}: ${longUrl}`);
        return;
      }

      const code = alias.trim() || createAlias();
      const expiry = new Date(Date.now() + (parseInt(ttl) || 30) * 60000);

      results.push({
        originalUrl: longUrl,
        shortUrl: `http://sho.rt/${code}`,
        expiresAt: expiry.toLocaleString(),
      });
    }

    setOutput(results);
    logEvent('Shortening completed');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Create Short Links</Typography>

      {links.map((item, index) => (
        <Box key={index} mb={3}>
          <Divider textAlign="left" sx={{ mb: 2 }}>Link #{index + 1}</Divider>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Full URL"
                value={item.longUrl}
                onChange={(e) => updateField(index, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Validity (mins)"
                type="number"
                inputProps={{ min: 1, max: 9999 }}
                value={item.ttl}
                onChange={(e) => updateField(index, 'ttl', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={8}>
              <TextField
                label="Custom Alias (optional)"
                value={item.alias}
                onChange={(e) => updateField(index, 'alias', e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box mb={2}>
        {links.length < 5 && (
          <Button variant="outlined" onClick={appendLinkInput}>
            Add More URLs
          </Button>
        )}
        <Button
          variant="contained"
          onClick={processShortening}
          sx={{ ml: 2 }}
        >
          Generate Short Links
        </Button>
      </Box>

      {msg && <Alert severity="error" sx={{ mb: 3 }}>{msg}</Alert>}

      {output.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>Shortened Links</Typography>
          {output.map((res, idx) => (
            <Box key={idx} mb={2} p={2} sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}>
              <Typography><strong>Original:</strong> {res.originalUrl}</Typography>
              <Typography><strong>Short Link:</strong> <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a></Typography>
              <Typography><strong>Expires:</strong> {res.expiresAt}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
