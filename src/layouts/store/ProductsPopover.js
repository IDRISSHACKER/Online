import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';

export default function ProductsPopover() {
    return (
        <>
            <Link
                component={RouterLink}
                to="/store/products/0-all"
                underline="none"
                color="white"
            >
                <Typography> Categories</Typography>
            </Link>
        </>
    );
}
