// Common
import RouteInfo from "./../models/RouteInfo";
import Display from "./Administrations/Roles/Display";
import Insert from "./Employee/Insert";
import Search from "./Employee/Search";
// Administration - Role
import Home from "./Home";
import TestPage from "./TestPage";

const RouteUrls = class {
    static Default: string = "list";
    static AddNew: string = "addnew";
    static Edit: string = "edit";
    static Display: string = "display";
    static Setting: string = "setting";
    static Review: string = "review";
    static Insert: string = "insert";


    static ExportProposal: string = "exportproposal";
    static ImportProposal: string = "importproposal";

    static TabHopDongEdit: string = 'mortgage-contract-edit';
    static TabHopDongDisplay: string = 'mortgage-contract-info';
};

/**
 * Full Route collection
 */
const RouteCollection: RouteInfo[] = [
    new RouteInfo("/home", "", Home, true),
    new RouteInfo("/test", "", TestPage, true),
    new RouteInfo("/list", "", Display, true),
    new RouteInfo("/search", "", Search, true),
    new RouteInfo("/edit","/:id",Insert,true),
    new RouteInfo("/insert","",Insert,true)
];

const GetRouteInfoByPath = (path: string) => {
    path = path.toLowerCase();
    let enRoute = RouteCollection.find((en) => en.Path.toLowerCase() === path);
    return enRoute;
};

export { RouteUrls, RouteCollection, GetRouteInfoByPath };

