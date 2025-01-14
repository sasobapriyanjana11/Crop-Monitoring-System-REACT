import {Field} from "./Field.ts";
import {Vehicle} from "./Vehicle.ts";

export class Staff{
    id:string;
    firstName:string;
    lastName:string;
    designation:string;
    gender:string;
    joinedDate:Date;
    DOB:Date
    address:string;
    contactNumber:number;
    email:string;
    role:string;
    field:Array<Field>;
    vehicle:Array<Vehicle>;

    constructor(id: string,firstName:string,lastName:string,designation:string,gender:string,joinedDate:Date,DOB:Date,address:string,contactNumber:number,email:string,role:string,field:Array<Field>,vehicle:Array<Vehicle>) {
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
        this.field=field;
        this.vehicle=vehicle;

    }
}