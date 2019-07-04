import Bus from '../model/bus';

class BusService {
  static async createBus(newBus) {
    const bus = await Bus.createBus(newBus);
    bus.bus_id = bus.id;
    delete bus.id;
    return {
      status: 'success',
      statuscode: 201,
      data: {
        ...bus,
      },
      message: 'New bus created successfully',
    };
  }
}

export default BusService;
