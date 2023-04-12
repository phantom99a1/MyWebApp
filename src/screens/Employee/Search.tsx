import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from "../../entities/Employee";
import ResultEmployeeSearch from "../../entities/ResultEmployeeSearch";
import EmployeeDTO from "../../DtoParams/EmployeeDTO";
import moment from "moment";
import Gender from "../../entities/Gender";
import Employee_Cert from "../../entities/Employee_Cert";
import styles from './pagination.module.scss';
import classNames from 'classnames';
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constants/ApiUrl";
import { Link } from "react-router-dom";
import { RouteUrls } from "../RouteManager";
import SMButton from "../../components/SMButton";
import CheckBox from "../../components/CheckBox";
interface istates{
    Filter?: Employee;
    Employee?: Employee;
    ResultEmployees?: Array<ResultEmployeeSearch>;
    statusInsert?:boolean;
    GioiTinh?:Array<Gender>;
    SelectData?:Array<Employee>;
    EmployeeDTO?:EmployeeDTO;
    Pagination? : boolean;
    Employees_Cert?:Array<Employee_Cert>;
    Employee_Cert?:Employee_Cert;
    //pageSize
    pageSize:number;
    //pageIndex
    currentPage?:number;
    //totalPage
    totalPage?: number;
    checkBox:boolean;
   
}
interface iprops{
}

class Search extends React.Component<iprops, istates> {

