/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, observer } from "mobx-react";
import { Menu } from "primereact/menu";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import GlobalStore from "../../Stores/GlobalStore";
import smLogo from "../../assets/images/sm-logo.png";
import SMX from "../../constants/SMX";

interface iProps {
    history: any;
    GlobalStore: GlobalStore;
}

interface iState {
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class LeftMenu extends Component<iProps, iState> {
    menu!: Menu | null;
    constructor(props: iProps) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
    }

    

    render() {
        return (
            <div className="leftbar-menu" style={{'fontSize':'1.2rem'}}>
                <Link to="/home" className="logo-menu">
                <img src={smLogo} alt="" />
                </Link>
                <ul id="main-menu" className="main-menu">
                    <li className="active-menu">
                        <span>
                            <i className="fas fa-home"></i>                            
                            <i className="fas fa-search"></i>                            
                            <i className="fas fa-list"></i>                            
                        </span>
                        <div className="sub-menu active">
                            <div className="column">
                                <div className="sub-menu-top">
                                </div>
                                <div className="sub-menu-title"></div>
                                <ul>
                                    <li>
                                        <Link to={'/home'} target={''}>Trang chủ</Link>
                                    </li>
                                    <li>
                                        <Link to={'/search'} target={''}>Tìm kiếm</Link>
                                    </li>
                                    <li>
                                        <Link to={'/list'} target={''}>Danh sách</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
