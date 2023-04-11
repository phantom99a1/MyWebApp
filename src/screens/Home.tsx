/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from "react";
import { iBaseProps, iBaseState } from "../Interfaces/iBaseComponent";

interface iProp extends iBaseProps { }
interface iState extends iBaseState { }

export default class Home extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
    }

    render() {
        return (
            <div className="layout-main">
                <div className="card card-w-title">
                    <div className="p-grid">
                        <div className="p-col-3">
                        HOME PAGE
                        </div>
                        <div className="p-col-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
