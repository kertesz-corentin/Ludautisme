import React from 'react';
import './referenceswiper.scss'
import {Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import LazyImage from '../LazyImage/LazyImage';
import HideImageIcon from '@mui/icons-material/HideImage';
import {Box} from '@mui/material';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReferenceSwiper = ({
    refId,
    pictures,
    gridSize,
    setCurrentPicture, //paramètre optionel si vous avez besoin de récupérer l'id de l'image affiché
    ...rest
}) =>{
    const handleChange = (target) => {
        if (setCurrentPicture) {
            console.log(pictures[target.realIndex].id);
            setCurrentPicture(pictures[target.realIndex].id);
        }
    }
    const renderImageType = () => {
                console.log(pictures)
                if (pictures.length === 0 || pictures[0].id === null) {
                    return (
                    <Box style = {{height:`${gridSize*(3/4)}px`,width:`${gridSize}px`}} className='reference-card__image-not-found'>
                        <HideImageIcon  className='reference-card__image-not-found--icon'/>
                    </Box>
                    );
                } else if (pictures.length === 1){
                    setCurrentPicture(pictures[0].id);
                    return(
                        <LazyImage
                        gridSize={gridSize}
                        src={pictures[0].url}
                        alt={pictures[0].text}
                        />
                    );
                } else {
                    return (
                        <Swiper
                            spaceBetween={30}
                            style = {{height:`${gridSize*(3/4)}px`,width:`${gridSize}px`}}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination,Navigation]}
                            className={`swiper-refId${refId}`}
                            onSlideChange={handleChange}
                            onInit={handleChange}
                        >
                        {pictures.map(
                            pic => <SwiperSlide key={`swiper-refId${refId}-picId${pic.id}`}>
                                 <LazyImage
                                    gridSize={gridSize}
                                    src={pic.url}
                                    alt={pic.text}
                                    />
                            </SwiperSlide>
                        )}
                        </Swiper>
                    )
                }
    }

    
    return(
        <Box style={{position:'relative'}}>
        {renderImageType()}
        </Box>
    )

}

export default React.memo(ReferenceSwiper);
