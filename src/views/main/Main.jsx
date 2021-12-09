import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";
import { GenerateRandomNumber, GetRandomOf } from "../../utils/functions";

import Product from "../../models/Product";
import User from "../../models/User";

import ProductCard from "../../components/theme/productCard/ProductCard";
import SideBar from "../../components/theme/sideBar/SideBar";
import { Header3 } from "../../components/theme/headers/Headers";
import { Label } from "../../components/theme/form/label/Label";

import "./style.scss";

const Main = (props) => {
  const { contextState, setContextState } = useContext();
  const [products, setProducts] = useState([
    new Product(1, 1, "Gafas", "Rojo", "Puma", "Grande", "100", [], 1, 1, 1),
    new Product(1, 1, "Gafas", "Rojo", "Puma", "Grande", "100", [], 1, 1, 1),
    new Product(1, 1, "Gafas", "Rojo", "Puma", "Grande", "100", [], 1, 1, 1),
    new Product(1, 1, "Gafas", "Rojo", "Puma", "Grande", "100", [], 1, 1, 1),
  ]);
  const [search, setSearch] = useState("");
  const [ran, setRan] = useState(0);

  //filters
  const [ownerName, setOwnerName] = useState("");
  const [color, setColor] = useState("");
  const [tradeMark, setTradeMark] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const [byOwner, setByOwner] = useState(false);
  const [byColor, setByColor] = useState(false);
  const [byTradeMark, setByTradeMark] = useState(false);
  const [byModel, setByModel] = useState(false);
  const [byPrice, setByPrice] = useState(false);

  const checkboxClicked = (e) => {
    alert(e.target.id);
  };

  const init = async () => {};

  useEffect(() => {
    init();
    setRan(GenerateRandomNumber(0, props.texts.Placeholders.Search.length));
  }, []);

  const handleInput = (e) => {
    switch (e.target.id) {
      case "owner":
        return setByOwner(!byOwner);
      case "color":
        return setByColor(!byColor);
      case "tradeMark":
        return setByTradeMark(!byTradeMark);
      case "model":
        return setByModel(!byModel);
      case "price":
        return setByPrice(!byPrice);
      case "ownerName":
        return setOwnerName(e.target.value);
      case "colorName":
        return setColor(e.target.value);
      case "tradeMarkName":
        return setTradeMark(e.target.value);
      case "modelName":
        return setModel(e.target.value);
      case "priceMin":
      case "priceMax":
        return setPrice(
          document.getElementById("priceMin").value +
            ":" +
            document.getElementById("priceMax").value
        );
      default:
        return setSearch(e.target.value);
    }
  };

  return (
    <div className="main">
      <div
        className="uk-grid-collapse uk-text-center uk-section"
        data-uk-height-viewport="offset-top: true; offset-bottom: true"
        style={{ padding: "0" }}
        data-uk-grid
      >
        <SideBar side="left"></SideBar>
        <div className="uk-width-expand"></div>
      </div>
    </div>
  );
};

export default Main;