    constructor(props: iprops) {
        super(props);
        
        this.state = {
            Filter: new Employee(),
            Employee: new Employee(),
            ResultEmployees: [],
            statusInsert:false,
            GioiTinh:[],
            SelectData:[],
            pageSize: 4,
            currentPage:0,
            Pagination :false,
            Employees_Cert:[],
            Employee_Cert:new Employee_Cert(),
            checkBox:false

        }
    }
    getGender(){
        var dtoResquest=new EmployeeDTO();

        dtoResquest.ActionName='getgender';
        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute,JSON.stringify(dtoResquest))
        .then(res=>{
            this.setState({GioiTinh:res.Gender})}        
    )}
    toggle = () => this.setState({statusInsert: true});
    closeToggle(){this.setState({statusInsert:false})}
    Delete(Employee: Employee) {
        let dtoResquest=new EmployeeDTO();
        dtoResquest.ActionName='delete';
        dtoResquest.Employee=Employee;

        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute,JSON.stringify(dtoResquest))
        .then(()=>this.loadData())        
    }

    DeleteAll(Employees:Array<Employee>){
        let dtoResquest=new EmployeeDTO();
        dtoResquest.ActionName='deleteall';
        dtoResquest.Employees=Employees;
        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute,JSON.stringify(dtoResquest))
        .then(()=>this.loadData())
    }

    handleSubmit = (e: any): void => {
        e.preventDefault();        
        this.setState({
            Pagination:true,
            currentPage:0,
        },()=>this.loadData())
    }
    componentDidMount(): void {
        this.getGender();
    }

    private loadData(){
        const Filter  = this.state.Filter;        
        let pageIndex  = this.state.currentPage;        
        let pageSize  = this.state.pageSize;     
        let dtoResquest=new EmployeeDTO();
        dtoResquest.Filter=Filter;
        dtoResquest.ActionName='search';
        dtoResquest.PageIndex=pageIndex;
        dtoResquest.PageSize=pageSize;
        
        HttpUtils.post<EmployeeDTO>(ApiUrl.Employee_Execute,JSON.stringify(dtoResquest))
        .then(res=>{
            this.setState({
                ResultEmployees:res.ResultEmployees,
                checkBox:false
            })
            this.caculateTotalPage(pageSize,res.TotalRecords!)
        })    
    }

    caculateTotalPage(pageSize: number, totalRecords: number)
    {
        let totalPage = Math.ceil(totalRecords / pageSize);
        this.setState({
            totalPage: totalPage
        })
    }   

    pagination(pageNumber:number):Array<number>{
        let arr=new Array<number>();
        for(let i=1;i<=pageNumber;i++)
            arr.push(i);
        return arr;
    }
    render() {
        let item = this.state.Filter!;
        let empdata=this.state.SelectData!;
        let pageStep=3;
        return (
            <div className="layout-main">
                <div style={{ width: '100%', height: "80px", border: '2px solid none', display: 'flex', backgroundColor: 'yellow', alignItems: 'center', justifyContent:'space-around' }}>                 
                    <h2>Quản lý nhân viên</h2>
                    <div>  
                        <Link className="btn btn-primary" style={{color:'white'}} to={`${RouteUrls.Insert}` }>Tạo mới</Link>&nbsp;                   
                        {/* Xóa nhiều bản ghi  (done)*/}
                        {!this.state.checkBox && <SMButton className="btn btn-danger" onClick={
                            ()=>{this.setState({
                                checkBox:true
                            })                               
                            }}>Xóa nhiều bản ghi</SMButton> }

                           {this.state.checkBox && <SMButton
                           className="btn btn-danger m-5"
                           onClick={()=>{
                            if(window.confirm("Bạn muốn xóa những bản ghi này chứ?")===true){
                               this.DeleteAll(empdata)}                                                                     
                       }}>Xóa</SMButton>} 
                       
                    </div>                  
                </div>
                <div className="container-fluid" >
                    <div className="row" >
                        <div className="col-12" style={{ border: '2px solid black', float: 'left'}}>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>                                
                                    <form >
                                        <label>
                                            Tài khoản:</label>
                                        <input className="form-control" value={item.User_Name||''} style={{ fontSize: '16', width:'400px' }} type="text" 
                                        onChange={(e) => {
                                            item.User_Name = e.target.value;                                            
                                            this.setState({Filter: item})
                                        }} />
                                        <br/>                                        
                                        <label>Tên nhân viên:</label>
                                        <input className="form-control" type="text" value={item.Name||''} style={{ fontSize: '16', width:'400px' }} onChange={(e) => {
                                            item.Name = e.target.value;
                                            this.setState({
                                                Filter: item
                                            })
                                        }} />                                   
                                        <br/>
                                    </form>
                                        <div>
                                        <SMButton className="btn btn-warning" onClick={this.handleSubmit}>Tìm</SMButton>&nbsp;                            
                                        <SMButton className="btn btn-secondary" onClick={() =>
                                            this.setState({
                                                Filter: {
                                                    User_Name: '',
                                                    Name: ''
                                                },
                                               ResultEmployees:[],
                                               statusInsert:false,
                                               Employee:new Employee(),
                                               currentPage:0,                                           
                                               Pagination:false, 
                                               pageSize:4,
                                               checkBox:false                                                                                                                                                                                                               
                                            })
                                        }>Reset</SMButton>
                                        <br/>
                                        <br/>
                                        </div>
                                
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered" style={{ textAlign: 'center'  }}>
                                    <thead>
                                        <tr>
                                            {this.state.checkBox && <th>#</th>}
                                            <th>ID</th>
                                            <th>Tài khoản</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Số điện thoại</th>
                                            <th>Giới tính</th>
                                            <th>Ngày sinh</th>
                                            <th>Giấy tờ</th>
                                            <th>Xử lý</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {                                       
                                            this.state.ResultEmployees?.map((item: ResultEmployeeSearch, index) => {                                                
                                                let gt= this.state.GioiTinh?.find( m => m.Key===item.Gender)?.Value;                                                
                                                return (
                                                    <tr key={index}>
                                                       {this.state.checkBox && 
                                                       <td>                                                            
                                                            <CheckBox
                                                            checked={item.isChecked}
                                                            onChange={()=>{
                                                               let ResultEmployees = this.state.ResultEmployees!
                                                               ResultEmployees[index].isChecked = !item.isChecked
                                                               this.setState({
                                                                ResultEmployees,
                                                                SelectData:ResultEmployees.filter(m=>m.isChecked===true)
                                                            })}}                                                            
                                                            />
                                                        </td> 
                                                        }
                                                        <td >{item.Employee_ID}</td>
                                                        <td>{item.User_Name}</td>
                                                        <td>{item.Name}</td>
                                                        <td>{item.Address}</td>
                                                        <td>{item.Phone_Number}</td>
                                                        <td>{gt}</td>
                                                        {/* Chuyển dùng DOB -> format về dạng dd/MM/yyyy (moment) (done)*/}
                                                        <td>{moment(item.DOB).format("DD/MM/yyyy")}</td>
                                                        <td>{item.Certificate}</td> 
                                                        <td className="col-2">                                                     
                                                            <Link className="btn btn-primary" 
                                                            style={{color:'white'}} to={`${RouteUrls.Edit}/${item.Employee_ID}` }>Sửa</Link>
                                                            &nbsp;                                                             
                                                            <SMButton className="btn btn-danger" onClick={() => {
                                                                if(window.confirm('Bạn có muốn xóa bản ghi này không?')===true)                                                               
                                                                    this.Delete(item)                                                                                                                           
                                                            }}>Xóa </SMButton>                                                                                                                  
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* phân trang */}

                            { this.state.Pagination &&
                            <div className="form-group col" style={{display:'flex', gap:"50px"}}>
                            <select className="form-control form-control-sm" defaultValue={4}
                                style={{width:'50px', height:'70%'}}
                             onChange={(e)=>{                               
                               this.setState({
                                currentPage:0,
                                pageSize:Number(e.target.value)          
                            },()=>this.loadData())                             
                            }}
                            >
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={7}>7</option>
                                <option value={10}>10</option>
                            </select>   
                            <div style={{ display:'flex', width:'80%', height:'70%', justifyContent:'center', textAlign:'center'}}>
                                {/* về trang 1 */}
                                <SMButton className={classNames([styles.pageItem, styles.sides].join(' '))}
                                enable={this.state.currentPage!==0} 
                                onClick={()=>this.setState({
                                    currentPage:0
                                },()=>this.loadData())}>&lt;
                                </SMButton>
                            {this.state.totalPage!>1 && 
                            <div>
                                {/* trang 1 */}
                                <SMButton className={classNames(styles.pageItem,
                                 {[styles.active]: this.state.currentPage === 0,})}
                                onClick={()=>this.setState({
                                    currentPage:0
                                },()=>this.loadData())}>{1}
                                </SMButton>
                                {/* Nhảy về 3 trang */}
                                {this.state.currentPage!>pageStep-1 && 
                                <SMButton style={{color:'black', outline:'none',border:'none', backgroundColor:'transparent'}}
                                    onClick={()=>this.setState({
                                        currentPage:this.state.currentPage!-pageStep
                                    },()=>this.loadData())}>
                                    {"..."}                                    
                                </SMButton>
                                }
                                {this.state.currentPage === this.state.totalPage!-1 &&this.state.totalPage!>pageStep && (
                                <SMButton className={styles.pageItem}
                                    onClick={()=>this.setState({
                                        currentPage:this.state.currentPage!-pageStep+1
                                    },()=>this.loadData())}>
                                        {this.state.currentPage!-pageStep+2}
                                </SMButton>)
                                }
                                {this.state.currentPage! >pageStep-2 && (
                                <SMButton className={styles.pageItem}
                                onClick={()=>this.setState({
                                    currentPage:this.state.currentPage!-pageStep+2
                                },()=>this.loadData())}>
                                    {this.state.currentPage!-pageStep+3}
                                </SMButton>)}
                                {this.state.currentPage! !==0 && this.state.currentPage! !==this.state.totalPage!-1&&(
                                    <SMButton className={[styles.pageItem, styles.active].join(' ')}
                                    onClick={()=>this.setState({
                                        currentPage:this.state.currentPage! 
                                    },()=>this.loadData())}>
                                        {this.state.currentPage!+1}
                                    </SMButton>
                                )}
                                {this.state.currentPage! <this.state.totalPage! -pageStep+1&& (
                                    <SMButton className={styles.pageItem}
                                    onClick={()=>this.setState({
                                        currentPage: this.state.currentPage!+pageStep-2
                                    },()=>this.loadData())}>
                                        {this.state.currentPage!+pageStep-1}
                                    </SMButton>
                                )}
                                {this.state.currentPage! ===0 && this.state.totalPage!>pageStep &&(
                                    <button className={styles.pageItem}
                                    onClick={()=>this.setState({
                                        currentPage: this.state.currentPage!+pageStep-1
                                    },()=>this.loadData())}>
                                        {this.state.currentPage!+pageStep}
                                    </button>
                                )}
                                {this.state.currentPage! < this.state.totalPage! -pageStep &&(
                                    <SMButton style={{color:'black', outline:'none',border:'none', backgroundColor:'transparent'}}
                                     onClick={()=>this.setState({
                                        currentPage: this.state.currentPage!+pageStep
                                    },()=>this.loadData())}>
                                        {"..."}
                                    </SMButton>
                                )}                               
                                {/* Trang cuối */}
                                <SMButton className={classNames(styles.pageItem,
                                 {[styles.active]: this.state.currentPage === this.state.totalPage!-1,})}
                                onClick={()=>this.setState({
                                    currentPage: this.state.totalPage!-1 
                                },()=>this.loadData())}>
                                    {this.state.totalPage! }
                                </SMButton>                                                              
                            </div>
                            }
                            {this.state.totalPage! ===1&& 
                                <SMButton className={classNames(styles.pageItem,
                                 {[styles.active]: this.state.currentPage === this.state.totalPage!-1,})}
                                onClick={()=>this.setState({
                                    currentPage: this.state.totalPage!-1 
                                },()=>this.loadData())}>
                                    {this.state.totalPage! }
                                </SMButton> 
                            }                            
                            <SMButton className={classNames([styles.pageItem, styles.sides].join(' '))}
                            enable={this.state.currentPage!==this.state.totalPage! - 1}
                            onClick={()=>this.setState({
                                currentPage:this.state.totalPage!-1
                            },()=>this.loadData())}
                            >&gt;</SMButton>
                            </div>

                            <div style={{marginRight:'20px'}}>
                                Page {this.state.currentPage! + 1}/{this.state.totalPage!}
                            </div>                            
                            </div>}
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;