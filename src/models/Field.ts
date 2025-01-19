export class Field {
    fieldCode: string;
    fieldName: string;
    fieldLocation :string
    extentSize:number;
    cropCode:string;
    staffId:string;
    fieldImage1:string;
    fieldImage2:string;

    constructor(fieldCode:string,fieldName:string,fieldLocation:string,extentSize:number,cropCode:string,staffId:string,fieldImage1:string,fieldImage2:string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.extentSize=extentSize;
        this.cropCode= cropCode;
        this.staffId = staffId;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
    }
}