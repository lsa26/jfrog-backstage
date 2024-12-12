import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Encrypt the access token library
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
} from '@backstage/core-components';
import JfrogLogo from './jfrog.png';
import styles from './ExampleComponent.module.css';

const SECRET_KEY = 'your-secret-key'; // Replace with a secret key more robust if you want (encryption of your token process)

export const ExampleComponent = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [jfrogUrl, setJfrogUrl] = useState('');
  const [jfrogToken, setJfrogToken] = useState('');
  const [scriptToExecute, setScriptToExecute] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Save token in a local storage
  const saveConfiguration = () => {
    const encryptedUrl = CryptoJS.AES.encrypt(jfrogUrl, SECRET_KEY).toString();
    const encryptedToken = CryptoJS.AES.encrypt(jfrogToken, SECRET_KEY).toString();
    localStorage.setItem('jfrogUrl', encryptedUrl);
    localStorage.setItem('jfrogToken', encryptedToken);
    setOpen(false);
  };

  // Load token from the local storage
  useEffect(() => {
    const storedUrl = localStorage.getItem('jfrogUrl');
    const storedToken = localStorage.getItem('jfrogToken');
    if (storedUrl && storedToken) {
      try {
        const decryptedUrl = CryptoJS.AES.decrypt(storedUrl, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const decryptedToken = CryptoJS.AES.decrypt(storedToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        setJfrogUrl(decryptedUrl);
        setJfrogToken(decryptedToken);
      } catch (error) {
        console.error('Error decrypting data:', error);
      }
    }
  }, []);

  const executeScript = async (scriptName: string) => {
    try {
      console.log('Executing script:', scriptName);
      console.log('JFrog URL:', jfrogUrl);
      console.log('Access Token:', jfrogToken);

      if (scriptName === 'create.sh') {
        setIsCreating(true);
      } else if (scriptName === 'delete.sh') {
        setIsDeleting(true);
      }

      const response = await fetch('http://localhost:8888/api/execute-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scriptName,
          jfrogUrl,
          jfrogAccessToken: jfrogToken,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error executing script:', data.error);
        alert(`Error executing script: ${data.error || 'Unknown error'}`);
      } else {
        alert(`Script executed successfully: ${data.output}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Fetch error: ${error.message}`);
    } finally {
      if (scriptName === 'create.sh') {
        setIsCreating(false);
      } else if (scriptName === 'delete.sh') {
        setIsDeleting(false);
      }
    }
  };

  const handleClose = () => setOpen(false);
  const openDialog = () => setOpen(true);

  const handleConfirmOpen = (scriptName: string) => {
    setScriptToExecute(scriptName);
    setConfirmOpen(true);
  };

  const handleConfirmClose = (shouldExecute: boolean) => {
    if (shouldExecute) {
      executeScript(scriptToExecute);
    }
    setConfirmOpen(false);
  };

  return (
    <div className={styles.page}>
      <Page themeId="tool">
        <Header title="Welcome to JFrog!" subtitle="Automate Your Configuration Management">
          <HeaderLabel label="Owner" value="SolEng" />
          <HeaderLabel label="Lifecycle" value="Prod" />
          <img src={JfrogLogo} alt="JFrog Logo" style={{ width: '100px', margin: '20px 0' }} />
        </Header>
        <Content>
          <ContentHeader title="Your JFrog Management Plugin">
            <div className={styles.supportButton}>
              <Button variant="contained" onClick={openDialog}>
                Control your JFrog platform and automate configurations with ease.
              </Button>
            </div>
          </ContentHeader>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <InfoCard>
                <div className={styles.centerContent}>
                  <Typography variant="h6" className={styles.cardTitle}>
                    Create Repositories
                  </Typography>
                  <Typography variant="body1" className={styles.cardDescription}>
                    Create all repositories on your JFrog platform.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={styles.cardButton}
                    onClick={() => handleConfirmOpen('create.sh')}
                    disabled={isCreating}
                  >
                    {isCreating ? 'In Progress...' : 'Create Repositories'}
                  </Button>
                </div>
              </InfoCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoCard>
                <div className={styles.centerContent}>
                  <Typography variant="h6" className={styles.cardTitle}>
                    Delete All Repositories
                  </Typography>
                  <Typography variant="body1" className={styles.cardDescription}>
                    Delete all repositories from your JFrog platform.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={styles.cardButton}
                    onClick={() => handleConfirmOpen('delete.sh')}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'In Progress...' : 'Delete Repositories'}
                  </Button>
                </div>
              </InfoCard>
            </Grid>
          </Grid>
        </Content>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter JFrog Configuration</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the JFrog URL and Access Token to save them for future use.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="JFrog URL"
              type="url"
              fullWidth
              value={jfrogUrl}
              onChange={(e) => setJfrogUrl(e.target.value)}
            />
            <TextField
              margin="dense"
              label="JFrog Access Token"
              type="password"
              fullWidth
              value={jfrogToken}
              onChange={(e) => setJfrogToken(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={saveConfiguration} color="primary">
              Save Configuration
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={() => handleConfirmClose(false)}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to execute this script?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmClose(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleConfirmClose(true)} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </div>
  );
};

