import { Card, Select } from "antd";
import classes from "../Styles/Products.module.css";
import DrawerMenu from "./DrawerMenu";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import VirtualizedGrid from "./VirtualizedGrid";
const { Meta } = Card;

const ProductsViewer = () => {
  const prevStoreRef = useRef();
  const prevProductTypeRef = useRef();
  const scrollableDivRef = useRef(null);

  const [stores, setStores] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [products, setProducts] = useState(null);
  const productsRef = useRef(products);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BRIDGE}/getProducts`,
        {
          productType: selectedProductType,
          selectedStore,
          pageNumber: page,
        }
      );

      if (response.data?.status === "success") {
        const {
          products: receivedProducts,
          stores: receivedStores,
          selectedStore: receivedSelectedStore,
        } = response.data?.data;

        setStores(receivedStores);
        setProducts((prevProducts) =>
          prevProducts
            ? [...prevProducts, ...receivedProducts]
            : receivedProducts
        );
        setSelectedStore(receivedSelectedStore);
        setScrollLoading(false);
      }

      setIsLoadingProducts(false);
    } catch (error) {
      console.log(error);
      setIsLoadingProducts(false);
      setScrollLoading(false);
    }
  };

  useEffect(() => {
    setIsLoadingProducts(true);
    // getProducts();
  }, []);

  // Update the ref whenever products change
  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    const prevStore = prevStoreRef.current;
    prevStoreRef.current = selectedStore;

    const prevProductType = prevProductTypeRef.current;
    prevProductTypeRef.current = selectedProductType;

    if (
      prevStore !== null &&
      selectedStore !== null &&
      prevProductType !== null &&
      selectedProductType != null
    ) {
      getProducts();
    }
  }, [selectedStore, selectedProductType]);

  // Effect to fetch data on component mount and when page changes
  useEffect(() => {
    if (page !== 1) {
      setScrollLoading(true);
      getProducts();
    }
  }, [page]);

  useEffect(() => {
    getProducts();
  }, []);

  // Event listener for scroll
  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;

    const handleScroll = () => {
      if (!scrollableDiv) return;

      const isBottom =
        scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
        scrollableDiv.clientHeight;

      const currentProducts = productsRef.current;

      if (isBottom && !scrollLoading && currentProducts?.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    // Cleanup function
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollLoading]);

  const handleSelectedStore = (store) => {
    setIsLoadingProducts(true);
    setProducts(null);
    setSelectedStore(store);
    setPage(1);
  };

  const handleSelectedProductType = (type) => {
    setIsLoadingProducts(true);
    setProducts(null);
    setSelectedProductType(type);
    setPage(1);
  };

  const basicHeader = () => {
    return (
      <div className={classes.headerContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
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
      <div className={classes.contentContainer} ref={scrollableDivRef}>
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
              {
                value: "blurry",
                label: "Blurry images",
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
                height: "100%",
              }}>
              <VirtualizedGrid
                key={selectedStore ?? "initial"}
                items={products}
                hideScrollbar={true}
                isLoadingMore={scrollLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsViewer;
