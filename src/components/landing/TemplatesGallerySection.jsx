import React from 'react';
import { Box, Typography } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Template1 from "../../assets/templates/ramakanth_kannuri_page-0001.jpg"
import Template2 from "../../assets/templates/ramakanth_kannuri_page-0002.jpg"
import Template3 from "../../assets/templates/ramakanth_kannuri_page-0003.jpg"
import Template4 from "../../assets/templates/ramakanth_kannuri_page-0004.jpg"
import Template5 from "../../assets/templates/ramakanth_kannuri_page-0005.jpg"

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    padding: '2rem 2rem',
    background: 'linear-gradient(135deg, #0f0f3a 0%, #1a1a4a 100%)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      padding: '4rem 1.5rem',
    }, 
    '@media (max-width: 600px)': {
      padding: '3rem 1rem',
    },
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    marginBottom: '1rem',
    '@media (max-width: 960px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.8rem',
    },
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: '4rem',
    maxWidth: '800px',
    margin: '0 auto 4rem auto',
    lineHeight: 1.6,
    '@media (max-width: 960px)': {
      fontSize: '1.1rem',
      marginBottom: '3rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      marginBottom: '2rem',
    },
  },
  swiperContainer: {
    width: '100%',
    padding: '10px 0',
  },
  templateSlide: {
    width: '300px',
    height: '400px',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    
  },
  templateImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
}));

const templatesData = [
  {
    id: 'template1',
    image: Template1,
    name: 'Professional Template'
  },
  {
    id: 'template2',
    image: Template2,
    name: 'Creative Template'
  },
  {
    id: 'template3',
    image: Template3,
    name: 'Modern Template'
  },
  {
    id: 'template4',
    image: Template4,
    name: 'Modern Template'
  },
  {
    id: 'template5',
    image: Template5,
    name: 'Modern Template'
  },
  // Add more templates as needed
];

const TemplatesGallerySection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography className={classes.title}>
          Explore Our Collection of Professional Templates
        </Typography>
        
        <Typography className={classes.subtitle}>
          A wide range of professionally designed, ATS-compatible templates tailored for different roles, industries, and experience levels.
        </Typography>

        <Box className={classes.swiperContainer}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={'auto'}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // pagination={{ clickable: true }}
            navigation
          >
            {templatesData.map((template) => (
              <SwiperSlide key={template.id} className={classes.templateSlide}>
                <img 
                  src={template.image}
                  alt={template.name}
                  className={classes.templateImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplatesGallerySection;