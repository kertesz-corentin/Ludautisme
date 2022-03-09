import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './reference.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ReferenceModal from '../ReferenceModal/ReferenceModal';

const Reference = ({className, ...rest}) => {
   return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="../../public/legosfix.png"
                alt="image about the article"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Réference 1
                </Typography>
                <ReferenceModal/>
            </CardContent>
        </Card>
   );
};

Reference.propTypes = {
    className: PropTypes.string,
};
Reference.defaultProps = {
    className: '',
};
export default React.memo(Reference);
