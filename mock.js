const express = require("express");
const app = express();

app.use(express.json())
app.get("/find_eligible_items", (req, res, next) => {
    // console.log(req.query);
    res.json({
        eligibleItems: [
          {
            listingId: "270010240241"
          },
          {
            listingId: "270010243945"
          },
          {
            listingId: "270010243946"
          },
          {
            listingId: "270010243948"
          },
          {
            listingId: "270010243949"
          },
          {
            listingId: "270010252998"
          }
        ],
        total: 10
      })
});

app.post("/send_offer_to_interested_buyers", (req, res, next) => {
    res.json({ /* SendOfferToInterestedBuyersCollectionResponse */
        "offers" : [
        { /* Offer */
        "allowCounterOffer" : "boolean",
        "buyer" :
        { /* User */
        "maskedUsername" : "string"},
        "creationDate" : "string",
        "initiatedBy" : "string",
        "lastModifiedDate" : "string",
        "message" : "string",
        "offerDuration" :
        { /* TimeDuration */
        "unit" : "TimeDurationUnitEnum : [YEAR,MONTH,DAY...]",
        "value" : "integer"},
        "offeredItems" : [
        { /* OfferedItem */
        "discountPercentage" : "string",
        "listingId" : "string",
        "price" :
        { /* Amount */
        "currency" : "CurrencyCodeEnum : [AED,AFN,ALL...]",
        "value" : "string"},
        "quantity" : "integer"}
        ],
        "offerId" : "string",
        "offerStatus" : "OfferStatusEnum : [PENDING,RETRACTED,EXPIRED...]",
        "offerType" : "OfferTypeEnum : [SELLER_INITIATED_OFFER]",
        "revision" : "string"}
        ]
        })
})

app.listen(8000, () => {
    console.log("connected to the server");
    require("./index");
});
