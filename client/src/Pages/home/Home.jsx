import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProdcuts from '../Shop/TrendingProdcuts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blogs from '../Blogs/Blogs'

function Home() {
  return (
    <div>
       <Banner />
       <Categories />
       <HeroSection />
       <TrendingProdcuts />
       <DealsSection />
       <PromoBanner />
       <Blogs />
    </div>
  )
}

export default Home