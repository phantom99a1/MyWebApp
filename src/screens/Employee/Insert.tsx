import React from "react";
import Employee from "../../entities/Employee";
import Gender from "../../entities/Gender";
import Employee_Cert from "../../entities/Employee_Cert";
import EmployeeDTO from "../../DtoParams/EmployeeDTO";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constants/ApiUrl";
import 'bootstrap/dist/css/bootstrap.min.css';
import { iBaseProps, iBaseState } from "../../Interfaces/iBaseComponent";
import TextBox from "../../components/TextBox";
import SMButton from "../../components/SMButton";
import ComboBox from "../../components/ComboBox";
import DatePicker from "../../components/DatePicker";
import { Icons } from "../../themes";
interface Iprops extends iBaseProps {
    callData: () => void;
    closeForm: () => void;
    Getgt: any;
}

interface Istates extends iBaseState {
    emp: Employee,
    emp_cert: Employee_Cert,
    emps_cert: Array<Employee_Cert>
    arrDelete: Array<Employee_Cert>
    GioiTinh: Array<Gender>
}

class Insert extends React.Component<Iprops, Istates>
{
    constructor(props: Iprops) {
        super(props);
        this.state = {
            emp: new Employee(),
            emp_cert: new Employee_Cert(),
            emps_cert: [],
            arrDelete: [],
            GioiTinh: []
        }
    }
    Insert(employee: Employee, Employees_Cert: Array<Employee_Cert>) {
        let dtoResquest = new EmployeeDTO()
        dtoResquest.ActionName = 'insert';
        dtoResquest.Employee = employee;
        dtoResquest.Employees_Cert = Employees_Cert
        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute, JSON.stringify(dtoResquest))
    }

    Update(employee: Employee, Employees_Cert: Array<Employee_Cert>) {
        let Employees_Cert_Delete = this.state.arrDelete

        let dtoResquest = new EmployeeDTO()
        dtoResquest.ActionName = 'update';
        dtoResquest.Employee = employee;
        dtoResquest.Employees_Cert = Employees_Cert;
        dtoResquest.Employees_Cert_Delete = Employees_Cert_Delete
        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute, JSON.stringify(dtoResquest))
    }

    Detail(employee: Employee) {
        let dtoResquest = new EmployeeDTO()
        dtoResquest.ActionName = 'detail';
        dtoResquest.Employee = employee;

        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute, JSON.stringify(dtoResquest))
            .then(res => this.setState({emp: res.Employee!, emps_cert: res.Employees_Cert!}
            ))
    }

    componentDidMount(): void {
        this.getGender();

        if (this.props.match.params.id === undefined) {
            this.setState({
                emps_cert: [],
                emp: new Employee()
            })
        }
        else {
            let id = Number(this.props.match.params.id);
            let employee = new Employee();
            employee.Employee_ID = id;
            this.Detail(employee)
        }
    }
    removeItem(itemRemove: Employee_Cert) {

        let arrRemove = new Array<Employee_Cert>();
        arrRemove = this.state.arrDelete
        if (itemRemove.Cert_ID !== undefined)
            arrRemove.push(itemRemove);

        let arr = new Array<Employee_Cert>();
        arr = this.state.emps_cert;
        let indexItem = arr.indexOf(itemRemove);
        arr.splice(indexItem, 1);

        this.setState({
            emps_cert: arr,
            arrDelete: arrRemove
        });

    }
    getGender() {
        var dtoResquest = new EmployeeDTO();

        dtoResquest.ActionName = 'getgender';
        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute, JSON.stringify(dtoResquest))
            .then(res => {
                this.setState({ GioiTinh: res.Gender! })
            })
            
    }

    insertCert() {
        let arr = new Array<Employee_Cert>();
        arr = this.state.emps_cert;
        let item = new Employee_Cert();
        arr.push(item);
        this.setState({ emps_cert: arr });
    }
    render() {
        let item = this.state.emp;
        let item_cert = this.state.emps_cert;
        return (
            <div className="layout-main" style={{overflow:'scroll'}}>
                <div style={{display:'flex',margin:'5px 15px 15px 10px', flexDirection:'column',
                justifyContent:'center',alignItems:'flex-start', padding:'15px'}}>
                    <div>
                    <label>ID</label>
                    <TextBox className="sm-textbox w-100" value={item.Employee_ID! ||''} />
                    </div> 
                    <div style={{padding:'10px 0px'}}>            
                    <label>Tài khoản</label>
                    <TextBox className="sm-textbox w-100" value={item.User_Name || ''}
                        onChange={(e => {
                            item.User_Name = e.target.value;
                            this.setState({ emp: item })
                        })}
                    />
                    </div>
                    <div style={{padding:'10px 0px'}}>
                    <label>Tên nhân viên</label>
                    <TextBox className="sm-textbox w-100" value={item.Name || ''}
                        onChange={(e => {
                            item.Name = e.target.value;
                            this.setState({ emp: item })
                        })}
                    />
                    </div>
                    <div style={{padding:'10px 0px'}}>
                    <label>Địa chỉ</label>
                    <TextBox className="sm-textbox w-100" value={item.Address || ''}
                        onChange={(e => {
                            item.Address = e.target.value;
                            this.setState({ emp: item })
                        })}
                    />
                    </div>
                    <div style={{padding:'10px 0px'}}>
                    <label>Số điện thoại</label>
                    <TextBox className="sm-textbox w-100" value={item.Phone_Number || ''}
                        onChange={(e => {
                            item.Phone_Number = e.target.value;
                            this.setState({ emp: item })
                        })}
                    />
                    </div>
                    <div style={{padding:'10px 0px'}}>
                    <label>Ngày sinh </label>                   
                    <DatePicker                         
                        selectedDate={item.DOB}                       
                        onChange={(e)=>{
                            item.DOB=e
                            this.setState({emp:item})
                        }}                        
                        placeholder='Date picker placeholder'
                    />
                    </div>
                    
                    <label>Giới tính</label>              
                    
                    <ComboBox textField="Value" valueField="Key"
                    className="sm-combobox w-50"
                    dataSource={this.state.GioiTinh}
                    selectedValue={this.state.GioiTinh?.find(m=>m.Key===item.Gender)?.Key?.toString()||''}
                    onChange={(e)=>{
                        item.Gender=Number(e)
                        this.setState({emp:item})
                    }}
                    />
                
                {this.state.emps_cert.map((emp_cert: Employee_Cert, index) => {
                    return (<div key={index} style={{display: 'flex', position: 'relative', margin: '15px 5px', gap: '20px' }}>
                        <label>Cert_Name</label>
                        <TextBox style={{ width: '200px' }}
                            value={emp_cert.Cert_Name || ''}
                            onChange={(e) => {
                                emp_cert.Cert_Name = e.target.value
                                this.setState({ emp_cert: emp_cert })
                            }} />

                        <label>Cert_Code</label>
                        <TextBox style={{ width: '200px' }} value={emp_cert.Cert_Code || ''}
                            onChange={(e) => {
                                emp_cert.Cert_Code = e.target.value
                                this.setState({ emp_cert: emp_cert })
                            }} />
                        <SMButton className="btn btn-danger" onClick={() => { this.removeItem(emp_cert) }}>Xóa</SMButton>
                    </div>
                    )
                })}

                <div style={{ margin: '10px 10px' }}>
                    <span style={{margin: '10px' }}>Thêm giấy tờ </span>
                    <SMButton className="btn btn-primary"
                        onClick={() => { this.insertCert() }}
                    >+</SMButton>
                </div>
                <SMButton style={{ width: '100px', margin: 'auto', position: 'relative' }}
                    className="btn btn-primary"
                    onClick={() => {
                        if (this.state.emp.Employee_ID === undefined) {
                            if (window.confirm("Bạn muốn thêm bản ghi này chứ?") === true) {
                                this.Insert(item, item_cert);
                            }
                        }
                        else {
                            if (window.confirm("Bạn muốn cập nhật bản ghi này chứ?") === true) {
                                this.Update(item, item_cert);
                            }

                        }}}>
                        <i className={`${Icons.save}`}></i> Lưu</SMButton>
                </div>
            </div>
        )
    }

}


export default Insert;