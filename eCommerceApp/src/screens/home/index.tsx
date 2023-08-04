import {carouselImages} from 'common/datas';
import Layout from 'layout';
import React from 'react';
import Carousel from '../../componennts/Carousel';
import {CarouselWrapper, HomeContainer, HomeWrapper} from './homeStyle';

export default function Home() {
  return (
    <Layout>
      <HomeContainer>
        <HomeWrapper>
          <CarouselWrapper>
            <Carousel imageList={carouselImages} />
          </CarouselWrapper>
        </HomeWrapper>
      </HomeContainer>
    </Layout>
  );
}
