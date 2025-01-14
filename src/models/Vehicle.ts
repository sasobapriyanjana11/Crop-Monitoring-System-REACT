import {Staff} from "./Staff.ts";

export class Vehicle {
 vehicleCode: string;
 LicensePlateNumber: string;
 category: string;
 fuelType: string;
 allocateStaffMember:Staff[];
 remarks: string;

 constructor(vehicleCode: string, LicensePlateNumber: string, category: string, fuelType: string, allocateStaffMember: Staff[], remarks: string) {
  this.vehicleCode = vehicleCode;
  this.LicensePlateNumber = LicensePlateNumber;
  this.category = category;
   this.fuelType = fuelType;
   this.allocateStaffMember = allocateStaffMember;
   this.remarks = remarks
 }
 
}