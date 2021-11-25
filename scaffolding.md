struct Instrument {
    string name;
    string description;
    Exchange exchange;
    Ticker ticker;
    ...
}

struct Offer {
    address payable buyer;
    address payable seller;
    uint instrumentId;
    uint price;
    uint noUnits;
}

mapping(uint => Offer) public Offers

modifier registrationComplete(uint clientId) {
    // checks that user has provided all required information and has been verified
}

function registerClient (string name, string residentialAddress, ...) {
    // registers the personal details of a client 
}

function validateClient (uint clientId) {
    // validates that a client's personal details are correct
}

modifier checkSellerStock (uint clientId) {
    // checks that the seller has the requested number of units
}

modifier hasFunds(address buyer, ...) {
    // verifies buyer has sufficient funds
}

function sendOffer(uint buyerId, uint sellerId, uint instrumentId, uint price, uint noUnits) public hasFunds(...) returns (uint offerId) {
    // buyer sends offer to seller
}

function acceptOffer(uint offerId) {
    // accepts offer that has been made and executes transaction
}

function notifyExchanges(uint offerId) {
    // takes the instrumentId and provides the necessary details to the exchange to let the market know about the transaction and the change of ownership
}