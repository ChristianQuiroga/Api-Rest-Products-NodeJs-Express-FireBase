import { homeHtml } from "../views/home.view.js";

export const getHome = (req, res) => {
  return res.status(200).send(homeHtml);
};