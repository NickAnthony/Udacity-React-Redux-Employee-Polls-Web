import thunk from "redux-thunk";
import logger from "./logger";

// -- MIDDLEWARE -- //
const middleware = [thunk, logger];
export default middleware;
