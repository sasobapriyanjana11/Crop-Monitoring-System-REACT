import {Field} from "./Field.ts";
import {Crop} from "./Crop.ts";
import {Staff} from "./Staff.ts";
import {ReactNode} from "react";

export class MonitoringLog {
    logCode: string;
    logDate: Date;
    observation:string;
    observedImage:string;
    field:Array<Field>;
    fieldCode:ReactNode;
    crop:Array<Crop>;
    cropCode:ReactNode;
    staff:Array<Staff>;
    staffId:ReactNode;

    constructor(logCode: string, logDate: Date, observation: string, observedImage: string, field:Array<Field>,crop:Array<Crop>,staff:Array<Staff>) {
        this.logCode = logCode;
        this.logDate = logDate;
        this.observation = observation;
        this.observedImage = observedImage;
        this.field = field;
        this.crop = crop;
        this.staff = staff;
    }
}