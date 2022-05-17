import EventInterface from "../../@shared/event/event.interface";

export interface ICustomerChangeAddressEvent{
  name: string;
  address: string;
  id: string;
}

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: ICustomerChangeAddressEvent;
  

  constructor(eventData: ICustomerChangeAddressEvent) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
