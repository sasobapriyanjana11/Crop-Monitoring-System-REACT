export class MonitoringLog {
    logCode: string;
    logDate: string;
    observation:string;
    observedImage:string;
    fieldCode:string;
    cropCode:string;
    staffId:string;

    constructor(logCode: string, logDate: string, observation: string, observedImage: string, fieldCode:string,cropCode:string,staffId:string) {
        this.logCode = logCode;
        this.logDate = logDate;
        this.observation = observation;
        this.observedImage = observedImage;
        this.fieldCode = fieldCode;
        this.cropCode = cropCode;
        this.staffId = staffId;
    }
}