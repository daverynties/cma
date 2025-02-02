import React from "react";
import {
  Home,
  MapPin,
  BedDouble,
  Bath,
  TreePine,
  Car,
  DollarSign,
} from "lucide-react";

// Utility for currency formatting
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

// Utility for percentage change formatting
const formatPercentageChange = (original: number, newValue: number) => {
  if (original === 0) return "N/A";
  const change = ((newValue - original) / original) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
};

// Property Interface
interface Property {
  address: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  lotSize: number; // Acres
  garage: number; // Cars
}

const PropertyListing = () => {
  // Current property info
  const currentPrice = 1675000;
  const propertyStats: Property = {
    address: "43 Laurel Knoll Dr",
    cityState: "Pittsboro, NC 27312",
    price: currentPrice,
    beds: 4,
    baths: 4.5,
    lotSize: 2.01,
    garage: 3,
  };

  // Nearby properties (excluding current property)
  const nearbyListings: Property[] = [
    {
      address: "126 Harvest Ln",
      price: 1895000,
      sqft: 4891,
      beds: 4,
      baths: 4.5,
      lotSize: 2.5,
      garage: 3,
    },
    {
      address: "204 Harvest Ln",
      price: 1500000,
      sqft: 3650,
      beds: 4,
      baths: 4.5,
      lotSize: 1.8,
      garage: 2,
    },
    {
      address: "60 Citori Ct",
      price: 2500000,
      sqft: 4706,
      beds: 4,
      baths: 5.5,
      lotSize: 3.2,
      garage: 4,
    },
  ];

  // Down payment scenarios data
  const downPaymentScenarios = [
    {
      percentage: "5%",
      totalDown: currentPrice * 0.05, // 5% of 1,675,000
      monthlyPayment: 10000,
    },
    {
      percentage: "10%",
      totalDown: currentPrice * 0.1,
      monthlyPayment: 9300,
    },
    {
      percentage: "20%",
      totalDown: currentPrice * 0.2,
      monthlyPayment: 8200,
    },
  ];

  // Nearby schools
  const schools = [
    { name: "Perry W. Harrison Elem.", rating: 9, distance: 4.1 },
    { name: "North Chatham Elem.", rating: 7, distance: 4.2 },
    { name: "Pittsboro Elem.", rating: 6, distance: 6.7 },
  ];

  // Function to get comparison color
  const getColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  // Function to calculate percentage difference
  const calculatePercentage = (original: number, compared: number) => {
    if (original === 0) return "N/A";
    const diff = ((compared - original) / original) * 100;
    return `${diff >= 0 ? "+" : ""}${diff.toFixed(0)}%`;
  };

  // Function to get school color based on rating
  const getSchoolColor = (rating: number) => {
    if (rating <= 5) {
      return "bg-red-100 text-red-800";
    } else if (rating <= 7) {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-green-100 text-green-800"; // Same as New Construction
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4">
      {/* Outer wrapper: single "card" that aims to fit on one page for printing */}
      <div
        className="
          bg-white w-full max-w-4xl
          p-4 md:p-6
          text-sm md:text-base
          shadow-md
          space-y-4
          print:shadow-none
        "
        style={{
          minHeight: "10.5in", // Optional: Keep minHeight if needed
          overflow: "hidden", // Optional: Remove if not needed
        }}
      >
        {/* Row 1: Property Hero (Left) + Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hero Column */}
          <div className="bg-white border rounded p-3 flex flex-col justify-between">
            <div>
              {/* Address + "New Construction" badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Home className="w-6 h-6 text-blue-600" />
                  <h1 className="text-lg font-bold">{propertyStats.address}</h1>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  New Construction
                </span>
              </div>

              <p className="flex items-center gap-1 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                {propertyStats.cityState}
              </p>

              <p className="text-xl md:text-2xl font-bold text-green-700">
                {formatCurrency(propertyStats.price)}
              </p>
            </div>

            {/* Basic stats row */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <BedDouble className="w-4 h-4 text-blue-600" />
                <span>{propertyStats.beds} Beds</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>{propertyStats.baths} Baths</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TreePine className="w-4 h-4 text-blue-600" />
                <span>{propertyStats.lotSize} Acres</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Car className="w-4 h-4 text-blue-600" />
                <span>{propertyStats.garage} Cars</span>
              </div>
            </div>
          </div>

          {/* Nearby Properties Table */}
          <div className="bg-white border rounded p-3 flex flex-col">
            <h2 className="font-bold mb-2">Nearby Properties</h2>
            <p className="text-gray-500 text-xs mb-2">(Percentage Change Comparison)</p>
            <div className="space-y-4">
              {nearbyListings.map((prop) => {
                const priceChange = calculatePercentage(propertyStats.price, prop.price);
                const bedsChange = calculatePercentage(propertyStats.beds, prop.beds);
                const bathsChange = calculatePercentage(propertyStats.baths, prop.baths);
                const acresChange = calculatePercentage(propertyStats.lotSize, prop.lotSize);
                const carsChange = calculatePercentage(propertyStats.garage, prop.garage);

                // Parse the percentage string to a number for coloring
                const priceChangeValue = parseFloat(priceChange);
                const bedsChangeValue = parseFloat(bedsChange);
                const bathsChangeValue = parseFloat(bathsChange);
                const acresChangeValue = parseFloat(acresChange);
                const carsChangeValue = parseFloat(carsChange);

                return (
                  <div key={prop.address} className="border-b pb-2">
                    {/* First Line: Address and Price */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-800">{prop.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{formatCurrency(prop.price)}</span>
                        <span className={`text-sm ${getColor(priceChangeValue)}`}>{priceChange}</span>
                      </div>
                    </div>

                    {/* Second Line: Beds, Baths, Acres, Cars with % Change */}
                    <div className="flex justify-between mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4 text-gray-400" />
                        <span className={getColor(bedsChangeValue)}>{bedsChange}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-gray-400" />
                        <span className={getColor(bathsChangeValue)}>{bathsChange}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TreePine className="w-4 h-4 text-gray-400" />
                        <span className={getColor(acresChangeValue)}>{acresChange}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span className={getColor(carsChangeValue)}>{carsChange}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Down Payment Scenarios Table + Schools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Down Payment Scenarios Table */}
          <div className="bg-white border rounded-lg p-3 flex flex-col shadow-sm">
            {/* Section Heading */}
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold">Down Payment Scenarios</h2>
            </div>

            {/* Subtitle */}
            <p className="text-gray-500 text-xs mb-3">
              (Assumes purchase price:{" "}
              <span className="font-semibold">{formatCurrency(currentPrice)}</span>)
            </p>

            {/* Table */}
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-1 text-left font-semibold">Down Payment</th>
                  <th className="py-1 text-left font-semibold">Total Down</th>
                  <th className="py-1 text-left font-semibold">Est. Monthly</th>
                </tr>
              </thead>
              <tbody>
                {downPaymentScenarios.map((dp, index) => (
                  <tr
                    key={dp.percentage}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="py-1">{dp.percentage}</td>
                    <td className="py-1">{formatCurrency(dp.totalDown)}</td>
                    <td className="py-1">{formatCurrency(dp.monthlyPayment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nearby Schools */}
          <div className="bg-white border rounded p-3 flex flex-col">
            <h2 className="font-bold mb-2 text-base">Nearby Schools</h2>
            <p className="text-gray-500 text-sm mb-2">(Ratings & Dist.)</p>
            <ul className="text-sm space-y-2 flex-1">
              {schools.map((sch) => (
                <li
                  key={sch.name}
                  className={`flex justify-between items-center p-2 rounded ${getSchoolColor(
                    sch.rating
                  )}`}
                >
                  <span className="font-medium">{sch.name}</span>
                  <span className="text-gray-600">
                    {sch.rating}/10 • {sch.distance} mi
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Financial Information + Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Financial Information */}
          <div className="bg-white border rounded p-3 flex flex-col">
            <h2 className="font-bold mb-2 text-base">Financial Information</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Price/Sq Ft</p>
                <p className="font-semibold">$372</p>
              </div>
              <div>
                <p className="text-gray-500">Sq Ft</p>
                <p className="font-semibold">4,506</p>
              </div>
              <div>
                <p className="text-gray-500">Est. Monthly</p>
                <p className="font-semibold">$9,300</p>
              </div>
              <div>
                <p className="text-gray-500">Annual Tax</p>
                <p className="font-semibold">$1,811</p>
              </div>
              <div>
                <p className="text-gray-500">HOA Fees</p>
                <p className="font-semibold">$152 quarterly</p>
              </div>
              <div>
                <p className="text-gray-500">MLS #</p>
                <p className="font-semibold">10020678</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white border rounded p-3 flex flex-col">
            <h2 className="font-bold mb-2 text-base">Contact Information</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Listing Agent</p>
                <p className="font-semibold">Rex Osborne</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold">(919) 883-8528</p>
              </div>
              {/* Uncomment and add Agency if needed
              <div>
                <p className="text-gray-500">Agency</p>
                <p className="font-semibold">Windjam Properties</p>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default PropertyListing;
