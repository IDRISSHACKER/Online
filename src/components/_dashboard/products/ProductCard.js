import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, TextField } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import { fCurrency, fFcfa } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import {useEffect, useState, useRef} from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product, index }) {
  const { name, cover, price, colors, status, priceSale } = product;
  const [st, setSt] = useState(parseInt(localStorage.getItem("products_stock") ? JSON.parse(localStorage.getItem("products_stock"))[index] : 0));

  const updateSt = (e)=>{
    let nSt = e.target.value;
    setPrices(nprices);
    let fdata = new FormData();

    fdata.append("stock", nSt);
    axios.post("",fdata).then(res=>{

    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={localStorage.getItem("poducts")? JSON.parse(localStorage.getItem('poducts'))[index] : name} src={localStorage.getItem("product_img") ? "http://localhost/dc/public/img/"+JSON.parse(localStorage.getItem('product_img'))[index] : cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {localStorage.getItem("poducts")? JSON.parse(localStorage.getItem('poducts'))[index] : name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <TextField onChange={updateSt} type="number" value={st} />
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
