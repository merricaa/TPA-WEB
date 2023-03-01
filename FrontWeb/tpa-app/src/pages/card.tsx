import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { links } from './routelinks';

interface Product {
  productID: string
  image: string
  name: string
  priceTag: any
  shop: string
}

const Card = ({ productID, image, name, priceTag, shop,  }: Product) => {
  return (
    <Link href={links.productDetail(productID)} passHref>
      <div className="card">
        <div className="card-image">
          <Image src={image} alt="image" layout="fill" objectFit="cover"></Image>
        </div>
        <div className="card-content">
          <p className="product-name">{name}</p>
          {/* <b>Rp.{price}</b> */}
          {priceTag}
        </div>
      </div>
    </Link>
  )
}

export default Card
