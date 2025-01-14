import {Field} from "./Field.ts";
import {ReactNode} from "react";

export class Crop {
    cropCode:string;
    commonName:string;
    scientificName:string;
    image:File | null;
    category:string;
    cropSeason:string;
    field:Array<Field>;
    fieldCode: ReactNode;

    constructor(cropCode:string,commonName:string,scientificName:string,image:File,cropSeason:string,category:string,field:Array<Field>) {
        this.cropCode = cropCode;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.image = image;
       this.category=category;
       this.cropSeason = cropSeason;
       this.field = field;

    }

}