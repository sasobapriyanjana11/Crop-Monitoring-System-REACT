export class Vehicle {
 vehicleCode: string;
 LicensePlateNumber: string;
 category: string;
 fuelType: string;
 staffId: string;
 remarks: string;

 constructor(vehicleCode: string, LicensePlateNumber: string, category: string, fuelType: string, staffId:string, remarks: string) {
  this.vehicleCode = vehicleCode;
  this.LicensePlateNumber = LicensePlateNumber;
  this.category = category;
   this.fuelType = fuelType;
   this.staffId = staffId;
   this.remarks = remarks
 }
 
}