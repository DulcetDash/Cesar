import React, { useEffect, useState } from "react";
import { Card, Tooltip, Modal, message } from "antd";
import ucFirst from "../Helpers/Helpers";
import { PhotoCamera } from "@material-ui/icons";
import axios from "axios";
import toast from "react-hot-toast";

const ProductCard = ({ product: productInput }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [product, setProduct] = useState(productInput);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetFileInput = () => {
    document.getElementById(`fileInput-${product?.id}`).value = "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsModalOpen(true);
      setSelectedFile(file);
      Modal.confirm({
        open: isModalOpen,
        title: "Confirm Upload",
        content: "Do you want to upload this image?",
        onOk: async () => await uploadImage(file),
        onCancel: () => resetFileInput(),
      });
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("storeId", product.meta.store_fp);
    formData.append("productId", product.id);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BRIDGE}/uploadProductPicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.status === "success") {
        toast.success("Image uploaded successfully!", { duration: 5000 });
        const updatedProduct = product;
        updatedProduct.pictures = [response.data?.data?.updatedImage];
        setProduct(updatedProduct);
      } else {
        toast.error("Unable to upload image", { duration: 5000 });
      }
    } catch (error) {
      toast.error("Unable to upload image", { duration: 5000 });
    }

    resetFileInput();
    setIsModalOpen(false);
    return true;
  };

  useEffect(() => {}, [product]);

  return (
    <Card
      key={`${product?.id}-${JSON.stringify(product?.pictures)}`}
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
          product?.description?.length > 120 ? product?.description : null
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
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id={`fileInput-${product?.id}`}
          style={{ display: "none" }}
        />
        <Tooltip title="Change picture">
          <label htmlFor={`fileInput-${product?.id}`}>
            <PhotoCamera style={{ fontSize: 22, cursor: "pointer" }} />
          </label>
        </Tooltip>
      </div>
    </Card>
  );
};

export default React.memo(ProductCard);
