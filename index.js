const fetch = require('node-fetch');

// const eligibleItemsUrl = 'https://api.ebay.com/sell/negotiation/v1/find_eligible_items';
// const sendOfferUrl = 'https://api.ebay.com/sell/negotiation/v1/send_offer_to_interested_buyers';
const eligibleItemsUrl = 'http://localhost:8000/find_eligible_items';
const sendOfferUrl = 'http://localhost:8000/send_offer_to_interested_buyers';

const getEbayDetails = async () => {
  let skip = 0;
  let limit = 10;
  let eligibleItems = []
  do {
  const response = await fetch(
    `${eligibleItemsUrl}?limit=${limit}&offset=${skip}`,
    {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_IN'
      }
    }
  );
   
  const itemObject = await response.json();
  eligibleItems = itemObject.eligibleItems

  const offerRequest = {
    allowCounterOffer: false,
    message: ' here is some discount for you',
    offerDuration: {
      unit: 'DAY',
      value: 2,
    },
    offeredItems: itemObject.eligibleItems.map(({listingId}) => ({
      listingId,
      discountPercentage: 5,
    }))
  }

  const offerItems = await fetch(
    sendOfferUrl,
    {
      method: 'post',
      body: JSON.stringify(offerRequest),
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_IN',
        'Content-Type': 'application/json'
      }
    }
  );

  const offerObject = await offerItems.json();
  console.log('offerObject values are', offerObject);
  await sleep(4000);
  }
  while (limit === eligibleItems.length);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

getEbayDetails();
