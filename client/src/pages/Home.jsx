import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className='flex flex-col gap-4 p-8 sm:p-20 px-3 max-w-6xl mx-auto text-center sm:text-left'>
        <h1 className='text-blue-900 font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight'>
          Find your next <span className='text-yellow-500'>perfect</span> place
          with ease
        </h1>
        <p className='text-gray-600 text-sm sm:text-base mt-2'>
          Kinan Estate offers a wide range of properties to help you find your
          next ideal place to live.
        </p>
        <Link
          to='/search'
          className='text-sm sm:text-base text-white bg-blue-600 font-bold px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition duration-200'
        >
          Let's get started
        </Link>
      </div>

      {/* Featured Listings Swiper */}
      <div className='py-8 bg-gray-100'>
        <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center/cover no-repeat`,
                  }}
                  className='h-[300px] sm:h-[500px] w-full rounded-md shadow-md'
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listings Sections for Offers, Rent, and Sale */}
      <div className='max-w-6xl mx-auto p-5 sm:p-10 my-10 bg-white rounded-md shadow-lg'>
        {offerListings && offerListings.length > 0 && (
          <div className='mb-8'>
            <div className='flex justify-between items-center my-3'>
              <h2 className='text-xl sm:text-2xl font-semibold text-slate-700'>
                Recent Offers
              </h2>
              <Link
                to='/search?offer=true'
                className='text-sm text-blue-600 hover:text-blue-700 transition'
              >
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='mb-8'>
            <div className='flex justify-between items-center my-3'>
              <h2 className='text-xl sm:text-2xl font-semibold text-slate-700'>
                Recent Places for Rent
              </h2>
              <Link
                to='/search?type=rent'
                className='text-sm text-blue-600 hover:text-blue-700 transition'
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='flex justify-between items-center my-3'>
              <h2 className='text-xl sm:text-2xl font-semibold text-slate-700'>
                Recent Places for Sale
              </h2>
              <Link
                to='/search?type=sale'
                className='text-sm text-blue-600 hover:text-blue-700 transition'
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
