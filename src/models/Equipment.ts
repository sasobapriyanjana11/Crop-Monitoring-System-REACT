export class Equipment {
    equipmentId: string;
    name: string;
    type: string;
    status: string;
    fieldCode:string
    staffCode:string

    constructor(
        equipmentId: string,
        name: string,
        type: string,
        status: string,
        staffCode: string,
        fieldCode: string
    ) {
        this.equipmentId = equipmentId;
        this.name = name;
        this.type = type;
        this.status = status;
        this.staffCode = staffCode;
        this.fieldCode = fieldCode;
    }
}
