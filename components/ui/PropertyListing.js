'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, DollarSign, Ruler, Calendar, MapPin, School, Users, BedDouble, Bath, TreePine, Car, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const currentPrice = 1675000;

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const PriceComparison = ({ price }) => {
  if (price === currentPrice) return <Minus className="w-4 h-4 text-gray-500" />;
  return price > currentPrice ? 
    <ArrowUp className="w-4 h-4 text-red-500" /> : 
    <ArrowDown className="w-4 h-4 text-green-500" />;
};

const PropertyListing = () => {
  // Example data
  const property = {
    address: '123 Main St, Some City, ST 12345',
    price: 1695000,
    sqft: 2500,
    pricePerSqft: 678,
    beds: 4,
    baths: 3,
    isCurrentProperty: true,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.address}</CardTitle>
        <CardDescription>{formatCurrency(property.price)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p>Price per Sqft: {property.pricePerSqft}</p>
          <p>Beds: {property.beds}</p>
          <p>Baths: {property.baths}</p>
        </div>
        <PriceComparison price={property.price} />
      </CardContent>
    </Card>
  );
};

export default PropertyListing;
