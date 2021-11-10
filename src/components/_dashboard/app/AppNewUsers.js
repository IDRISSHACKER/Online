import { Icon } from '@iconify/react';
import usergroupAddOutlined from '@iconify/icons-ant-design/usergroup-add-outlined';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { useSelector } from "react-redux"
import { isEmpty } from 'src/utils/isEmpty';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceInLeft } from 'src/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppNewUsers() {
  const users = useSelector(state => state.usersReducer)

  return (
    <MotionContainer initial="initial" open>
      <motion.div variants={varBounceInLeft}>
        <RootStyle>
          <IconWrapperStyle>
            <Icon icon={usergroupAddOutlined} width={34} height={34} />
          </IconWrapperStyle>
          <Typography variant="h3">{!isEmpty(users) && fShortenNumber(users.length)}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Utilisateurs
          </Typography>
        </RootStyle>
      </motion.div>
    </MotionContainer>
  );
}
