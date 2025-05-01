/**
 * The base game StructureTerminal class. Custom properties and functions are listed below.
 * @class StructureTerminal
 */

/**
 * Transfers available ingredients from this terminal to the terminal in the capitol room.
 * Processing is done one ingredient at a time to avoid exceeding energy limits.
 * @memberOf StructureTerminal#
 * @member {function} moveIngredients
 */
StructureTerminal.prototype.moveIngredients = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
    // hash of ingredients and their amounts found in the terminal
    let ingredients = {};
    // grab the energy in the terminal
    let energy = this.store[RESOURCE_ENERGY];

    // loop through the resources in the terminal's store
    for (let resource in this.store) {
        // if the resource is an ingredient
        if (this.store[resource] > 0 && INGREDIENTS.includes(resource)) {
            // set the amount on the ingredient hash
            ingredients[resource] = this.store[resource];
        }
    }

    // loop through the ingredients found
    for (let resource in ingredients) {
        // grab the amount of that ingredient
        let amount = ingredients[resource];
        // while the amount to send is not affordable
        while (amount > 1 && energy < Game.market.calcTransactionCost(amount, this.room.name, main_memory.capitol_room_name)) {
            // lower the amount
            amount--;
        }

        // if the amount is non-zero and affordable
        if (amount > 0 && Game.market.calcTransactionCost(amount, this.room.name, main_memory.capitol_room_name)) {
            // send the transaction
            let result = this.send(resource, amount, main_memory.capitol_room_name, 'Resources for the capitol');
            // if the result of sending the resource was success
            if (result == OK) {
                // break the loop
                break;
            }
        }
    }
};
/**
 * Sells excess energy and final product commodities on the in-game market.
 * For energy, sells any amount above TERMINAL_ENERGY_CAP.
 * For final products, sells all available quantities.
 * Finds best market prices and executes trades when affordable.
 * @memberOf StructureTerminal#
 * @member {function} sellFinalProducts
 */
StructureTerminal.prototype.sellFinalProducts = function () {
    // create a hash of the sellable resources
    let sellable_resources = {};
    // grab the energy in the terminal
    let energy = this.store[RESOURCE_ENERGY];

    // if the energy in the terminal is above the cap
    if (energy > TERMINAL_ENERGY_CAP) {
        // add the excess energy to the sellable resources hash
        sellable_resources[RESOURCE_ENERGY] = energy - TERMINAL_ENERGY_CAP;
    }

    // loop through the resources in the store
    for (let resource in this.store) {
        // if the resource is a final product
        if (this.store[resource] > 0 && FINAL_PRODUCTS.includes(resource)) {
            // add the resource to the sellable resources hash
            sellable_resources[resource] = this.store[resource];
        }
    }

    // loop through the sellable resources
    for (let resource in sellable_resources) {
        // grab the amount of the resource
        let amount = sellable_resources[resource];
        // grab all the orders for this resource
        let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resource});
        // if no orders were found
        if (orders.length == 0) {
            // break the loop
            break;
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
        // if the trade amount is larger than the amount we have
        if (trade_amount > amount) {
            // set the trade amount to the amount in the terminal
            trade_amount = amount;
        }

        // if the resource is energy
        if (resource == RESOURCE_ENERGY) {
            // while the trade amount is not affordable
            while (trade_amount > 1 && (energy - trade_amount) < Game.market.calcTransactionCost(trade_amount, this.room.name, highest.roomName)) {
                // lower the trade amount
                trade_amount--;
            }
        } else {
            // while the trade amount is not affordable
            while (trade_amount > 1 && energy < Game.market.calcTransactionCost(trade_amount, this.room.name, highest.roomName)) {
                // lower the trade amount
                trade_amount--;
            }
        }

        // if the trade amount is non-zero
        if (trade_amount > 0) {
            // execute the deal
            let result = Game.market.deal(highest.id, trade_amount, highest.roomName);
            // if the transaction was successful
            if (result == OK) {
                // break the loop
                break;
            }
        }
    }
};
/**
 * Attempts to purchase subscription tokens from the market.
 * Finds the lowest priced subscription token order and executes
 * the purchase if there are enough credits available.
 * Only buys one token at a time.
 * @memberOf StructureTerminal#
 * @member {function} buySubToken
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
 * Executes the terminal's main operational cycle. This method manages periodic tasks including:
 * - Selling excess resources and final products on the market
 * - Purchasing subscription tokens when affordable
 * - Transferring ingredients to the capitol room if this isn't the capitol
 * The operations are performed based on cooldown timers and energy thresholds.
 * @memberOf StructureTerminal#
 * @member {function} run
 */
StructureTerminal.prototype.run = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
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
        // sell any final products
        this.sellFinalProducts();
        // buy any sub tokens
        this.buySubToken();
        // if the capitol is set, and it is not this room
        if (main_memory.capitol_room_name != null && Memory.capitol_room_name != this.room.name) {
            // move any ingredients to the capitol room
            this.moveIngredients();
        }
    } else {
        // increment the sell timer
        main_memory.terminal_timers[this.room.name]++;
    }
};
