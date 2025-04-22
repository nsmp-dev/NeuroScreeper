/**
 * move any ingredients to the capitol
 */
StructureTerminal.prototype.moveIngredients = function () {
    let main_memory = Util.getMainMemory();
    let ingredients = {};
    let energy = this.store[RESOURCE_ENERGY];

    for (let resource in this.store) {
        if (this.store[resource] > 0 && INGREDIENTS.includes(resource)) {
            ingredients[resource] = this.store[resource];
        }
    }

    for (let resource in ingredients) {
        let amount = ingredients[resource];
        while (amount > 1 && energy < Game.market.calcTransactionCost(amount, this.room.name, main_memory.capitol_room_name)) {
            amount--;
        }

        if (amount > 0) {
            this.send(resource, amount, main_memory.capitol_room_name, 'Resources for the capitol');
            return;
        }
    }
};

/**
 * sell any excess energy and commodities
 */
StructureTerminal.prototype.sellFinalProducts = function () {
    let sellable_resources = {};
    let energy = this.store[RESOURCE_ENERGY];

    if (energy > TERMINAL_ENERGY_CAP) {
        sellable_resources[RESOURCE_ENERGY] = energy - TERMINAL_ENERGY_CAP;
    }

    for (let resource in this.store) {
        if (this.store[resource] > 0 && FINAL_PRODUCTS.includes(resource)) {
            sellable_resources[resource] = this.store[resource];
        }
    }

    for (let resource in sellable_resources) {
        let amount = sellable_resources[resource];
        let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resource});
        if (orders.length == 0) {
            break;
        }

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
        if (trade_amount > amount) {
            // set the trade amount to the energy in the terminal
            trade_amount = amount;
        }

        if (resource == RESOURCE_ENERGY) {
            // adjust trade amount based on cost
            while (trade_amount > 1 && (energy - trade_amount) < Game.market.calcTransactionCost(trade_amount,this.room.name, highest.roomName)) {
                trade_amount--;
            }
        }else{
            while (trade_amount > 1 && energy < Game.market.calcTransactionCost(trade_amount,this.room.name, highest.roomName)) {
                trade_amount--;
            }
        }


        if (trade_amount > 0) {
            this.send(resource, trade_amount, highest.roomName, 'Thanks!');
            return;
        }
    }
};
/**
 * buy any affordable subscription tokens
 */
StructureTerminal.prototype.buySubToken = function () {
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
/**
 * run the terminal
 */
StructureTerminal.prototype.run = function () {
    let main_memory = Util.getMainMemory();
    // if this room's terminal timer has not been initialized
    if (main_memory.terminal_timers[this.room.name] == undefined) {
        // initialize it
        main_memory.terminal_timers[this.room.name] = 0;
    }

    // if the sell timer has gone off
    if (main_memory.terminal_timers[this.room.name] >= TERMINAL_TIMER_LENGTH &&
        // and the terminal has a minimal amount of energy
        this.store[RESOURCE_ENERGY] > TERMINAL_ENERGY_CAP &&
        // and the terminal is not on cooldown
        this.cooldown == 0) {
        // reset the sell timer
        main_memory.terminal_timers[this.room.name] = 0;
        // sell any sellable resources
        this.sellFinalProducts();
        this.buySubToken();
        if (main_memory.capitol_room_name != null && Memory.capitol_room_name != this.room.name) {
            this.moveIngredients();
        }
    } else {
        // increment the sell timer
        main_memory.terminal_timers[this.room.name]++;
    }
}