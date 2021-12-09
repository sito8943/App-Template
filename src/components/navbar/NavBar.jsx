import React, { useState, useEffect } from "react";
import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import {
  SettingsIcon,
  XIcon,
  DarkModeIcon,
  LightModeIcon,
} from "../../icons/icons";

import { Outlet, Link } from "react-router-dom";

import { IconButton } from "../theme/ThemeComponents";

import "./style.scss";

const Navbar = (props) => {
  const { contextState, setContextState } = useContext();

  const init = async () => {};

  useEffect(() => {
    init();
  }, []);

  const toggleMode = (e) => {
    contextState.mode === "light"
      ? setContextState({ type: "changeMode", mode: "dark" })
      : setContextState({ type: "changeMode", mode: "light" });
    if (contextState.showEmojis) setContextState({ type: "toggleEmojiPanel" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <nav
        className="uk-navbar-container navbar"
        data-uk-navbar
        style={{
          backgroundColor:
            contextState.mode === "light"
              ? colors.LightBarBackground
              : colors.DarkBarBackground,
          boxShadow: `1px 1px 5px 1px ${
            contextState.mode === "light"
              ? colors.LightShadows
              : colors.DarkShadows
          }`,
        }}
      >
        <div className="uk-navbar-left">
          <Link className="uk-navbar-item uk-logo" to="#">
            <img src="/logo192.png" alt="app-logo" style={{ height: "60px" }} />
          </Link>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {props.texts.Links.map((d, i) => {
              return (
                <li key={i}>
                  <Link to={d.To}>{d.Label}</Link>
                </li>
              );
            })}
          </ul>
          <button
            id="toggler"
            style={{
              color:
                contextState.mode === "light"
                  ? colors.LightFontColors
                  : colors.DarkFontColors,
              marginBottom: "5px",
            }}
            onClick={toggleMode}
            className="uk-button uk-button-default uk-margin-small-right navbar-button"
          >
            {contextState.mode === "light" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </button>
          <IconButton
            className="uk-hidden@m"
            marginBottom="10px"
            target="target: #offcanvas-usage"
          >
            <SettingsIcon />
          </IconButton>
        </div>
        <div>
          <div id="offcanvas-usage" data-uk-offcanvas>
            <div
              className="uk-offcanvas-bar"
              style={{
                backgroundColor:
                  contextState.mode === "light"
                    ? colors.LightOffCanvas
                    : colors.DarkOffCanvas,
                boxShadow: `1px 5px 1px 1px ${
                  contextState.mode === "light"
                    ? colors.LightShadows
                    : colors.DarkShadows
                }`,
              }}
            >
              <button className="uk-offcanvas-close" type="button">
                <XIcon />
              </button>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
