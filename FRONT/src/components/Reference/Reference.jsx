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

const Reference = ({
    className,
    name,
    description,
    maincategory,
    picture,
    tag,
    valorisation,
    article,
     }) => {
   return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={picture[0].url}
                alt="image about the article"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <ReferenceModal
                    name={name}
                    description={description}
                    maincategory={maincategory}
                    picture={picture[0].url}
                    tag={tag}
                    valorisation={valorisation}
                />
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
