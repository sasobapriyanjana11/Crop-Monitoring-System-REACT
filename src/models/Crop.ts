export class Crop {
    cropCode:string;
    commonName:string;
    scientificName:string;
    image:string;
    category:string;
    cropSeason:string;
    fieldCode: string;

    constructor(cropCode:string,commonName:string,scientificName:string,image:string,cropSeason:string,category:string,fieldCode:string) {
        this.cropCode = cropCode;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.image = image;
       this.category=category;
       this.cropSeason = cropSeason;
       this.fieldCode = fieldCode;

    }

}