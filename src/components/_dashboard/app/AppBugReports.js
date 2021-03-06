import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import creditCardTwotone from '@iconify/icons-ant-design/credit-card-twotone';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fCurrency, fFcfa, sumAccountAdmin } from '../../../utils/formatNumber';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn, varBounceInDown } from 'src/components/animate';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------



export default function AppBugReports() {

  const commandes = useSelector(state => state.commandeReducer)
  return (
    <MotionContainer initial="initial" open>
      <motion.div variants={varBounceInDown}>
        <RootStyle>
          <IconWrapperStyle>
            <Icon icon={creditCardTwotone} width={34} height={34} />
          </IconWrapperStyle>
          <Typography variant="h3">{fFcfa(fCurrency(sumAccountAdmin(commandes)))}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Votre Compte
          </Typography>
        </RootStyle>
      </motion.div>
    </MotionContainer>
  );
}
