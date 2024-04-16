"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProductRepository = void 0;
// Rather than calling the database for data, for testing we send all the calls here
class MockProductRepository {
    create(data) {
        const mockProduct = Object.assign({ id: 214 }, data);
        return Promise.resolve(mockProduct);
    }
    update(data) {
        const mockUpdate = Object.assign({}, data);
        return Promise.resolve(mockUpdate);
    }
    delete(id) {
        return Promise.resolve(id);
    }
    find(limit, offset) {
        return Promise.resolve([]);
    }
    findOne(id) {
        if (id !== "6a66") {
            let x = {
                id: id,
                name: "Cold Drink",
                description: "Cold soda for hot weathers",
                price: 30,
                stock: 5,
            };
            return Promise.resolve(x);
        }
        else {
            let x = {}; // Return null when id is 666;
            return Promise.resolve(x);
        }
    }
}
exports.MockProductRepository = MockProductRepository;
