export class Staff{
    id:string;
    firstName:string;
    lastName:string;
    designation:string;
    gender:string;
    joinedDate:string;
    DOB:string;
    address:string;
    contactNumber:number;
    email:string;
    role:string;
    fieldCode:string;
    vehicleCode:string;

    constructor(id: string,firstName:string,lastName:string,designation:string,gender:string,joinedDate:string,DOB:string,address:string,contactNumber:number,email:string,role:string,fieldCode:string,vehicleCode:string) {
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.designation=designation;
        this.gender=gender;
        this.joinedDate=joinedDate;
        this.DOB=DOB;
        this.address=address;
        this.contactNumber=contactNumber;
        this.email=email;
        this.role=role;
        this.fieldCode=fieldCode;
        this.vehicleCode=vehicleCode;

    }
}