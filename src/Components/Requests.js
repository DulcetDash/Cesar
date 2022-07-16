import React, { Component } from "react";
import classes from "../Styles/Requests.module.css";
import DrawerMenu from "./DrawerMenu";
import Loader from "react-loader-spinner";
import {
  ArrowBackIosSharp,
  ArrowBack,
  ArrowForwardIosSharp,
  ArrowForward,
  CheckCircle,
} from "@material-ui/icons";
import ucFirst from "../Helpers/Helpers";
import Modal from "react-modal";
import { getRealisticPlacesNames } from "../Helpers/DataParser";
import toast, { Toaster } from "react-hot-toast";
import ImageViewer from "react-simple-image-viewer";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "90%",
    height: "80%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

const axios = require("axios").default;

class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequestCategory: "ride", //ride, delivery or shopping
      selectedRequestStatus: "inprogress", //inprogress, completed, cancelled
      selectedRequestForFocus: {
        ride_mode: "RIDE",
        date_requested: "2022-07-14T22:59:10.000Z",
        request_type: "immediate",
        date_clientRatedRide: null,
        request_state_vars: {
          inRouteToDropoff: false,
          completedDropoff: false,
          inRouteToPickup: false,
          completedRatingClient: false,
          isAccepted: false,
          rating_data: {
            rating: false,
            compliments: [],
            comments: false,
          },
        },
        request_fp:
          "3869456341d1a12d74c847470fa62d7efe9ea01ca3796aa9da2f67660649899c",
        client_id:
          "9246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
        date_routeToDropoff: null,
        totals_request: { fare: 76 },
        request_documentation: { note: "" },
        ride_selected: {
          country: "Namibia",
          app_label: "Normal Taxi",
          city: ["Windhoek", "Swakopmund", "Walvis Bay"],
          base_fare: 76,
          description: "Affordable rides",
          id: 1,
          media: { car_app_icon: "normalTaxiEconomy.jpeg" },
          availability: "available",
          category: "Economy",
          ride_type: "RIDE",
          car_type: "normalTaxiEconomy",
        },
        ride_style: "shared",
        security: { pin: "959858" },
        date_completedDropoff: null,
        areGoingTheSameWay: true,
        shopper_id:
          "aaaaa265bca710a49756d90e382f9591dceba4b26cc03c01aaca3828145376321f9b8b401ae7e1efa41c99e7f210ecc191c62b2dc7bcda566e312378e1a1fdf1b",
        passengers_number: 2,
        locations: {
          dropoff: [
            {
              country: "Namibia",
              indexSearch: 4,
              city: "Windhoek",
              query: "w",
              coordinates: [-22.5537286, 17.0711856],
              averageGeo: 0,
              location_id: "ChIJf4iRcmQbCxwRJlzYl-vAkEg",
              street_name: false,
              location_name: "Windhoek Central Hospital",
              street: false,
              suburb: false,
              state: "Khomas",
              _id: "b3a9202c-fd92-443f-9c0e-5b347ef4eb57",
            },
            {
              country: "Namibia",
              indexSearch: 4,
              city: "Windhoek",
              query: "w",
              coordinates: [-22.5537286, 17.0711856],
              averageGeo: 0,
              location_id: "ChIJf4iRcmQbCxwRJlzYl-vAkEg",
              street_name: false,
              location_name: "Windhoek Central Hospital",
              street: false,
              suburb: false,
              state: "Khomas",
              _id: "b3a9202c-fd92-443f-9c0e-5b347ef4eb57",
            },
          ],
          pickup: {
            osm_id: 8401632320,
            country: "Namibia",
            city: "Windhoek",
            countrycode: "NA",
            postcode: "10007",
            locality: "Windhoek North",
            coordinates: { latitude: -22.55928, longitude: 17.07581 },
            type: "house",
            street_name: "Johann Albrecht Street",
            osm_type: "N",
            location_name: "Johann Albrecht Street",
            osm_key: "highway",
            street: "Johann Albrecht Street",
            district: "Windhoek North",
            osm_value: "bus_stop",
            name: "Inner City Church",
            suburb: "Windhoek North",
            state: "Khomas Region",
            isCity_supported: true,
          },
        },
        _id: "4f6ae1e5-d56b-47bd-92c7-7e0b2ab793e6",
        payment_method: "mobile_money",
        date_pickedup: null,
        clientData: {
          user_identifier:
            "9246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
          last_updated: "2022-07-13T21:10:54.000Z",
          gender: "male",
          account_verifications: {
            is_accountVerified: true,
            is_policies_accepted: true,
            phone_verification_secrets: {
              otp: 55576,
              date_sent: "2022-07-14T21:29:19.000Z",
            },
          },
          media: { profile_picture: "male.png" },
          date_registered: "2021-04-14T22:07:55.000Z",
          password: false,
          surname: "Tesh",
          name: "Jeff",
          phone_number: "+264856997867",
          _id: "900074b9bc7a4e14ea3ae3cac",
          account_state: "full",
          pushnotif_token: {
            isSubscribed: false,
            emailAddress: null,
            isSMSSubscribed: false,
            notificationPermissionStatus: null,
            smsUserId: null,
            isPushDisabled: false,
            emailUserId: null,
            smsNumber: null,
            hasNotificationPermission: true,
            isEmailSubscribed: false,
            userId: null,
            pushToken: null,
          },
          email: "jeff@gmail.com",
        },
        driverData: {
          identification_data: {
            date_updated: "2022-07-15T14:28:09.000Z",
            rating: 5,
            copy_id_paper: "id_paper.png",
            profile_picture: "user.png",
            banking_details: {
              bank_name: "FNB",
              account_number: "237823473843",
            },
            driver_licence_doc: "licence.png",
            title: "Mr",
            copy_blue_paper: "blue_paper.png",
            copy_public_permit: "public_permit.pdf",
            isAccount_verified: true,
            copy_white_paper: "white_paper.png",
            paymentNumber: 678998,
            personal_id_number: "N778821212IK",
          },
          date_updated: "2022-04-11T13:00:38.000Z",
          gender: "M",
          account_verifications: {
            phone_verification_secrets: {
              otp: 92123,
              date_sent: "2022-06-30T15:25:11.000Z",
            },
          },
          payments_information: {},
          date_registered: "2020-05-11T09:45:00.000Z",
          operation_clearances: "RIDE",
          passwod: "1234567",
          owners_information: false,
          surname: "Julius",
          driver_fingerprint:
            "aaaaa265bca710a49756d90e382f9591dceba4b26cc03c01aaca3828145376321f9b8b401ae7e1efa41c99e7f210ecc191c62b2dc7bcda566e312378e1a1fdf1b",
          suspension_infos: [
            {
              date: {},
              reason: "PAID_COMISSION",
              state: false,
              bot_locker: "Junkstem",
            },
          ],
          suspension_message: "false",
          name: "Jeremia",
          phone_number: "+264856997167",
          _id: "19996efe962c92a002ef1e79",
          cars_data: [
            {
              date_updated: {},
              permit_number: "23543-7748-993N",
              taxi_number: "H265",
              max_passengers: 4,
              taxi_picture: "default.png",
              car_brand: "Toyota Corolla",
              vehicle_type: "normalTaxiEconomy",
              plate_number: "N25578W",
              car_fingerprint: "dkjsdksjd2930293dskdjksdj20",
              date_registered: {},
            },
          ],
          isDriverSuspended: false,
          operational_state: {
            last_location: {
              country: "Namibia",
              location_name: "Inner City Church",
              date_updated: {},
              geographic_extent: false,
              prev_coordinates: {
                latitude: "-22.55928",
                longitude: "17.07581",
              },
              city: "Windhoek",
              street: "Johann Albrecht Street",
              coordinates: { latitude: "-22.40928", longitude: "17.08881" },
              suburb: "Windhoek West",
            },
            push_notification_token: "abc",
            default_selected_car: {
              vehicle_type: "normalTaxiEconomy",
              date_Selected: {},
              car_fingerprint: "dkjsdksjd2930293dskdjksdj20",
              max_passengers: 4,
            },
            status: "online",
          },
          regional_clearances: ["Windhoek"],
          email: "jeremiajulius@gmail.com",
        },
      }, //The selected request for focus, in the modal
      requestsMetaData: {
        ride: {
          inprogress: [
            {
              ride_mode: "RIDE",
              date_requested: "2022-07-14T22:59:10.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              request_fp:
                "3869456341d1a12d74c847470fa62d7efe9ea01ca3796aa9da2f67660649899c",
              client_id:
                "9246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 76 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 76,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "959858" },
              date_completedDropoff: null,
              areGoingTheSameWay: true,
              shopper_id: "false",
              passengers_number: 2,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 4,
                    city: "Windhoek",
                    query: "w",
                    coordinates: [-22.5537286, 17.0711856],
                    averageGeo: 0,
                    location_id: "ChIJf4iRcmQbCxwRJlzYl-vAkEg",
                    street_name: false,
                    location_name: "Windhoek Central Hospital",
                    street: false,
                    suburb: false,
                    state: "Khomas",
                    _id: "b3a9202c-fd92-443f-9c0e-5b347ef4eb57",
                  },
                  {
                    country: "Namibia",
                    indexSearch: 4,
                    city: "Windhoek",
                    query: "w",
                    coordinates: [-22.5537286, 17.0711856],
                    averageGeo: 0,
                    location_id: "ChIJf4iRcmQbCxwRJlzYl-vAkEg",
                    street_name: false,
                    location_name: "Windhoek Central Hospital",
                    street: false,
                    suburb: false,
                    state: "Khomas",
                    _id: "b3a9202c-fd92-443f-9c0e-5b347ef4eb57",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "4f6ae1e5-d56b-47bd-92c7-7e0b2ab793e6",
              payment_method: "mobile_money",
              date_pickedup: null,
              clientData: {
                user_identifier:
                  "9246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
                last_updated: "2022-07-13T21:10:54.000Z",
                gender: "male",
                account_verifications: {
                  is_accountVerified: true,
                  is_policies_accepted: true,
                  phone_verification_secrets: {
                    otp: 55576,
                    date_sent: "2022-07-14T21:29:19.000Z",
                  },
                },
                media: { profile_picture: "male.png" },
                date_registered: "2021-04-14T22:07:55.000Z",
                password: false,
                surname: "Tesh",
                name: "Jeff",
                phone_number: "+264856997867",
                _id: "900074b9bc7a4e14ea3ae3cac",
                account_state: "full",
                pushnotif_token: {
                  isSubscribed: false,
                  emailAddress: null,
                  isSMSSubscribed: false,
                  notificationPermissionStatus: null,
                  smsUserId: null,
                  isPushDisabled: false,
                  emailUserId: null,
                  smsNumber: null,
                  hasNotificationPermission: true,
                  isEmailSubscribed: false,
                  userId: null,
                  pushToken: null,
                },
                email: "jeff@gmail.com",
              },
              driverData: false,
            },
          ],
          completed: [],
          cancelled: [
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-16T18:59:39.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T18:59:47.000Z",
              request_fp:
                "bf0f1a632d002d6bc97614470520ee54167f0ed6282f7068abace28c7212cecb",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "606641" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "3aa2ccbf-027a-4a6e-9642-eb3d2d2cba1c",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-16T18:57:49.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T18:57:57.000Z",
              request_fp:
                "bf0f1a632d002d6bc97614470520ee54167f0ed6282f7068abace28c7212cecb",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "807380" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "5ccccc6e-9395-4e42-b73a-d21bb5030cb8",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-16T18:56:52.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T18:56:58.000Z",
              request_fp:
                "bf0f1a632d002d6bc97614470520ee54167f0ed6282f7068abace28c7212cecb",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "681808" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "1c31c5eb-ebf7-4b08-aa82-50ad2b9a5512",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-16T18:52:13.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T18:52:24.000Z",
              request_fp:
                "bf0f1a632d002d6bc97614470520ee54167f0ed6282f7068abace28c7212cecb",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "450661" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "3e8ae96b-6ea5-442a-b745-1fb52760e2f4",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-16T18:51:11.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T18:51:21.000Z",
              request_fp:
                "bf0f1a632d002d6bc97614470520ee54167f0ed6282f7068abace28c7212cecb",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "168121" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "f630ec7f-4046-4900-9a82-090e0aea0d24",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-16T17:56:21.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T17:56:37.000Z",
              request_fp:
                "4af18a323f2187e9945178c2dd90db31fd1e8fa1c121613a5b61d289c67fc843",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "184457" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "Kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "6156423e5fee9e00aa39a7ed",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "64c762b8-c284-4800-869f-61904834a8b2",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:51:55.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:52:17.000Z",
              request_fp:
                "3dfb4318eb2b35e49ed530ad16c2c4da626d6f1d61667c3eb787d20099aab9df",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "private",
              security: { pin: "167061" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "k",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a4b",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "0d3fdbd1-04b9-45e9-aa74-f2955cdc0c65",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:50:57.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:51:25.000Z",
              request_fp:
                "20b2d1acde347745b4238f263a61386c4557eee4f43c7847d1b00c997fd22af5",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 104 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 104,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "private",
              security: { pin: "253272" },
              date_completedDropoff: null,
              areGoingTheSameWay: true,
              shopper_id: "false",
              passengers_number: 2,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 2,
                    city: "Windhoek",
                    query: "k",
                    coordinates: [-22.5211336, 17.0598491],
                    averageGeo: 0,
                    location_id: "ChIJ4bymTfQcCxwRzqiJ9wv4Rxs",
                    street_name: false,
                    location_name: "Katutura",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a4d",
                    state: "Khomas",
                  },
                  {
                    country: "Namibia",
                    indexSearch: 2,
                    city: "Windhoek",
                    query: "k",
                    coordinates: [-22.5211336, 17.0598491],
                    averageGeo: 0,
                    location_id: "ChIJ4bymTfQcCxwRzqiJ9wv4Rxs",
                    street_name: false,
                    location_name: "Katutura",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a4d",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "9147ff8b-5e1b-4326-8905-5e3e6b25965b",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:44:39.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:45:13.000Z",
              request_fp:
                "c5d9432900f786a48e5c0c9e0e41854187673b0da53854bea990ae5d30c0c0cf",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 76 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 76,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "314418" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 3,
                    city: "Windhoek",
                    query: "ki",
                    coordinates: [-22.5740536, 17.1073953],
                    averageGeo: 0,
                    location_id:
                      "EiNLaWVrZWJ1c2ggU3RyZWV0LCBXaW5kaG9laywgTmFtaWJpYSIuKiwKFAoSCWG7AKvOBAscEdeHwNdJM0nOEhQKEgntAQyzXBsLHBE7XUTMQEm45A",
                    street_name: false,
                    location_name: "Kiekebush Street",
                    street: false,
                    suburb: false,
                    _id: "6161f64a35f50700bf3f5f81",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "8a31aa6a-f4dc-45a0-9c3c-d4e42e3ce4fc",
              payment_method: "cash",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:41:25.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:41:47.000Z",
              request_fp:
                "e607ba6f3b00a001b39282f7a4272de8dc2489416c0e8ddd40d141a9637db0b0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 160 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 160,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "023307" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 3,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 3,
                    city: "Windhoek",
                    query: "k",
                    coordinates: [-22.6217602, 17.1026698],
                    averageGeo: 0,
                    location_id: "ChIJERLnu0wFCxwRcqsVr6VWTOg",
                    street_name: false,
                    location_name: "Kleine Kuppe",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a4e",
                    state: "Khomas",
                  },
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "a",
                    coordinates: [-22.6093054, 17.0860553],
                    averageGeo: 0,
                    location_id: "ChIJCxTOvcQaCxwRGqbeyKRNcRs",
                    street_name: "Olympia",
                    location_name: "Arebbusch Travel Lodge",
                    street: "Olympia",
                    suburb: false,
                    _id: "61571b2fb42ca100988c2977",
                    state: "Khomas",
                  },
                  {
                    country: "Namibia",
                    indexSearch: 2,
                    city: "Windhoek",
                    query: "t",
                    coordinates: [-22.5725103, 17.0837666],
                    averageGeo: 0,
                    location_id:
                      "Eh1UYWwgU3RyZWV0LCBXaW5kaG9laywgTmFtaWJpYSIuKiwKFAoSCXvNAyc5GwscERCUI-xuo2CNEhQKEgntAQyzXBsLHBE7XUTMQEm45A",
                    street_name: false,
                    location_name: "Tal Street",
                    street: false,
                    suburb: false,
                    _id: "6156f63bc691ea009777b4f8",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "ad1bc1c1-bfcf-4e5a-80d4-90ba1823aeca",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:40:25.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:40:55.000Z",
              request_fp:
                "185810cdf03a3760f16aac15d59e863e191839a3d5ea91e83e5d598c92c091eb",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 76 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 76,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "776792" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 1,
                    city: "Windhoek",
                    query: "a",
                    coordinates: [-22.57659419999999, 17.1088963],
                    averageGeo: 0,
                    location_id: "ChIJa4YU9M4ECxwRUskOmCi7SUE",
                    street_name: "Jan Jonker",
                    location_name: "Am Weinberg Boutique Hotel",
                    street: "Jan Jonker",
                    suburb: false,
                    _id: "61571b2fb42ca100988c2978",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "da63236d-8059-4387-87aa-e0d88d2e8821",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:36:47.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:36:57.000Z",
              request_fp:
                "b2292c8b42865f65926190a4ceebe958dfc2b3574a705d1dbbb5dd5ad4b44c2d",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "352537" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kho",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0df659ce00c65930b9",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "873df668-df59-4026-a3f7-4a236fcb16e7",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:32:53.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:33:01.000Z",
              request_fp:
                "d6f8e39e5fbb35ab762c2e5926f5a08029db16fe40b714fc88ae2e74b9d45532",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "165726" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "khom",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0e1cab98009b39b3a1",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "8ee6d294-abcc-4dac-b8bf-02a6f56bc197",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:29:43.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:29:49.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "692703" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "62d6d58c-965e-4ade-a0f1-27152066ebb7",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:27:58.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:28:20.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "401002" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "d111c74d-88df-4f24-83a6-6d60e09f72e7",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T22:26:13.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:26:33.000Z",
              request_fp:
                "42de3e0c81722f507dbd94da9b1107d269bc067a84ff540e8ac5fae251e67bce",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "private",
              security: { pin: "128535" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "615099c7-ec33-436a-aae2-b26596c216ac",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:40:56.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:41:06.000Z",
              request_fp:
                "b1b0b90609a6c15c25fbf8b97fb67664f7566f2e7b4df818c31792801248341e",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 104 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 104,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "private",
              security: { pin: "696672" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 2,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kat",
                    coordinates: [-22.5211336, 17.0598491],
                    averageGeo: 0,
                    location_id: "ChIJ4bymTfQcCxwRzqiJ9wv4Rxs",
                    street_name: false,
                    location_name: "Katutura",
                    street: false,
                    suburb: false,
                    _id: "6157da1ae9059900c79288e3",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "9bf8d33f-9908-41c1-b62f-8eef13ddd8eb",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:35:42.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:36:20.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "234498" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "be055b12-91c6-451d-be0a-b020df12c15c",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:27:32.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:30:29.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "634203" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "6cf79b17-2fd6-4d72-a3f2-0af2319ed5f8",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:24:45.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:24:53.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "868807" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "24bc3a52-5e59-471d-bee2-631f70574790",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:22:53.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:24:19.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "203136" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "fe0716f7-1e37-4c5d-abb8-ae54c702a1cf",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:09:19.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:09:29.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "045190" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "9ab14c0c-6735-4cdb-b296-bc9d53e6b854",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:06:17.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:06:43.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "546159" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "5bb96124-a24e-4301-83e4-a93871f0ea64",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T21:03:58.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:04:06.000Z",
              request_fp:
                "40aacc057894293e8d6d0492e0e5d7b4130f0e45b3b7f7a5438218ceaf38fca8",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 62 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 62,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "624548" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "32e5148e-5837-4b66-a014-c06fd6b71e4d",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T20:57:41.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T20:58:27.000Z",
              request_fp:
                "15aa76cdc8cebee164274ae1a17e6e99eafed15edc020b431eb70cdae3deb6c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "026660" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "3f4784c2-ac7a-4a4f-a011-4f298a22406c",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "RIDE",
              date_requested: "2022-06-14T14:26:17.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                inRouteToDropoff: false,
                completedDropoff: false,
                inRouteToPickup: false,
                completedRatingClient: false,
                isAccepted: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T14:37:46.000Z",
              request_fp:
                "15aa76cdc8cebee164274ae1a17e6e99eafed15edc020b431eb70cdae3deb6c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: { fare: 31 },
              request_documentation: { note: "" },
              ride_selected: {
                country: "Namibia",
                app_label: "Normal Taxi",
                city: ["Windhoek", "Swakopmund", "Walvis Bay"],
                base_fare: 31,
                description: "Affordable rides",
                id: 1,
                media: { car_app_icon: "normalTaxiEconomy.jpeg" },
                availability: "available",
                category: "Economy",
                ride_type: "RIDE",
                car_type: "normalTaxiEconomy",
              },
              ride_style: "shared",
              security: { pin: "951190" },
              date_completedDropoff: null,
              areGoingTheSameWay: false,
              shopper_id: "false",
              passengers_number: 1,
              locations: {
                dropoff: [
                  {
                    country: "Namibia",
                    indexSearch: 0,
                    city: "Windhoek",
                    query: "kh",
                    coordinates: [-22.5454963, 17.0480378],
                    averageGeo: 0,
                    location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                    street_name: false,
                    location_name: "Khomasdal",
                    street: false,
                    suburb: false,
                    _id: "61571d0d1d8f6c00ae445a50",
                    state: "Khomas",
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "8d9954b9-64c5-42ca-a231-faa66dc5f730",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
          ],
        },
        delivery: {
          inprogress: [
            {
              ride_mode: "DELIVERY",
              date_requested: "2022-07-14T23:10:08.000Z",
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              request_fp:
                "6966f0f3c2862d12e8d5108c3a2937a597f0db8540335c631026ee1602e6a0c6",
              client_id:
                "10006a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "034500" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Janelle",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kho",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      state: "Khomas",
                      _id: "1f06c6c6-7c5d-440b-bc89-cbfc3aeb8a4a",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "8f6e0fef-83ff-4988-b431-497b2ee2cb5c",
              payment_method: "cash",
              date_pickedup: null,
              clientData: {
                user_identifier:
                  "10006a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
                last_updated: "2022-06-17T19:56:26.000Z",
                gender: "Female",
                account_verifications: {
                  is_accountVerified: true,
                  is_policies_accepted: true,
                  phone_verification_secrets: {},
                },
                media: { profile_picture: "female.png" },
                date_registered: "2022-06-17T19:56:10.000Z",
                password: false,
                surname: "Wright",
                name: "Jessica",
                phone_number: "+264812994083",
                _id: "70000a32-4e72-41de-8d01-fafb9abc74ec",
                account_state: "full",
                pushnotif_token: {
                  isSubscribed: false,
                  emailAddress: null,
                  isSMSSubscribed: false,
                  notificationPermissionStatus: null,
                  smsUserId: null,
                  isPushDisabled: false,
                  emailUserId: null,
                  smsNumber: null,
                  hasNotificationPermission: true,
                  isEmailSubscribed: false,
                  userId: null,
                  pushToken: null,
                },
                email: "jessica@gmail.com",
              },
              driverData: false,
            },
          ],
          completed: [],
          cancelled: [
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-16T19:53:30.000Z",
              request_fp:
                "411f94409579c7a0a99013317c26d2c10b355992ec332e1c0997318954d1689b",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "774677" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Soulstice Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "c1a74ef5-b198-4374-86dd-a696a688936c",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:53:29.000Z",
              request_fp:
                "ed8c7677e009eb4d86dac4e13b78a016e76cca6c855d65f59cc486814009c47c",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "128997" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "l",
                      coordinates: [-22.5666347, 17.1056232],
                      averageGeo: 0,
                      location_id: "ChIJIzO9LrQECxwRFhtWcz7-rQc",
                      street_name: false,
                      location_name: "Ludwigsdorf",
                      street: false,
                      suburb: false,
                      _id: "61598e48b42ca100988c2ce8",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "e3457f49-a938-4dbd-a56c-288909b61131",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:50:29.000Z",
              request_fp:
                "64d7e7492f44b46f762b508bc51f094ac5eef63c6cb16d5def5ae0582b1ba26c",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "832843" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 1,
                      city: "Windhoek",
                      query: "k",
                      coordinates: [-22.5717665, 17.0982397],
                      averageGeo: 0,
                      location_id: "ChIJRZRyw0obCxwRYRT3DhYSGn4",
                      street_name: false,
                      location_name: "Klein Windhoek",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a4c",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "704d4b12-13de-4294-a74d-b33142925da3",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:46:03.000Z",
              request_fp:
                "221a09e51ea9c8797231303712e0a461866c08756c157857b6518556d3485193",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "814355" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Plo",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 3,
                      city: "Windhoek",
                      query: "l",
                      coordinates: [-22.5544392, 17.0879244],
                      averageGeo: 0,
                      location_id:
                        "EiRMaWxpZW5jcm9uIFN0cmVldCwgV2luZGhvZWssIE5hbWliaWEiLiosChQKEgmxfflGWhsLHBGMYU3s4UZAAhIUChIJ7QEMs1wbCxwRO11EzEBJuOQ",
                      street_name: false,
                      location_name: "Liliencron Street",
                      street: false,
                      suburb: false,
                      _id: "61598e48b42ca100988c2ceb",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "cc2b9957-b9e1-40a9-8638-7514eec0057e",
              payment_method: "cash",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:42:45.000Z",
              request_fp:
                "303a18d5998f4e4290934e6e597d1c9017320006af3978b05eaa33c86e921a4f",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "451658" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 2,
                      city: "Windhoek",
                      query: "K",
                      coordinates: [-22.5211336, 17.0598491],
                      averageGeo: 0,
                      location_id: "ChIJ4bymTfQcCxwRzqiJ9wv4Rxs",
                      street_name: false,
                      location_name: "Katutura",
                      street: false,
                      suburb: false,
                      _id: "61564239f4811b0094696671",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "9f69c143-1759-4683-8db3-617d059ee06a",
              payment_method: "cash",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:39:19.000Z",
              request_fp:
                "432fc662b40a9b35bf295750c60de112193dc60a3d9f3ac1dc05933db2f9a2f3",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "330457" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 3,
                      city: "Windhoek",
                      query: "a",
                      coordinates: [-22.6104205, 17.0712807],
                      averageGeo: 0,
                      location_id: "ChIJn8xVye4aCxwRKcworZ_nnuw",
                      street_name: false,
                      location_name: "Academia",
                      street: false,
                      suburb: false,
                      _id: "61571b2fb42ca100988c2979",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "21f3db31-7c41-431c-b015-09f6d495174b",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:37:29.000Z",
              request_fp:
                "d13a276181018eb29849d96703f37685a862314bca84c24ab00d47121ff4cd77",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "189492" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "52653cc5-8cba-45db-b68d-3de746e5d4bd",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:33:35.000Z",
              request_fp:
                "d13a276181018eb29849d96703f37685a862314bca84c24ab00d47121ff4cd77",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "209265" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "81987b42-d77c-498c-a1af-fa890ad435c1",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T22:30:39.000Z",
              request_fp:
                "4f53af9d40e5a005067e118014be4a4399563ac553a26d51523e167a283c3427",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "630604" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kho",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0df659ce00c65930b9",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "4a73f352-b555-4dc0-a08a-022cc9a3c91c",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:41:53.000Z",
              request_fp:
                "47035812df8cc44ee39998cac6a87c112e25bedc610df3ebc1512428ae9c5dc0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "599223" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kho",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0df659ce00c65930b9",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "ecdf48b4-2cd3-4aef-848c-00f55d679455",
              payment_method: "cash",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:40:26.000Z",
              request_fp:
                "4f53af9d40e5a005067e118014be4a4399563ac553a26d51523e167a283c3427",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "820293" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kho",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0df659ce00c65930b9",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "79b53986-c193-4454-beb7-e0d1b3258b48",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:37:06.000Z",
              request_fp:
                "4f53af9d40e5a005067e118014be4a4399563ac553a26d51523e167a283c3427",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "295675" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kho",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0df659ce00c65930b9",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "1503e408-b656-4428-b5d3-891c44c96411",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:31:39.000Z",
              request_fp:
                "d13a276181018eb29849d96703f37685a862314bca84c24ab00d47121ff4cd77",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "775330" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "79a8a5ae-0be5-40ad-8844-e35c5b819071",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:27:10.000Z",
              request_fp:
                "d13a276181018eb29849d96703f37685a862314bca84c24ab00d47121ff4cd77",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "612490" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "7566db9d-29fb-4f6c-a706-d0b683567016",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:22:35.000Z",
              request_fp:
                "6e134a82712115823b0eb54cb5de9ec8a33279b4fc7a0e72ab1efe3dcb53e32e",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "560315" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "2cc0f9b2-a21f-425e-8488-daaf6f7857d5",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:14:27.000Z",
              request_fp:
                "d13a276181018eb29849d96703f37685a862314bca84c24ab00d47121ff4cd77",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "672153" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "1fd97352-8cb3-4f8d-8b35-a973ccb83969",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T21:12:17.000Z",
              request_fp:
                "d13a276181018eb29849d96703f37685a862314bca84c24ab00d47121ff4cd77",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "512158" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kh",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0d1d8f6c00ae445a50",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "2d105d1e-2870-43c1-bbb0-7bef2e57dc32",
              payment_method: "mobile_money",
              date_pickedup: null,
            },
            {
              ride_mode: "DELIVERY",
              date_requested: {},
              request_type: "immediate",
              date_clientRatedRide: null,
              request_state_vars: {
                completedDropoff: false,
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                inRouteToDropoff: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              date_cancelled: "2022-06-14T15:14:42.000Z",
              request_fp:
                "47035812df8cc44ee39998cac6a87c112e25bedc610df3ebc1512428ae9c5dc0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_routeToDropoff: null,
              totals_request: {
                service_fee: "N$5.00",
                delivery_fee: "N$45.00",
                total: "N$50.00",
              },
              request_documentation: { note: "" },
              security: { pin: "418898" },
              date_completedDropoff: null,
              shopper_id: "false",
              locations: {
                dropoff: [
                  {
                    name: "Spa",
                    phone: "+264856997167",
                    dropoff_location: {
                      country: "Namibia",
                      indexSearch: 0,
                      city: "Windhoek",
                      query: "kho",
                      coordinates: [-22.5454963, 17.0480378],
                      averageGeo: 0,
                      location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                      street_name: false,
                      location_name: "Khomasdal",
                      street: false,
                      suburb: false,
                      _id: "61571d0df659ce00c65930b9",
                      state: "Khomas",
                    },
                  },
                ],
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
              },
              _id: "d830d882-ba8f-46f2-b956-4827125c8015",
              payment_method: "cash",
              date_pickedup: null,
            },
          ],
        },
        shopping: {
          inprogress: [
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-07-14T23:14:13.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$27.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Morvite Vanilla Flavour Original Instant Porridge 1kg",
                  index: 1368,
                  sku: "MORVITE_VANILLA_FLAVOUR_ORIGINAL_INSTANT_PORRIDGE_1KG",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10168076EAV2-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxNTE2MHxpbWFnZS93ZWJwfGltYWdlcy9oMGUvaGUzLzk1NzM5MzIwNDAyMjIud2VicHwzNzIzNWNlOTY1MTRlOGJjMmVhYTliYjE0YWI4ZjdlOTI1YWU3ODMwOWNhMjk2ZDAwOTU5OGY4YWQyYTQ4ZDA3",
                    ],
                  ],
                },
                {
                  price: "N$54,90",
                  meta: {
                    store_fp: "kfc9537807322322",
                    structured: "false",
                    store: "KFC",
                    category: "BOX MEALS",
                    subcategory: "BOX MEALS",
                  },
                  name: "Wrapsta Box with a Buddy Bottle",
                  index: 6,
                  sku: "WRAPSTA BOX WITH A BUDDY BOTTLE",
                  items: 1,
                  pictures: [
                    "https://order.kfc.co.za//Content/OnlineOrderingImages/Menu/Items/wrapsta_bb.jpg?v=2.13",
                  ],
                },
                {
                  price: "N$101.97",
                  meta: {
                    website_link: "https://www.pnp.co.za",
                    category: "BAKERY",
                    subcategory: "BAKERY",
                    shop_name: "PICK N PAY",
                  },
                  name: "PnP Brown Pita Breads 4s",
                  base_price: "N$33.99",
                  index: 0,
                  sku: "000000000000787509_EA",
                  items: 3,
                  pictures: [
                    "https://cdn-prd-02.pnp.co.za/sys-master/images/hea/h80/10770829377566/silo-product-image-v2-15Mar2022-180205-6001000052079-Straight_on-6809-18111_515Wx515H",
                  ],
                },
              ],
              request_fp:
                "02643738bae8802ef6d413d321cde4c62ece42f7febcc7eea7d7e7b35e61f8c9",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$320.00",
                cart: "N$185.00",
                cash_pickup_fee: "N$45.00",
              },
              request_documentation: { note: "Howdy!" },
              security: { pin: "726885" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 3,
                  city: "Windhoek",
                  query: "khom",
                  coordinates: [-22.5536966, 17.0378274],
                  averageGeo: 0,
                  location_id: "ChIJIxgSl8wbCxwRIJt5mEG_Gqs",
                  street_name: "Greenshank Street",
                  location_name: "Khomas Hill",
                  street: "Greenshank Street",
                  suburb: false,
                  state: "Khomas",
                  _id: "2d143b5b-7f25-4659-822d-517d4f17e1b5",
                },
              },
              _id: "19b88310-0510-43c6-bf34-6a4c364af19a",
              payment_method: "cash",
              clientData: {
                user_identifier:
                  "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
                last_updated: "2022-07-13T21:10:54.000Z",
                gender: "male",
                account_verifications: {
                  is_accountVerified: true,
                  is_policies_accepted: true,
                  phone_verification_secrets: {
                    otp: 55576,
                    date_sent: "2022-07-14T21:29:19.000Z",
                  },
                },
                media: { profile_picture: "male.png" },
                date_registered: "2021-04-14T22:07:55.000Z",
                password: false,
                surname: "Kanyik",
                name: "Dominique",
                phone_number: "+264856997167",
                _id: "60774b9bc7a4e14ea3ae3cac",
                account_state: "full",
                pushnotif_token: {
                  isSubscribed: false,
                  emailAddress: null,
                  isSMSSubscribed: false,
                  notificationPermissionStatus: null,
                  smsUserId: null,
                  isPushDisabled: false,
                  emailUserId: null,
                  smsNumber: null,
                  hasNotificationPermission: true,
                  isEmailSubscribed: false,
                  userId: null,
                  pushToken: null,
                },
                email: "do@gmail.com",
              },
              driverData: false,
            },
          ],
          completed: [],
          cancelled: [
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-07-10T23:54:56.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$22.99",
                  meta: {
                    website_link: "https://www.checkers.co.za",
                    description: "",
                    category: "FOOD",
                    subcategory: "FOOD",
                    shop_name: "CHECKERS",
                  },
                  name: "Futurelife High Protein Sliced Ancient Grain Brown Bread Loaf",
                  index: 25,
                  sku: "FUTURELIFE_HIGH_PROTEIN_SLICED_ANCIENT_GRAIN_BROWN_BREAD_LOAF",
                  items: 1,
                  pictures: [
                    "https://www.checkers.co.za/medias/10692844EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxODk5NHxpbWFnZS93ZWJwfGltYWdlcy9oNGMvaGQ1Lzk4NDU0NjY4NTc1MDIud2VicHw0YzYxNDM4NDY0ZDMxNzZkMTI0NTJmNzkwYTgzNTI4MGMyOTEzNzZkMGE5OTRlZmFhOTdkMWNjODgwYjczYjJh",
                  ],
                },
                {
                  price: "N$11.79",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Natures Garden Frozen Hawaiian Stir Fry 250g",
                  index: 1354,
                  sku: "NATURES_GARDEN_FROZEN_HAWAIIAN_STIR_FRY_250G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10469137EA-20190726-Media-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wyMTY1NnxpbWFnZS93ZWJwfGltYWdlcy9oNzIvaDllLzkwMDM2OTAyNjI1NTgud2VicHwyNjMxZWE2YTExN2QyMmQ1Y2FmMDZjYjRiOTZiYTcyMTI5OGU5M2JkZDg2OWFmMWI3MDVmYjQwYThmYTQ4MTdi",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-07-10T23:55:26.000Z",
              request_fp:
                "702a4bc6766444084a89c00210954ad0f6e64da876a095187f2088a1ed0b794d",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$125.00",
                cart: "N$35.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "385557" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 1,
                  city: "Windhoek",
                  query: "klein w",
                  coordinates: [-22.5717665, 17.0982397],
                  averageGeo: 0,
                  location_id: "ChIJRZRyw0obCxwRYRT3DhYSGn4",
                  street_name: false,
                  location_name: "Klein Windhoek",
                  street: false,
                  suburb: false,
                  state: "Khomas",
                  _id: "7845b3a0-19b0-498d-9e2f-44ddd9fa76c2",
                },
              },
              _id: "6ec20b48-e02b-4d09-b5dc-8b0c67e34695",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-05T15:48:26.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: 4,
                  comments: "",
                  compliments: [
                    "Expert shopper",
                    "Very fast",
                    "Excellent service",
                  ],
                  date_rated: {},
                },
              },
              request_fp:
                "29bab2cfbff33c85fea2ec131f6b7cf1655de6a868673a767f948ad6102d048f",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: "2022-07-01T21:29:04.000Z",
              date_routeToDelivery: "2022-07-01T21:19:51.000Z",
              security: { pin: 56473 },
              date_accepted: "2022-07-01T22:47:03.000Z",
              car_fingerprint: "false",
              payment_method: "mobile_money",
              date_clientRatedRide: "2022-06-05T19:57:01.000Z",
              shopping_list: [
                {
                  price: "N$110,90",
                  meta: {
                    store_fp: "kfc9537807322322",
                    structured: "false",
                    store: "KFC",
                    category: "FAMILY TREAT",
                    subcategory: "FAMILY TREAT",
                  },
                  name: "Kentucky for 2 with buddy drinks",
                  index: 6,
                  date_shoped: "2022-07-01T21:19:31.000Z",
                  sku: "KENTUCKY FOR 2 WITH BUDDY DRINKS",
                  items: 1,
                  pictures: [
                    "https://order.kfc.co.za//Content/OnlineOrderingImages/Menu/Items/Kentucy_For_2_Buddy.jpg?v=2.13",
                  ],
                },
              ],
              date_cancelled: "2022-07-10T23:29:14.000Z",
              intentional_request_decline: [
                "91ae265bca710a49756d90e382f9591dceba4b26cc03c01aaca3828145376321f9b8b401ae7e1efa41c99e7f210ecc191c62b2dc7bcda566e312378e1a1fdf1b",
              ],
              request_documentation: { note: "" },
              totals_request: {
                service_fee: "N$90.00",
                total: "N$201.00",
                cart: "N$111.00",
                cash_pickup_fee: "N$0.00",
              },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "k",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a4b",
                  state: "Khomas",
                },
              },
              _id: "629cd0691df3e81547ee8160",
              date_pickedup: "2022-06-30T23:53:59.000Z",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-16T17:58:19.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$549.90",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  base_price: "N$54.99",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 10,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-16T17:58:45.000Z",
              request_fp:
                "af0d0a836d9a8102985607a42afa5b2cf7ded5d7d3f8609fae739596f65bf0a2",
              client_id:
                "830a9c94d4bbab83abe06a60dd513e4e5fb5a04b8988cc87d8697ea762a39b797b5363dc94a332a9dd1c50b48e05a5025b223d410fddab5cee1de3f21a69e3a0",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$640.00",
                cart: "N$550.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "404803" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "Windhoek we",
                  coordinates: [-22.5628016, 17.074614],
                  averageGeo: 0,
                  location_id: "ChIJdwAsjmMbCxwR0FfTMAbwt58",
                  street_name: false,
                  location_name: "Windhoek West",
                  street: false,
                  suburb: false,
                  _id: "6156dec0f4811b0094696948",
                  state: "Khomas",
                },
              },
              _id: "622f83d8-61b1-4157-a6f5-632dc06f0ac2",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:54:19.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$69.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Dr. Oetker La Mia Grande La Salami Stone-Baked Pizza 409g",
                  index: 4391,
                  sku: "DR._OETKER_LA_MIA_GRANDE_LA_SALAMI_STONE-BAKED_PIZZA_409G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10765712EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wyNzU5NnxpbWFnZS93ZWJwfGltYWdlcy9oN2EvaDk1Lzk3NDk1MTIwOTM3MjYud2VicHw4NjQ4Yjc3NmQxNzJmMzM3MDI0YWRlN2UzZDg2MTRhMDAyMDIwZTM5MDI3YjBiODQ0ZGY3NWM4YzFhOTJiZTg4",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:54:31.000Z",
              request_fp:
                "5e8c459895b8755201fc51eb4873990643d6bd0e2b3baa06cddf02e0357d0c2d",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$160.00",
                cart: "N$70.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "152840" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 2,
                  city: "Windhoek",
                  query: "u",
                  coordinates: [-22.6121691, 17.0583726],
                  averageGeo: 0,
                  location_id: "ChIJKWYu3_YaCxwR3WevzHplS4s",
                  street_name: false,
                  location_name: "University of Namibia",
                  street: false,
                  suburb: false,
                  _id: "615aaf48f659ce00c65937bf",
                  state: "Khomas",
                },
              },
              _id: "d69a0462-8ce2-4927-8fda-9881d67b8ea2",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:48:43.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$ 59.90",
                  meta: {
                    store_fp: "debonairs97639807992322",
                    structured: "false",
                    store: "DEBONAIRS",
                    category: "CHICKEN PIZZAS",
                    subcategory: "CHICKEN PIZZAS",
                  },
                  name: "Tikka Chicken",
                  index: 10,
                  sku: "TIKKA_CHICKEN",
                  items: 1,
                  pictures: [
                    "https://debonairspizza-na-raw.yumbi.com/management/api/resource/?id=4199&ts=1638944211000",
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:49:23.000Z",
              request_fp:
                "9b23e77b6f4c08a3f2aee801c87f2cf8a23b35bae861bc0cf8e4eb542c51b27e",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$150.00",
                cart: "N$60.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "956759" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "ol",
                  coordinates: [-22.6033298, 17.1063616],
                  averageGeo: 0,
                  location_id: "ChIJISwREjIFCxwRESQ6tPx6B9E",
                  street_name: false,
                  location_name: "Olympia",
                  street: false,
                  suburb: false,
                  _id: "61570509b42ca100988c2947",
                  state: "Khomas",
                },
              },
              _id: "d3dd0bb7-5f7c-4788-b318-daba95941c36",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:46:39.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$84.99",
                  meta: {
                    store_fp: "picknpay8837887322322",
                    structured: "true",
                    store: "PICK N PAY",
                    category: "BAKERY",
                    subcategory: "BAKERY",
                  },
                  name: "PnP Red Velvet & Carrot Cake 2s",
                  index: 238,
                  sku: "000000000000758739_EA",
                  items: 1,
                  pictures: [
                    [
                      "https://cdn-prd-02.pnp.co.za/sys-master/images/h3c/hab/10415781675038/silo-product-image-v2-01Sep2021-180124-6001000004887-front-1576896-243_515Wx515H",
                      "https://cdn-prd-02.pnp.co.za/sys-master/images/h65/h97/10415786721310/silo-product-image-v2-01Sep2021-180125-6001000004887-up-1585996-266_515Wx515H",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:47:19.000Z",
              request_fp:
                "7d07c377f35184cd0aafa157195874962f7abe1a86fd0fc32bb186517a5e4f89",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$175.00",
                cart: "N$85.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "023746" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "t",
                  coordinates: [-22.6203855, 17.0934667],
                  averageGeo: 0,
                  location_id: "ChIJ-xOnybYaCxwRgS43Ri4IGoA",
                  street_name: "Chasie Street",
                  location_name: "The Grove Mall",
                  street: "Chasie Street",
                  suburb: false,
                  _id: "6156f63bc691ea009777b4f6",
                  state: "Khomas",
                },
              },
              _id: "1189b47b-6748-4f49-911d-d5539feafb11",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:43:25.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$18.99",
                  meta: {
                    store_fp: "pephome8937557322322",
                    structured: "false",
                    store: "PEP",
                    category: "LADIESWEAR",
                    subcategory: "LADIES ACCESSORIES",
                  },
                  name: "Knit Gloves",
                  index: 298,
                  sku: "KNIT_GLOVES",
                  items: 1,
                  pictures: [
                    [
                      "https://www.pepstores.com/cdn-proxy/prod-pep-cdn/product-images/prod/600_600_CXC33_web_PNG.webp",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:44:05.000Z",
              request_fp:
                "bbea6f570e30af14b87f200998dd9975551d657fe29435d19ff9b66dc53834c1",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$154.00",
                cart: "N$19.00",
                cash_pickup_fee: "N$45.00",
              },
              request_documentation: { note: "" },
              security: { pin: "908401" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 4,
                  city: "Windhoek",
                  query: "k",
                  coordinates: [-22.5625816, 17.0999503],
                  averageGeo: 0,
                  location_id: "ChIJV1qQo0wbCxwRK4vHBt3mlmc",
                  street_name: "Hofmeyer Street",
                  location_name: "Klein Windhoek Guest House",
                  street: "Hofmeyer Street",
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a4f",
                  state: "Khomas",
                },
              },
              _id: "c289a049-20b3-4142-b991-58efc60f9469",
              payment_method: "cash",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:38:25.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$64,90",
                  meta: {
                    store_fp: "kfc9537807322322",
                    structured: "false",
                    store: "KFC",
                    category: "BOX MEALS",
                    subcategory: "BOX MEALS",
                  },
                  name: "All Star Box with Buddy Bottle",
                  index: 80,
                  sku: "ALL STAR BOX WITH BUDDY BOTTLE",
                  items: 1,
                  pictures: [
                    "https://order.kfc.co.za//Content/OnlineOrderingImages/Menu/Items/allstarlunchbb.jpg?v=2.13",
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:38:31.000Z",
              request_fp:
                "d351053bd1f43b464f0298f643ea8a8486aeceb141e843b62803ec717267791d",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$155.00",
                cart: "N$65.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "105057" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 3,
                  city: "Windhoek",
                  query: "k",
                  coordinates: [-22.6217602, 17.1026698],
                  averageGeo: 0,
                  location_id: "ChIJERLnu0wFCxwRcqsVr6VWTOg",
                  street_name: false,
                  location_name: "Kleine Kuppe",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a4e",
                  state: "Khomas",
                },
              },
              _id: "7e044e80-d7bf-4e2d-880b-7b57463a5e9b",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:37:51.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$54.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:37:59.000Z",
              request_fp:
                "ba4c29b738df793eb1985a51ce52e89041145eae0748f49ff41675b9c57926c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$145.00",
                cart: "N$55.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "308078" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "58fd53a0-ea9d-461d-bc1d-56a77f362a48",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:33:57.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$54.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:34:01.000Z",
              request_fp:
                "ba4c29b738df793eb1985a51ce52e89041145eae0748f49ff41675b9c57926c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$145.00",
                cart: "N$55.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "381270" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "3eb3a119-7462-479e-98ed-8760edea3240",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T22:31:17.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$21.99",
                  meta: {
                    store_fp: "picknpay8837887322322",
                    structured: "true",
                    store: "PICK N PAY",
                    category: "FRESH FRUIT & VEGETABLES",
                    subcategory: "FRESH FRUIT & VEGETABLES",
                  },
                  name: "PnP Salad Dressing Honey Mustard 340ml",
                  index: 158,
                  sku: "000000000000458088_EA",
                  items: 1,
                  pictures: [
                    [
                      "https://cdn-prd-02.pnp.co.za/sys-master/images/h9d/hbd/10656924991518/silo-product-image-v2-22Jan2022-180103-6001007222260-front-2834200-726_515Wx515H",
                      "https://cdn-prd-02.pnp.co.za/sys-master/images/h0b/h64/10656928923678/silo-product-image-v2-22Jan2022-180103-6001007222260-up-2834290-713_515Wx515H",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T22:31:29.000Z",
              request_fp:
                "cd83e67c2c08b09534904e9d19a6671be3779bd0c5461e070a4a9a3ecbc178e7",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$112.00",
                cart: "N$22.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "898458" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "b7408f2d-ec2c-4c70-88f6-b485336a6015",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T21:42:27.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$34,90",
                  meta: {
                    store_fp: "kfc9537807322322",
                    structured: "false",
                    store: "KFC",
                    category: "ANYTIME SNACKING",
                    subcategory: "ANYTIME SNACKING",
                  },
                  name: "4 Dunked Wings",
                  index: 68,
                  sku: "4 DUNKED WINGS",
                  items: 1,
                  pictures: [
                    "https://order.kfc.co.za//Content/OnlineOrderingImages/Menu/Items/4dunkedwings_only.jpg?v=2.13",
                  ],
                },
              ],
              date_cancelled: "2022-06-14T21:42:42.000Z",
              request_fp:
                "49fba9ddb8286603b7d1af2126afc880d835e276cabbfe39672b66748b86e377",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$125.00",
                cart: "N$35.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "427379" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "khom",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0e1cab98009b39b3a1",
                  state: "Khomas",
                },
              },
              _id: "01229e5e-8c64-4491-b0e8-f42e1a745594",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T21:39:10.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$69.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Dr. Oetker La Mia Grande La Salami Stone-Baked Pizza 409g",
                  index: 4391,
                  sku: "DR._OETKER_LA_MIA_GRANDE_LA_SALAMI_STONE-BAKED_PIZZA_409G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10765712EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wyNzU5NnxpbWFnZS93ZWJwfGltYWdlcy9oN2EvaDk1Lzk3NDk1MTIwOTM3MjYud2VicHw4NjQ4Yjc3NmQxNzJmMzM3MDI0YWRlN2UzZDg2MTRhMDAyMDIwZTM5MDI3YjBiODQ0ZGY3NWM4YzFhOTJiZTg4",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T21:39:33.000Z",
              request_fp:
                "b2e7630d4e33136b67643593503c1d5bc73eb654466b2022525e85da5eb00c3b",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$160.00",
                cart: "N$70.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "126184" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "khom",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0e1cab98009b39b3a1",
                  state: "Khomas",
                },
              },
              _id: "3773cbd9-ee76-4cce-9392-b2cf140357e5",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T21:38:08.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$54.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T21:38:26.000Z",
              request_fp:
                "c86fea956c7f4cd5308909fa5b94aa1dd22dd378d5989cc9e5ed37ebdeff6f69",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$145.00",
                cart: "N$55.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "939370" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "khom",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0e1cab98009b39b3a1",
                  state: "Khomas",
                },
              },
              _id: "788353ae-ea60-401c-9ed7-886b4c862847",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T21:32:25.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$54.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T21:35:09.000Z",
              request_fp:
                "ba4c29b738df793eb1985a51ce52e89041145eae0748f49ff41675b9c57926c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$145.00",
                cart: "N$55.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "920738" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "ef14a72e-baf8-43e2-976d-5c665e1dc340",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T21:21:39.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$54.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T21:21:45.000Z",
              request_fp:
                "ba4c29b738df793eb1985a51ce52e89041145eae0748f49ff41675b9c57926c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$145.00",
                cart: "N$55.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "124874" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "512af3ef-3a5b-4312-b6b4-d876f0e9cee4",
              payment_method: "mobile_money",
            },
            {
              date_routeToShop: null,
              ride_mode: "SHOPPING",
              date_requested: "2022-06-14T21:15:45.000Z",
              request_type: "immediate",
              request_state_vars: {
                inRouteToPickupCash: false,
                completedRatingClient: false,
                isAccepted: false,
                didPickupCash: false,
                completedShopping: false,
                inRouteToShop: false,
                inRouteToDelivery: false,
                rating_data: {
                  rating: false,
                  compliments: [],
                  comments: false,
                },
              },
              shopping_list: [
                {
                  price: "N$54.99",
                  meta: {
                    store_fp: "checkers99639807992322",
                    structured: "false",
                    store: "CHECKERS",
                    category: "FOOD",
                    subcategory: "FOOD",
                  },
                  name: "Mezé Feta Fingers With Herbs 350g",
                  index: 4392,
                  sku: "MEZÉ_FETA_FINGERS_WITH_HERBS_350G",
                  items: 1,
                  pictures: [
                    [
                      "https://www.checkers.co.za/medias/10737733EA-checkers300Wx300H.webp?context=bWFzdGVyfGltYWdlc3wxMzM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMTQvaDgzLzk2Mzg0MjkwOTgwMTQud2VicHwxZjQ5MWY3MzJjMjcyNTc5MDEzMzQ3ZDhhMDU0YTAxZGUxYTE1NzU0Y2RjZTczZWIyOTk4NWQ3YWZkYzhlYjky",
                    ],
                  ],
                },
              ],
              date_cancelled: "2022-06-14T21:18:18.000Z",
              request_fp:
                "ba4c29b738df793eb1985a51ce52e89041145eae0748f49ff41675b9c57926c0",
              client_id:
                "8246a726f668f5471a797175116f04e38b33f2fd1ec2f74ebd3936c3938a3778daa71b0b71c43880e6d02df7aec129cb3576d07ebe46d93788b9c8ea6ec4555e",
              date_completedShopping: null,
              date_routeToDelivery: null,
              totals_request: {
                service_fee: "N$90.00",
                total: "N$145.00",
                cart: "N$55.00",
                cash_pickup_fee: "N$0.00",
              },
              request_documentation: { note: "" },
              security: { pin: "429832" },
              date_clientRatedShopping: null,
              date_pickedupCash: null,
              shopper_id: "false",
              locations: {
                pickup: {
                  osm_id: 8401632320,
                  country: "Namibia",
                  city: "Windhoek",
                  countrycode: "NA",
                  postcode: "10007",
                  locality: "Windhoek North",
                  coordinates: { latitude: -22.55928, longitude: 17.07581 },
                  type: "house",
                  street_name: "Johann Albrecht Street",
                  osm_type: "N",
                  location_name: "Johann Albrecht Street",
                  osm_key: "highway",
                  street: "Johann Albrecht Street",
                  district: "Windhoek North",
                  osm_value: "bus_stop",
                  name: "Inner City Church",
                  suburb: "Windhoek North",
                  state: "Khomas Region",
                  isCity_supported: true,
                },
                delivery: {
                  country: "Namibia",
                  indexSearch: 0,
                  city: "Windhoek",
                  query: "kh",
                  coordinates: [-22.5454963, 17.0480378],
                  averageGeo: 0,
                  location_id: "ChIJLXQMAn8cCxwRkOPgQrxrz_s",
                  street_name: false,
                  location_name: "Khomasdal",
                  street: false,
                  suburb: false,
                  _id: "61571d0d1d8f6c00ae445a50",
                  state: "Khomas",
                },
              },
              _id: "fad8a7f5-c958-4020-ac67-fb191e2c9706",
              payment_method: "mobile_money",
            },
          ],
        },
        stats: {
          total_sales_today: 446,
          total_revenue_today: 95,
          total_requests_success: 3,
        },
      }, //Will have all the requests data - default: []
      hasError: false, //If the request encountered an error
      isLoading: false, //Default: true
    };
  }

  componentDidMount() {
    let that = this;

    this.intervalUpdater = setInterval(() => {
      axios
        .post(`${process.env.REACT_APP_BRIDGE}/getGeneralRequestsList`, {
          admin_fp: "abc",
        })
        .then(function (response) {
          //   console.log(response.data.response);
          if (
            response.data.response === "error" ||
            Object.keys(response.data.response).length === 0
          ) {
            that.setState({
              hasError: false,
              requestsMetaData: [],
              isLoading: false,
            });
          } //Has some data
          else {
            that.setState({
              hasError: false,
              requestsMetaData: response.data.response,
              isLoading: false,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          that.setState({
            hasError: false,
            requestsMetaData: [],
            isLoading: false,
          });
        });
    }, 5000);
  }

  //To update the request category
  updateSelectedRequestsCat(category) {
    this.setState({
      selectedRequestCategory: category,
    });
  }
  //To update the request status
  updateSelectedReqStatusCat(category) {
    this.setState({
      selectedRequestStatus: category,
    });
  }
  //To get the human readable names
  getHumanReadableNames(codename) {
    let codeNamesMap = {
      ride: "Rides",
      delivery: "Deliveries",
      shopping: "Shoppings",
      inprogress: "in progress",
      completed: "completed",
      cancelled: "cancelled",
    };
    return codeNamesMap[codename];
  }

  basicHeader() {
    let selectedCategoryStyle = {
      backgroundColor: "#096ed4",
      borderColor: "#096ed4",
      color: "#fff",
      fontFamily: "MoveTextMedium",
    };

    let selectedStatusStyle = {
      backgroundColor: "#000",
      borderColor: "#000",
      color: "#fff",
      fontFamily: "MoveTextMedium",
    };

    return (
      <>
        <div className={classes.headerContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={classes.headerTitle}>
              {this.getHumanReadableNames(this.state.selectedRequestCategory)}{" "}
              {this.getHumanReadableNames(this.state.selectedRequestStatus)}
            </div>
          </div>
          {/* Loader */}
          <div className={classes.rightCategoriesDrivers}>
            <div
              style={
                this.state.selectedRequestCategory === "ride"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedRequestsCat("ride")}
            >
              Ride{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress", "ride")}
            </div>
            <div
              style={
                this.state.selectedRequestCategory === "delivery"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedRequestsCat("delivery")}
            >
              Delivery{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress", "delivery")}
            </div>
            <div
              style={
                this.state.selectedRequestCategory === "shopping"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedRequestsCat("shopping")}
            >
              Shopping{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress", "shopping")}
            </div>
          </div>
        </div>

        {/* Requests states */}

        <div className={classes.requestsAndStatsContainer}>
          <div className={classes.requestsStatesContainer}>
            <div
              style={
                this.state.selectedRequestStatus === "inprogress"
                  ? selectedStatusStyle
                  : {}
              }
              onClick={() => this.updateSelectedReqStatusCat("inprogress")}
            >
              In progress{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress")}
            </div>
            <div
              style={
                this.state.selectedRequestStatus === "completed"
                  ? selectedStatusStyle
                  : {}
              }
              onClick={() => this.updateSelectedReqStatusCat("completed")}
            >
              Completed{" - "}
              {this.getNumberOfRequestsPerStyle("completed")}
            </div>
            <div
              style={
                this.state.selectedRequestStatus === "cancelled"
                  ? selectedStatusStyle
                  : {}
              }
              onClick={() => this.updateSelectedReqStatusCat("cancelled")}
            >
              Cancelled{" - "}
              {this.getNumberOfRequestsPerStyle("cancelled")}
            </div>
          </div>
          {/* Brief stats */}
          <div className={classes.briefHeaderStats}>
            {this.renderInformationWithLabel({
              title: `N$${this.getHeaderGenericStats("total_sales_today")}`,
              label: "Total sales today",
            })}
            {/* Revenue */}
            {this.renderInformationWithLabel({
              title: `N$${this.getHeaderGenericStats("total_revenue_today")}`,
              label: "Total revenue today",
              color: process.env.REACT_APP_PRIMARY_COLOR,
            })}
            {/* Requests */}
            {this.renderInformationWithLabel({
              title: this.getHeaderGenericStats("total_requests_success"),
              label: "Total requests today",
            })}
          </div>
        </div>
      </>
    );
  }

  //Get the header generic stats
  getHeaderGenericStats(dataType) {
    if (
      this.state.requestsMetaData.stats !== undefined &&
      this.state.requestsMetaData.stats !== null
    ) {
      //   console.log(this.state.requestsMetaData.stats);
      return this.state.requestsMetaData.stats[dataType];
    } else {
      return 0;
    }
  }

  //Get the number of requests for different requests status : inporgress, completed or cancelled
  getNumberOfRequestsPerStyle(
    style,
    category = this.state.selectedRequestCategory
  ) {
    return this.state.requestsMetaData[category] !== undefined
      ? this.state.requestsMetaData[category][style] !== undefined
        ? this.state.requestsMetaData[category][style].length
        : 0
      : 0;
  }

  //Render information with label
  renderInformationWithLabel({
    title = "Title",
    label = "Label",
    color = "#000",
    marginLeft = "25px",
    fontSize = "18px",
  }) {
    return (
      <div
        className={classes.infoPlusLabelContainer}
        style={{ marginLeft: marginLeft }}
      >
        <div className={classes.labelInfoPlusL}>{label}</div>
        <div
          className={classes.titleInfoPlusL}
          style={{ color: color, fontSize: fontSize }}
        >
          {title}
        </div>
      </div>
    );
  }

  //Make the date readable
  getReadableDate(dateString) {
    let dateRef = new Date(dateString);

    return `${
      dateRef.getDate() > 9 ? dateRef.getDate() : `0${dateRef.getDate()}`
    }-${
      dateRef.getMonth() + 1 > 9
        ? dateRef.getMonth() + 1
        : `0${dateRef.getMonth() + 1}`
    }-${dateRef.getFullYear()} at ${
      dateRef.getHours() > 9 ? dateRef.getHours() : `0${dateRef.getHours()}`
    }:${
      dateRef.getMinutes() > 9
        ? dateRef.getMinutes()
        : `0${dateRef.getMinutes()}`
    }h`;
  }

  //Check loader or empty request condition
  checkLoaderOrEmptyRequestCondition() {
    return (
      this.state.requestsMetaData[this.state.selectedRequestCategory] ===
        undefined ||
      this.state.requestsMetaData[this.state.selectedRequestCategory] ===
        null ||
      this.state.requestsMetaData[this.state.selectedRequestCategory][
        this.state.selectedRequestStatus
      ] === undefined ||
      this.state.requestsMetaData[this.state.selectedRequestCategory][
        this.state.selectedRequestStatus
      ] === null ||
      this.state.requestsMetaData[this.state.selectedRequestCategory][
        this.state.selectedRequestStatus
      ].length === 0
    );
  }

  //Render the correct data table
  renderAppropriateDataTable() {
    switch (this.state.selectedRequestCategory) {
      case "ride":
        if (this.checkLoaderOrEmptyRequestCondition())
          return (
            <div className={classes.emptyDriversShower}>
              {this.state.isLoading ? (
                <Loader
                  type="TailSpin"
                  color="#000"
                  height={50}
                  width={50}
                  timeout={300000000} //3 secs
                />
              ) : (
                `No ${this.getHumanReadableNames(
                  this.state.selectedRequestCategory
                ).toLowerCase()} ${this.getHumanReadableNames(
                  this.state.selectedRequestStatus
                )} yet, you'll see them here automatically.`
              )}
            </div>
          );

        let dataToConsider =
          this.state.requestsMetaData[this.state.selectedRequestCategory] !==
          undefined
            ? this.state.requestsMetaData[this.state.selectedRequestCategory][
                this.state.selectedRequestStatus
              ]
            : [];

        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Driver</td>
              <td>Client name</td>
              <td>Date requested</td>
              <td>Request type</td>
              <td>Amount</td>
              <td>Payment method</td>
              <td>Progress step</td>
              <td>More</td>
            </tr>

            {/* Body */}

            {dataToConsider.map((request, index) => {
              return (
                <tr key={index} className={classes.rowElementTable}>
                  <td style={{ fontFamily: "MoveTextMedium" }}>{index + 1}</td>
                  <td
                    style={{
                      backgroundColor:
                        this.state.selectedRequestStatus === "cancelled"
                          ? "#fff"
                          : request.shopper_id === "false"
                          ? process.env.REACT_APP_ERROR_COLOR
                          : process.env.REACT_APP_PRIMARY_COLOR,
                      color:
                        this.state.selectedRequestStatus === "cancelled"
                          ? request.shopper_id === "false"
                            ? process.env.REACT_APP_ERROR_COLOR
                            : process.env.REACT_APP_PRIMARY_COLOR
                          : "#fff",
                    }}
                  >
                    {request.shopper_id === "false"
                      ? this.state.selectedRequestStatus === "cancelled"
                        ? "No driver"
                        : "Pending..."
                      : request.driverData.name}
                  </td>
                  <td>{request.clientData.name}</td>
                  <td>{this.getReadableDate(request.date_requested)}</td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_SECONDARY_COLOR,
                    }}
                  >
                    {ucFirst({ stringData: request.ride_mode })}
                  </td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontSize: "18px",
                    }}
                  >{`N$${request.totals_request.fare}`}</td>
                  <td>
                    {this.getReadablePaymentMethod(request.payment_method)}
                  </td>
                  <td>1</td>
                  <td>
                    <ArrowForward style={{ fontSize: "20px" }} />
                  </td>
                </tr>
              );
            })}
          </table>
        );

      default:
        return <></>;
    }
  }

  //Get the readable payment method
  getReadablePaymentMethod(paymentCodeName) {
    return paymentCodeName === "mobile_money" ? "Ewallet" : "Cash";
  }

  //Render basic title
  renderBasicTitle({ title = "My title" }) {
    return <div className={classes.basicTitle}>{title}</div>;
  }

  //Render appropriate modal content
  renderAppropriateModalContent() {
    let request = this.state.selectedRequestForFocus;

    switch (this.state.selectedRequestCategory) {
      case "ride":
        return (
          <div className={classes.modalContainer}>
            <div className={classes.headerPortionModal}>
              <div className={classes.headerModalRequest}>
                <div className={classes.titleRequestModal}>Request #1</div>
                <div className={classes.clientNameModal}>other</div>
              </div>
              <table className={classes.tableMain}>
                <tr className={classes.headerTable}>
                  <td>Driver</td>
                  <td>Client name</td>
                  <td>Date requested</td>
                  <td>Request type</td>
                  <td>Amount</td>
                  <td>Payment method</td>
                  <td>Progress step</td>
                </tr>
                {/* ... */}
                <tr className={classes.rowElementTable}>
                  <td
                    style={{
                      backgroundColor:
                        this.state.selectedRequestStatus === "cancelled"
                          ? "#fff"
                          : request.shopper_id === "false"
                          ? process.env.REACT_APP_ERROR_COLOR
                          : process.env.REACT_APP_PRIMARY_COLOR,
                      color:
                        this.state.selectedRequestStatus === "cancelled"
                          ? request.shopper_id === "false"
                            ? process.env.REACT_APP_ERROR_COLOR
                            : process.env.REACT_APP_PRIMARY_COLOR
                          : "#fff",
                      fontFamily: "MoveTextMedium",
                    }}
                  >
                    {request.shopper_id === "false"
                      ? this.state.selectedRequestStatus === "cancelled"
                        ? "No driver"
                        : "Pending..."
                      : request.driverData.cars_data[0].taxi_number}
                  </td>
                  <td>{request.clientData.name}</td>
                  <td>{this.getReadableDate(request.date_requested)}</td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_SECONDARY_COLOR,
                    }}
                  >
                    {ucFirst({ stringData: request.ride_mode })}
                  </td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontSize: "18px",
                    }}
                  >{`N$${request.totals_request.fare}`}</td>
                  <td>
                    {this.getReadablePaymentMethod(request.payment_method)}
                  </td>
                  <td>1</td>
                </tr>
              </table>
            </div>

            {this.renderBasicTitle({ title: "Itinary" })}
            {this.renderItinary()}

            {/* {this.renderBasicTitle({ title: "Fare details" })}
            {this.renderFareDetails({
              requestData: this.state.selectedRequestForFocus,
            })} */}

            {this.renderBasicTitle({ title: "Driver details" })}
            {this.renderDriverDetails({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.renderBasicTitle({ title: "Actions" })}
            {this.renderGlobalActionNodes({
              requestData: this.state.selectedRequestForFocus,
            })}
          </div>
        );

      default:
        return <></>;
    }
  }

  //Render global action nodes
  renderGlobalActionNodes({ requestData }) {
    let requestState = requestData.request_state_vars;

    switch (requestData.ride_mode) {
      case "RIDE":
        return (
          <div
            className={classes.itiContainer}
            style={{
              marginTop: "20px",
              flexWrap: "wrap",
              borderBottomColor: "#fff",
            }}
          >
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Confirm pickup",
                  isValidated: requestState.inRouteToDropoff,
                  actuator: requestState.inRouteToDropoff
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the pickup?"
                          )
                        ) {
                          toast.loading("Confirming the pickup");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_pickup_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success("Successfully confirmed pickup!");
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the pickup.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error("Unable to confirm the pickup.");
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Confirm drop off",
                  isValidated: requestState.completedDropoff,
                  actuator: requestState.completedDropoff
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the drop off?"
                          )
                        ) {
                          toast.loading("Confirming the drop off");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_dropoff_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                                selectedPackageIndex: 0,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success(
                                  "Successfully confirmed drop off!"
                                );
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the drop off.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error("Unable to confirm the drop off.");
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : requestState.inRouteToDropoff
              ? null
              : this.renderActionNode({
                  title: "Cancel for driver",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                })}
            {this.renderActionNode({
              title: "Delete request",
              isValidated: false,
              color: process.env.REACT_APP_ERROR_COLOR,
            })}
          </div>
        );

      default:
        return <></>;
    }
  }

  //Render action node
  renderActionNode({
    title = "Document name",
    isValidated = false,
    color = process.env.REACT_APP_PRIMARY_COLOR,
    actuator = () => {
      console.log("No actions specified");
    },
  }) {
    return (
      <div
        className={classes.actionNode}
        style={{ color: color }}
        onClick={actuator}
      >
        <div>{title}</div>
        {isValidated ? (
          <CheckCircle style={{ fontSize: "15px" }} />
        ) : (
          <ArrowForwardIosSharp style={{ fontSize: "15px" }} />
        )}
      </div>
    );
  }

  //Render the driver details for each category
  renderDriverDetails({ requestData }) {
    if (requestData.shopper_id === "false")
      return (
        <div className={classes.lookingForDriverContainer}>
          <Loader
            type="TailSpin"
            color="#096ed4"
            height={20}
            width={20}
            timeout={300000000} //3 secs
          />{" "}
          <span style={{ marginLeft: "15px" }}>
            Still looking for a driver...
          </span>
        </div>
      );

    switch (requestData.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>
                <img
                  alt="profile"
                  src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${requestData.driverData["identification_data"]["profile_picture"]}`}
                  className={classes.trueBriefImage}
                />
              </div>
              <div className={classes.textualInfosBrief}>
                {/* Name */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedRequestForFocus.driverData["name"],
                  label: "Name",
                  fontSize: "16px",
                })}
                {/* Surname */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["surname"],
                  label: "Surname",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Gender */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["gender"],
                  label: "Gender",
                  fontSize: "16px",
                })}
                {/* Phone number */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.cars_data[0]
                      .taxi_number,
                  label: "Taxi number",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Surname */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.phone_number,
                  label: "Phone number",
                  fontSize: "16px",
                })}
              </div>
            </div>
          </div>
        );

      default:
        return <></>;
    }
  }

  //Render the fare details for each category
  renderFareDetails({ requestData }) {
    let fareData = requestData.totals_request;

    switch (requestData.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            {this.renderInformationWithLabel({
              title: `N$${fareData.fare}`,
              label: "Amount",
              marginLeft: "0px",
              color: process.env.REACT_APP_PRIMARY_COLOR,
            })}

            {/* Payment method */}
            {this.renderInformationWithLabel({
              title: this.getReadablePaymentMethod(requestData.payment_method),
              label: "Payment method",
              marginLeft: "0px",
            })}
          </div>
        );

      default:
        return <></>;
    }
  }

  //Itenary: pickup destination
  renderItinary() {
    switch (this.state.selectedRequestForFocus.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.itiContainer}>
            <div>
              {this.renderLocationWithLabel({
                locationData: [
                  this.state.selectedRequestForFocus.locations.pickup,
                ],
                label: "Pickup location",
              })}
            </div>
            <div>
              {this.renderLocationWithLabel({
                locationData:
                  this.state.selectedRequestForFocus.locations.dropoff,
                label: "Drop off location",
              })}
            </div>
          </div>
        );

      default:
        return <></>;
    }
  }

  //Render location title and label
  renderLocationWithLabel({
    locationData = [{ suburb: "Suburb name", street_name: "Street name" }],
    label = "Label",
    color = "#000",
  }) {
    return (
      <div className={classes.infoPlusLabelContainerLocation}>
        <div className={classes.labelInfoPlusLocation}>{label}</div>
        {locationData.map((location, index) => {
          let locationReformattedData = getRealisticPlacesNames({
            locationData: location,
          });
          return (
            <div key={index} className={classes.locationCoreContainer}>
              <span className={classes.numberLocationIndex}>{index + 1}.</span>
              <div>
                <div
                  className={classes.titleInfoPlusLocation}
                  style={{ color: color }}
                >
                  {locationReformattedData.suburb}
                </div>
                <div
                  className={classes.suburbInfoPlusLocation}
                  style={{ color: color }}
                >
                  {locationReformattedData.street_name}
                  {locationReformattedData.street_name !== false &&
                  locationReformattedData.street_name.length > 0
                    ? ", "
                    : ""}
                  {locationReformattedData.location_name}
                  {locationReformattedData.location_name !== false &&
                  locationReformattedData.location_name.length > 0
                    ? ", "
                    : ""}
                  {locationReformattedData.city}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className={classes.container}>
        <Toaster />

        <Modal
          isOpen={true}
          onAfterOpen={() => {}}
          onRequestClose={() => {}}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.renderAppropriateModalContent()}
        </Modal>

        {/* Menu */}
        <DrawerMenu />

        {/* Right */}
        <div className={classes.contentContainer}>
          {this.basicHeader()}

          <div className={classes.containerTablesRequests}>
            {this.renderAppropriateDataTable()}
          </div>
        </div>
      </div>
    );
  }
}

export default Requests;
