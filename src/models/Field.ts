import {Crop} from "./Crop.ts";
import {Staff} from "./Staff.ts";
import {ReactNode} from "react";

export class Field {
    fieldCode: string;
    fieldName: string;
    fieldLocation :string
    extentSize:number;
    crops:Array<Crop>;
    cropCode:ReactNode;
    staff:Array<Staff>;
    staffId:ReactNode;
    fieldImage1:string;
    fieldImage2:string;

    constructor(fieldCode:string,fieldName:string,fieldLocation:string,extentSize:number,crops:Array<Crop>,staff:Array<Staff>,fieldImage1:string,fieldImage2:string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.extentSize=extentSize;
        this.crops = crops;
        this.staff = staff;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
    }
}