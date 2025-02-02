import React from "react";
import {
  Home,
  MapPin,
  BedDouble,
  Bath,
  TreePine,
  Car,
  Clock,
  Phone,
  Globe,
  Mail,
} from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

// Data Types
interface Property {
  address: string;
  type: string;
  sqft: number;
  beds: number;
  baths: number;
  yearBuilt: number;
  lotSize: string;
}

interface Comparable {
  address: string;
  sqft: number;
  beds: number;
  baths: number;
  price: number;
  status: "For Sale" | "Sold" | "Contingent" | "Pending";
  distance: string;
}

// Data
const property: Property = {
  address: "909 Troywood Drive, Troy, MI 48083",
  type: "Single Family (Ranch/Rambler)",
  sqft: 1616,
  beds: 3,
  baths: 1,
  yearBuilt: 1956,
  lotSize: "0.17 acres",
};

const comparables: Comparable[] = [
  {
    address: "3038 Donna Drive",
    sqft: 1821,
    beds: 3,
    baths: 1.5,
    price: 289000,
    status: "For Sale",
    distance: "2.6 mi",
  },
  {
    address: "336 E 13 Mile Road",
    sqft: 1041,
    beds: 3,
    baths: 2,
    price: 273000,
    status: "For Sale",
    distance: "3.8 mi",
  },
  {
    address: "34134 Dequindre Road",
    sqft: 1200,
    beds: 3,
    baths: 2,
    price: 269900,
    status: "For Sale",
    distance: "3.0 mi",
  },
  {
    address: "3051 Donna Drive",
    sqft: 1628,
    beds: 3,
    baths: 2,
    price: 275000,
    status: "Sold",
    distance: "2.9 mi",
  },
  {
    address: "3639 Jennifer Drive",
    sqft: 1448,
    beds: 3,
    baths: 1.5,
    price: 276000,
    status: "Sold",
    distance: "3.1 mi",
  },
  {
    address: "901 Donald Avenue",
    sqft: 1200,
    beds: 3,
    baths: 2,
    price: 276000,
    status: "Sold",
    distance: "N/A",
  },
];

const MarketAnalysis = () => {
  // AI & Sales Strategy Insights
  const recommendedListingPrice = 305000;
  const acceptableOfferThreshold = 290000;
  const estimatedTimeOnMarket = "30-60 days";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-100 to-green-100 border-b">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              {property.address}
            </h1>
          </div>
          <p className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            Troy, MI
          </p>
        </div>

        {/* Estimate Range & AI Insights */}
        <div className="p-4 border-b">
          <div className="text-green-600 font-bold text-lg">
            Market Range: {formatCurrency(249300)} - {formatCurrency(304700)}
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Based on AI insights, the recommended pricing strategy is to list at{" "}
            {formatCurrency(recommendedListingPrice)}. We consider offers above{" "}
            {formatCurrency(acceptableOfferThreshold)} as acceptable, and expect the property to remain on the market for approximately{" "}
            {estimatedTimeOnMarket}. Our marketing plan includes a robust digital and offline campaign with professional photos, virtual tours, and targeted ads.
          </p>
        </div>

        {/* Property Snapshot */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Property Snapshot
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4 text-blue-600" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-blue-600" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <TreePine className="w-4 h-4 text-blue-600" />
              <span>{property.lotSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4 text-blue-600" />
              <span>
                {property.type.includes("Garage")
                  ? property.type
                  : "No Garage Info"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{property.yearBuilt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4 text-blue-600" />
              <span>{property.sqft} Sq Ft</span>
            </div>
          </div>
        </div>

        {/* Comparable Listings */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Comparable Listings
          </h2>
          <div className="space-y-3">
            {comparables.map((comp, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-800">{comp.address}</p>
                    <span
                      className={`text-xs ml-2 font-medium ${
                        comp.status === "Sold"
                          ? "text-red-600"
                          : comp.status === "For Sale"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {comp.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(comp.price)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <BedDouble className="w-3 h-3" />
                    <span>{comp.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    <span>{comp.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    <span>{comp.sqft} Sq Ft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{comp.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Contact */}
        <div className="p-4 bg-gray-50 border-t">
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-700">
        <div>
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-6 h-6 text-blue-600" /> {/* Smaller World icon */}
            <div className="text-lg font-semibold">World Showcase Realty</div>
          </div>
          <p className="font-semibold">Contact: Vince Saragosa</p>
          <div className="flex items-center gap-1 mt-1">
            <Phone className="w-4 h-4 text-blue-600" />
            <a
              href="tel:586-675-8791"
              className="text-sm text-gray-700 hover:underline"
            >
              586-675-8791
            </a>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Mail className="w-4 h-4 text-blue-600" />
            <a
              href="mailto:saravo@comcast.net"
              className="text-sm text-gray-700 hover:underline"
            >
              saravo@comcast.net
            </a>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
