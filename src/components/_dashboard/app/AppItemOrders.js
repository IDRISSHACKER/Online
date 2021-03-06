import { Icon } from '@iconify/react';
import shoppingCartOutline from '@iconify/icons-ant-design/shopping-cart-outline';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber, sizeNewCommande } from '../../../utils/formatNumber';
import { ShoppingBagRounded } from '@mui/icons-material';
import { useReducer, useSelector } from 'react-redux';
import { usersReducer } from 'src/reducers/user.reducer';
import { isEmpty } from 'src/utils/isEmpty';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceInUp } from 'src/components/animate';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppItemOrders() {
  const commandes = useSelector(state => state.commandeReducer)
  return (
    <MotionContainer initial="initial" open>
      <motion.div variants={varBounceInUp}>
        <RootStyle>
          <IconWrapperStyle>
            <Icon icon={shoppingCartOutline} width={34} height={34} />
          </IconWrapperStyle>
          <Typography variant="h3">{!isEmpty(commandes) && fShortenNumber(sizeNewCommande(commandes))}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Commandes
          </Typography>
        </RootStyle>
      </motion.div>
    </MotionContainer>
  );
}
