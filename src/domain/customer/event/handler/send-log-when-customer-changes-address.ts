import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendLogWhenCustomerChangesAddress
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle({eventData: {id, name, address}}: CustomerChangeAddressEvent): void {
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}.`); 
  }
}
