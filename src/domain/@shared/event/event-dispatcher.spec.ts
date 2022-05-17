import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendLogWhenCustomerChangesAddress from "../../customer/event/handler/send-log-when-customer-changes-address";
import SendLogWhenCustomerIsCreatedHandler2 from "../../customer/event/handler/send-log-when-customer-is-created-handler1";
import SendLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-log-when-customer-is-created-handler1";
import SendLogWhenCustomerIsCreatedHandler1 from "../../customer/event/handler/send-log-when-customer-is-created-handler2";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should handlers of CustomerCreatedEvent be called when CustomerCreatedEvent event is fired", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLogWhenCustomerIsCreatedHandler1();
    const eventHandler2 = new SendLogWhenCustomerIsCreatedHandler2();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    expect(spyEventHandler1).toHaveBeenCalledTimes(0);
    expect(spyEventHandler2).toHaveBeenCalledTimes(0);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Maria João Silva e Souza",

    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });


  it("should handlers of CustomerCreatedEvent be called when CustomerCreatedEvent event is fired", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerChangesAddress();
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
 
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const customerCreatedEvent = new CustomerChangeAddressEvent({
      name: "Maria João Silva e Souza",
      id: "123",
      address: "Av. torquarto tapajós, nº 666",
    });

    expect(spyEventHandler).toHaveBeenCalledTimes(0);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

