import React from "react";
import {
  Home,
  MapPin,
  BedDouble,
  Bath,
  TreePine,
  Car,
  Clock,
  Eye,
  Bookmark,
  Ruler,
  DollarSign,
  Heart,
} from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

interface Property {
  address: string;
  price: number;
  beds: number;
  baths: number;
  lotSize: number; // Acres
  garage: number; // Cars
  sqft: number; // Square feet
  pricePerSqft: number; // Price per square foot
}

interface DownPaymentScenario {
  percentage: string;
  totalDown: number;
  monthlyPayment: number;
}

interface School {
  name: string;
  rating: number;
  distance: number;
}

interface PriceHistoryEvent {
  date: string;
  event: string;
  price: string;
  change?: string;
}

const PropertyListing = () => {
  // Current property
  const currentPrice = 1675000;
  const property: Property = {
    address: "43 Laurel Knoll Dr",
    price: currentPrice,
    beds: 4,
    baths: 4.5,
    lotSize: 2.01,
    garage: 3,
    sqft: 4506,
    pricePerSqft: 372,
  };

  // Nearby properties
  const nearbyListings: Property[] = [
    {
      address: "126 Harvest Ln",
      price: 1895000,
      beds: 4,
      baths: 4.5,
      lotSize: 2.5,
      garage: 3,
      sqft: 4800,
      pricePerSqft: 395,
    },
    {
      address: "204 Harvest Ln",
      price: 1500000,
      beds: 4,
      baths: 4.5,
      lotSize: 1.8,
      garage: 2,
      sqft: 4200,
      pricePerSqft: 357,
    },
    {
      address: "60 Citori Ct",
      price: 2500000,
      beds: 4,
      baths: 5.5,
      lotSize: 3.2,
      garage: 4,
      sqft: 5200,
      pricePerSqft: 481,
    },
  ];

  // Down payment scenarios
  const downPaymentScenarios: DownPaymentScenario[] = [
    { percentage: "5%", totalDown: currentPrice * 0.05, monthlyPayment: 10000 },
    { percentage: "10%", totalDown: currentPrice * 0.1, monthlyPayment: 9300 },
    { percentage: "20%", totalDown: currentPrice * 0.2, monthlyPayment: 8200 },
  ];

  // Nearby schools
  const schools: School[] = [
    { name: "Perry W. Harrison Elem.", rating: 9, distance: 4.1 },
    { name: "North Chatham Elem.", rating: 7, distance: 4.2 },
    { name: "Pittsboro Elem.", rating: 6, distance: 6.7 },
  ];

  // Price history
  const priceHistory: PriceHistoryEvent[] = [
    {
      date: "4/3/2024",
      event: "Listed for sale",
      price: "$1,675,000",
      change: "+415.4%",
    },
    {
      date: "12/8/2023",
      event: "Listing removed",
      price: "--",
    },
    {
      date: "12/1/2023",
      event: "Pending sale",
      price: "$325,000",
      change: "+25%",
    },
    {
      date: "1/14/2021",
      event: "Listing removed",
      price: "--",
    },
    {
      date: "3/13/2019",
      event: "Listed for sale",
      price: "$260,000",
    },
  ];

  // Zillow metrics
  const zillowMetrics = {
    daysOnZillow: 302,
    views: 740,
    saves: 21,
  };
  const saveRatio = ((zillowMetrics.saves / zillowMetrics.views) * 100).toFixed(1);

  // Helpers
  const calculateDifference = (original: number, newValue: number) => {
    const difference = newValue - original;
    return `${difference >= 0 ? "+" : ""}${difference}`;
  };

  const getColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const parseChangeValue = (change: string) => {
    const numeric = parseFloat(change.replace(/[^\d.-]/g, ""));
    return isNaN(numeric) ? 0 : numeric;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Property Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                {property.address}
              </h1>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              New Construction
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            Pittsboro, NC 27312
          </p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {formatCurrency(property.price)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{zillowMetrics.daysOnZillow} days</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{zillowMetrics.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark className="w-4 h-4 text-gray-400" />
              <span>{zillowMetrics.saves}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-gray-400" />
              <span>{saveRatio}% save ratio</span>
            </div>
          </div>
        </div>

        

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-gray-50 text-sm">
          {[
            { icon: BedDouble, label: "Beds", value: property.beds },
            { icon: Bath, label: "Baths", value: property.baths },
            {
              icon: TreePine,
              label: "Lot Size",
              value: `${property.lotSize} Acres`,
            },
            { icon: Car, label: "Garage", value: `${property.garage} Cars` },
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <stat.icon className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <p className="font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby Properties */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Nearby Properties</h2>
          <div className="space-y-2">
            {nearbyListings.map((listing, index) => {
              const priceDifference = listing.price - property.price;
              const bedsDifference = listing.beds - property.beds;
              const bathsDifference = listing.baths - property.baths;
              const lotSizeDifference = listing.lotSize - property.lotSize;
              const garageDifference = listing.garage - property.garage;

              return (
                <div key={index} className="p-2 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">
                        {listing.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(listing.price)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium ${getColor(priceDifference)}`}
                    >
                      {formatCurrency(priceDifference)}
                    </span>
                  </div>
                  <div className="mt-1 grid grid-cols-4 gap-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-3 h-3 text-gray-400" />
                      <span className={getColor(bedsDifference)}>
                        {calculateDifference(property.beds, listing.beds)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3 h-3 text-gray-400" />
                      <span className={getColor(bathsDifference)}>
                        {calculateDifference(property.baths, listing.baths)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TreePine className="w-3 h-3 text-gray-400" />
                      <span className={getColor(lotSizeDifference)}>
                        {parseFloat(
                          (listing.lotSize - property.lotSize).toFixed(2)
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="w-3 h-3 text-gray-400" />
                      <span className={getColor(garageDifference)}>
                        {calculateDifference(property.garage, listing.garage)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Down Payment Scenarios */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Down Payment Scenarios
          </h2>
          <div className="space-y-2">
            {downPaymentScenarios.map((scenario, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">
                    {scenario.percentage} Down
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {formatCurrency(scenario.totalDown)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Est. Monthly: {formatCurrency(scenario.monthlyPayment)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Schools */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Nearby Schools
          </h2>
          <div className="space-y-2">
            {schools.map((school, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">
                    {school.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {school.distance} mi
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs font-semibold">{school.rating}/10</span>
                  <div className="h-1 w-12 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        school.rating > 7
                          ? "bg-green-500"
                          : school.rating > 5
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                      style={{ width: `${school.rating * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price History */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Price History</h2>
          <div className="space-y-2">
            {priceHistory.map((event, index) => {
              const numericChange = event.change
                ? parseChangeValue(event.change)
                : 0;
              const changeColor =
                numericChange > 0
                  ? "text-green-600"
                  : numericChange < 0
                  ? "text-red-600"
                  : "text-gray-600";

              return (
                <div key={index} className="p-2 bg-gray-50 rounded-md">
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div>
                      <p className="font-medium text-gray-800">{event.date}</p>
                      <p className="text-gray-600 text-sm">{event.event}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800">{event.price}</p>
                      <p className={`text-sm mt-1 ${changeColor}`}>
                        {event.change || "--"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Financial Details</h3>
              <div className="space-y-1 text-gray-700">
                <p>Price/Sq Ft: ${property.pricePerSqft}</p>
                <p>Sq Ft: {property.sqft}</p>
                <p>Est. Monthly: $9,300</p>
                <p>Annual Tax: $1,811</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Contact</h3>
              <div className="space-y-1 text-gray-700">
                <p>Listing Agent: Rex Osborne</p>
                <p>Phone: (919) 883-8528</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;