export const getRealisticPlacesNames = ({ locationData }) => {
  //? Essentials
  //! Autocomplete
  locationData["location_name"] =
    locationData["location_name"] !== null
      ? locationData["location_name"]
      : locationData["name"];
  locationData["street_name"] =
    locationData["street_name"] !== null
      ? locationData["street_name"]
      : locationData["street"];
  locationData["suburb"] =
    locationData["suburb"] !== null
      ? locationData["suburb"]
      : locationData["district"];
  //1. Suburb
  let suburb =
    locationData["suburb"] !== false &&
    locationData["suburb"] !== "false" &&
    locationData["suburb"] !== null
      ? locationData["suburb"]
      : locationData["location_name"] !== false &&
        locationData["location_name"] !== "false" &&
        locationData["location_name"] !== null
      ? locationData["location_name"]
      : locationData["street_name"] !== false &&
        locationData["street_name"] !== "false" &&
        locationData["street_name"] !== null
      ? locationData["street_name"]
      : "Finding your location";

  //2. Location name
  let location_name =
    locationData["location_name"] !== false &&
    locationData["location_name"] !== "false" &&
    locationData["location_name"] !== null
      ? locationData["location_name"] !== suburb
        ? locationData["location_name"]
        : ""
      : locationData["street_name"] !== false &&
        locationData["street_name"] !== "false" &&
        locationData["street_name"] !== null
      ? locationData["street_name"]
      : "";

  //3. Street name
  let street_name =
    locationData["street_name"] !== false &&
    locationData["street_name"] !== "false" &&
    locationData["street_name"] !== null
      ? locationData["street_name"] !== suburb &&
        locationData["street_name"] !== location_name
        ? locationData["street_name"]
        : ""
      : "";

  //? ---

  return {
    location_name: location_name,
    street_name: street_name,
    suburb: suburb,
    city: locationData["city"] !== null ? locationData["city"] : "...",
  };
};
