StructureTerminal.prototype.TIMER_LENGTH = 10;
StructureTerminal.prototype.sell = function(){
	if (this.memory.sell_timer == undefined) {
		this.memory.sell_timer = this.TIMER_LENGTH;
	}

	let energy = this.store[RESOURCE_ENERGY];

	if (this.memory.sell_timer >= this.TIMER_LENGTH && energy > 1000 && this.cooldown == 0) {
		this.memory.sell_timer = 0;
	}else{
		this.memory.sell_timer++;
		return;
	}

	let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});

	if (orders.length == 0) {
		return;
	}

	let highest = orders[0];

	orders.forEach(function(order){
		if (order.price > highest.price) {
			highest = order;
		}
	});

	let trade_amount = highest.remainingAmount;

	if (trade_amount > energy) {
		trade_amount = energy;
	}

	let dist = Game.map.getRoomLinearDistance(this.room.name, highest.roomName);
	let optimal_amount = Math.floor((Math.exp(dist/30) * trade_amount) / ((2 * Math.exp(dist/30)) - 1));

	this.send(RESOURCE_ENERGY, optimal_amount-1, highest.roomName, 'Thanks!');
};

StructureTerminal.prototype.buy = function(){
	if (this.memory.buy_timer == undefined) {
		this.memory.buy_timer = this.TIMER_LENGTH;
	}

	let energy = this.store[RESOURCE_ENERGY];

	if (this.memory.buy_timer >= this.TIMER_LENGTH && energy > 1000 && this.cooldown == 0) {
		this.memory.buy_timer = 0;
	}else{
		this.memory.buy_timer++;
		return;
	}

	let orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: SUBSCRIPTION_TOKEN});

	if (orders.length == 0) {
		return;
	}

	let lowest = orders[0];

	orders.forEach(function(order){
		if (order.price < lowest.price) {
			lowest = order;
		}
	});

	if (Game.market.credits >= lowest.price) {
		Game.market.deal(lowest.id, 1);
	}
};