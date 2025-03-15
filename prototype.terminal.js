// how often to run the terminal
StructureTerminal.prototype.TIMER_LENGTH = 100;

// run the tower
StructureTerminal.prototype.run = function () {
    // if the terminal timers have not been initiated
    if (Memory.terminal_timers == undefined) {
        // initialize them
        Memory.terminal_timers = {};
    }
    // if this room's terminal timer has not been initialized
    if (Memory.terminal_timers[this.room.name] == undefined) {
        // initialize it
        Memory.terminal_timers[this.room.name] = {
            // timer for selling
            sell: 2,
            // timer for buying
            buy: 0,
        };
    }

    // if the sell timer has gone off
    if (Memory.terminal_timers[this.room.name].sell >= this.TIMER_LENGTH &&
        // and the terminal has a minimal amount of energy
        this.store[RESOURCE_ENERGY] > 1000 &&
        // and the terminal is not on cooldown
        this.cooldown == 0) {
        // reset the sell timer
        Memory.terminal_timers[this.room.name].sell = 0;
        // sell any sellable resources
        this.sell();
    } else {
        // increment the sell timer
        Memory.terminal_timers[this.room.name].sell++;
    }

    // if the buy timer has gone off
    if (Memory.terminal_timers[this.room.name].buy >= this.TIMER_LENGTH &&
        // and the terminal has a minimal amount of energy
        this.store[RESOURCE_ENERGY] > 1000 &&
        // and the terminal is not on cooldown
        this.cooldown == 0) {
        // reset the buy timer
        Memory.terminal_timers[this.room.name].buy = 0;
        // buy any affordable subscription tokens
        this.buy();
    } else {
        // increment the buy timer
        Memory.terminal_timers[this.room.name].buy++;
    }
}

// sell any excess energy
StructureTerminal.prototype.sell = function () {
    // grab the energy in the terminal
    let energy = this.store[RESOURCE_ENERGY];
    // grab all the orders for buying energy
    let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});

    // if there are no orders found
    if (orders.length == 0) {
        // exit the function
        return;
    }

    // default the highest price order to the first one
    let highest = orders[0];

    // loop through the orders
    for (let order of orders) {
        // if the price of this order is higher than the highest price
        if (order.price > highest.price) {
            // set the highest price order to the current order
            highest = order;
        }
    }

    // default the trading amount to the amount of the trade
    let trade_amount = highest.remainingAmount;

    // if the trade amount is more than the energy in the terminal
    if (trade_amount > energy) {
        // set the trade amount to the energy in the terminal
        trade_amount = energy;
    }

    // calculate the distance to the room we are selling to
    let dist = Game.map.getRoomLinearDistance(this.room.name, highest.roomName);
    // calculate the optimal amount to sell, taking into account the fees
    let optimal_amount = Math.floor((Math.exp(dist / 30) * trade_amount) / ((2 * Math.exp(dist / 30)) - 1));

    // execute the sale
    this.send(RESOURCE_ENERGY, optimal_amount - 1, highest.roomName, 'Thanks!');
};

// buy any affordable subscription tokens
StructureTerminal.prototype.buy = function () {
    // grab all the orders for selling a subscription token
    let orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: SUBSCRIPTION_TOKEN});

    // if no orders are found
    if (orders.length == 0) {
        // exit the function
        return;
    }

    // default the cheapest price to the first order
    let lowest = orders[0];

    // loop through the orders
    for (let order of orders) {
        // if the current order price is lower than the lowest order price
        if (order.price < lowest.price) {
            // set the lowest price order to the current order
            lowest = order;
        }
    }

    // if we can afford the price
    if (Game.market.credits >= lowest.price) {
        // buy a subscription token
        Game.market.deal(lowest.id, 1);
    }
};