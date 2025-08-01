import React from 'react';
import { useTranslation } from 'react-i18next';
import farmerImg from '../assets/corn.jpg';
import auctionImg from '../assets/potato.jpg';
import transactionImg from '../assets/tamato1.jpg';
import bgImage from '../assets/bg.jpg';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-green-50">
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-white text-center px-4 md:px-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-green-800 bg-opacity-70 p-8 rounded-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-xl mx-auto">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-8">
            <a
              href="/auctions"
              className="bg-yellow-500 text-green-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all"
            >
              {t("home.ctaBid")}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700">{t("home.featuresTitle")}</h2>
          <p className="mt-4 text-gray-600">{t("home.featuresSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center">
            <img src={farmerImg} alt="Create Auction" className="rounded-lg h-40 w-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-green-700">{t("home.feature1Title")}</h3>
            <p className="mt-4 text-gray-700">{t("home.feature1Desc")}</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center">
            <img src={auctionImg} alt="Live Bidding" className="rounded-lg h-40 w-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-green-700">{t("home.feature2Title")}</h3>
            <p className="mt-4 text-gray-700">{t("home.feature2Desc")}</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center">
            <img src={transactionImg} alt="Transaction History" className="rounded-lg h-40 w-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-green-700">{t("home.feature3Title")}</h3>
            <p className="mt-4 text-gray-700">{t("home.feature3Desc")}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="text-center px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-4">{t("home.ctaTitle")}</h2>
          <p className="text-lg mb-6">{t("home.ctaSubtitle")}</p>
          <a
            href="/auth"
            className="bg-yellow-500 text-green-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all"
          >
            {t("home.ctaJoin")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;


// import React, { useEffect, useState } from 'react';
// import farmerImg from '../assets/corn.jpg';
// import auctionImg from '../assets/potato.jpg';
// import transactionImg from '../assets/tamato1.jpg';
// import bgImage from '../assets/bg.jpg';

// const Home = () => {



//   return (
//     <div className="bg-green-50 ">
//       {/* Hero Section */}
//       <section
//         className="h-screen flex flex-col justify-center items-center text-white text-center px-4 md:px-10 bg-cover bg-center "
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="bg-green-800 bg-opacity-70 p-8 rounded-xl">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
//             Welcome to AgriAuction Hub
//           </h1>
//           <p className="mt-4 text-lg sm:text-xl max-w-xl mx-auto">
//             Bid on agricultural crops in real-time, anywhere, anytime.
//           </p>
//           <div className="mt-8">
//             <a
//               href="/auctions"
//               className="bg-yellow-500 text-green-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all"
//             >
//               Start Bidding Now
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 md:px-16 bg-white">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-green-700">How It Works</h2>
//           <p className="mt-4 text-gray-600">Your gateway to real-time crop auctions.</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {/* Feature 1 */}
//           <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center">
//             <img src={farmerImg} alt="Create Auction" className="rounded-lg h-40 w-full object-cover mb-4" />
//             <h3 className="text-xl font-semibold text-green-700">Create Auctions</h3>
//             <p className="mt-4 text-gray-700">Farmers can easily list crops for sale in a few steps.</p>
//           </div>

//           {/* Feature 2 */}
//           <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center">
//             <img src={auctionImg} alt="Live Bidding" className="rounded-lg h-40 w-full object-cover mb-4" />
//             <h3 className="text-xl font-semibold text-green-700">Live Bidding</h3>
//             <p className="mt-4 text-gray-700">Buyers place bids in real-time, ensuring competitive pricing.</p>
//           </div>

//           {/* Feature 3 */}
//           <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center">
//             <img src={transactionImg} alt="Transaction History" className="rounded-lg h-40 w-full object-cover mb-4" />
//             <h3 className="text-xl font-semibold text-green-700">Transaction History</h3>
//             <p className="mt-4 text-gray-700">All auction results are recorded for transparency and trust.</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-green-600 text-white py-12">
//         <div className="text-center px-4 md:px-10">
//           <h2 className="text-3xl font-bold mb-4">Ready to join the auction?</h2>
//           <p className="text-lg mb-6">Sign up now and start bidding on fresh crops from trusted farmers.</p>
//           <a
//             href="/auth"
//             className="bg-yellow-500 text-green-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all"
//           >
//             Join AgriAuction Hub
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
