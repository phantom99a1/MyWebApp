import React from "react";
import { iBaseProps, iBaseState } from "../Interfaces/iBaseComponent";

interface iProp extends iBaseProps { }
interface iState extends iBaseState { }

export default class TestPage extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        console.log(this.props.match.params.id);
    }
    render() {
        return (
            <div className="layout-main">
                <div className="card card-w-title">
                    <div className="p-grid">
                        <div className="p-col-3">
                        TEST PAGE
                        </div>
                        <div className="p-col-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
