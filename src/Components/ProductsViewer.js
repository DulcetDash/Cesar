import { Card, Select, Tooltip } from "antd";
import classes from "../Styles/Products.module.css";
import DrawerMenu from "./DrawerMenu";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ucFirst from "../Helpers/Helpers";
import { Delete, PhotoCamera } from "@material-ui/icons";
import Loader from "react-loader-spinner";
const { Meta } = Card;

const ProductsViewer = () => {
  const prevStoreRef = useRef();

  const [stores, setStores] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [products, setProducts] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const getProducts = async () => {
    setIsLoadingProducts(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BRIDGE}/getProducts`,
        {
          productType: selectedProductType,
          selectedStore,
        }
      );

      if (response.data?.status === "success") {
        const {
          products: receivedProducts,
          stores: receivedStores,
          selectedStore: receivedSelectedStore,
        } = response.data?.data;

        console.log(receivedProducts);

        setStores(receivedStores);
        setProducts(receivedProducts);
        setSelectedStore(receivedSelectedStore);
      }

      setIsLoadingProducts(false);
    } catch (error) {
      console.log(error);
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const prevStore = prevStoreRef.current;
    prevStoreRef.current = selectedStore;

    if (prevStore !== null && selectedStore !== null) {
      getProducts();
    }
  }, [selectedStore, selectedProductType]);

  const handleSelectedStore = (store) => {
    setSelectedStore(store);
  };

  const handleSelectedProductType = (type) => {
    setSelectedProductType(type);
  };

  const basicHeader = () => {
    return (
      <div className={classes.headerContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={() => getProducts()}>
          <div className={classes.headerTitle}>Products</div>
        </div>
        {/* Loader */}
        {selectedStore && (
          <div className={classes.rightCategoriesDrivers}>
            <div style={{ fontSize: "13px" }}>
              {products?.length ?? 0} products
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {/* Menu */}
      <DrawerMenu />

      {/* Right */}
      <div className={classes.contentContainer}>
        {basicHeader()}

        <div
          style={{
            paddingLeft: "20px",
          }}>
          <Select
            style={{
              width: 220,
              marginRight: 10,
            }}
            defaultValue={!stores ? "Select a shop" : stores[0]?.value}
            value={!stores ? "Select a shop" : selectedStore}
            onChange={(value) => {
              handleSelectedStore(value);
            }}
            options={stores}
          />
          {/* Types of product */}
          <Select
            style={{
              width: 220,
            }}
            defaultValue={"all"}
            onChange={(value) => {
              handleSelectedProductType(value);
            }}
            options={[
              {
                value: "all",
                label: "All products",
              },
              {
                value: "pictureless",
                label: "Pictureless products",
              },
            ]}
          />
        </div>

        {/* Products */}
        <div
          style={{
            padding: 20,
            marginTop: 25,
          }}>
          {isLoadingProducts ? (
            <Loader
              type="TailSpin"
              color="#000"
              height={50}
              width={50}
              timeout={300000000} //3 secs
            />
          ) : !products || products?.length <= 0 ? (
            <div>No products</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}>
              {products.map((product) => {
                return (
                  <Card
                    key={product?.id}
                    bordered={false}
                    cover={
                      <img
                        alt="product"
                        src={product?.pictures?.[0]}
                        style={{
                          paddingTop: 15,
                          height: "150px",
                          width: "75%",
                          objectFit: "contain",
                          margin: "auto",
                        }}
                      />
                    }
                    style={{
                      width: 220,
                    }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        height: 40,
                      }}>
                      {ucFirst({ stringData: product?.name })}
                    </p>
                    <Tooltip
                      title={
                        product?.description?.length > 120
                          ? product?.description
                          : null
                      }>
                      <p
                        style={{
                          borderBottom: "1px solid #d0d0d0",
                          height: 120,
                          fontSize: 12,
                        }}>
                        {product?.description?.length > 120
                          ? `${product?.description.slice(0, 120)}...`
                          : product?.description}
                      </p>
                    </Tooltip>

                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#11A05A",
                        fontSize: 17,
                      }}>{`${product?.currency} ${product?.price}`}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Change picture">
                        <PhotoCamera
                          style={{ fontSize: 22, cursor: "pointer" }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete product">
                        <Delete
                          style={{
                            color: "#b22222",
                            fontSize: 22.5,
                            position: "relative",
                            bottom: 1,
                            marginLeft: 10,
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsViewer;
