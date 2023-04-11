import Employee from "../entities/Employee";
import Employee_Cert from "../entities/Employee_Cert";
import Gender from "../entities/Gender";
import ResultEmployeeSearch from "../entities/ResultEmployeeSearch";


class EmployeeDTO{
    Filter?:Employee;
    Code?:string;
    Message?:string;
    PageIndex?:number;
    PageSize?:number;
    TotalRecords?:number;
    Employee?:Employee;
    Employees?:Array<Employee>
    ResultEmployees?:Array<ResultEmployeeSearch>
    Gender?:Array<Gender>;
    Employees_Cert?:Array<Employee_Cert>    
    Employees_Cert_Delete?:Array<Employee_Cert>    
    ActionName?:string;

}
export default EmployeeDTO;