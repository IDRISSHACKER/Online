import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import shoppingTwotone from '@iconify/icons-ant-design/shopping-twotone';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography, Link } from '@material-ui/core';
// utils
import { useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
//
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from 'src/components/animate';
import { Link as RouterLink } from "react-router-dom"

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppWeeklySales() {

  const [TOTAL, setTOTAL] = useState(0);
  const postsReducer = useSelector(state => state.postsReducer)

  const animStat = (stat) => {
    for (let i = 0; i <= 12; i += 1) {
      let interval = setTimeout(function () {
        setTOTAL(TOTAL + 1)
        clearTimeout(interval)
      }, 200)
    }
  }

  //!isEmpty(postsReducer) && animStat(postsReducer)

  return (
    <Link underline="none" component={RouterLink} to="/admin/post-list">
      <MotionContainer initial="initial" open>
        <motion.div variants={varBounceIn} >
          <RootStyle >
            <IconWrapperStyle>
              <Icon icon={shoppingTwotone} width={34} height={34} />
            </IconWrapperStyle>
            <Typography variant="h3">{!isEmpty(postsReducer) && postsReducer.length}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Produits
            </Typography>
          </RootStyle>
        </motion.div>
      </MotionContainer>
    </Link>
  );
}
