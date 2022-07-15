const ucFirst = ({ stringData }) => {
  try {
    return `${stringData[0].toUpperCase()}${stringData
      .substr(1)
      .toLowerCase()}`;
  } catch (error) {
    return stringData;
  }
};

export default ucFirst;
