/** @format */
const getAx = async () => {
  try {
    const res = await axios.get(``);
    console.log("Ok");
    return res;
  } catch (error) {
    console.log(error);
  }
  console.log("Gsadasdege");
};

getAx();
