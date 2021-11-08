import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <RootStyle title="Page Introuvable">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 580, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Desolé page Introuvable,!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              La page que vouz essayer d'atteindre est introuvable ou à été suprimer par l'administrateur systeme.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Retourner au store
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
