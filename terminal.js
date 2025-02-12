StructureTerminal.prototype.TIMER_LENGTH = 10;
StructureTerminal.prototype.run = function(){
	if (this.memory.timer == undefined) {
		this.memory.timer = this.TIMER_LENGTH;
	}

	let energy = this.store[RESOURCE_ENERGY];

	if (this.memory.timer >= this.TIMER_LENGTH && energy > 1000 && this.cooldown == 0) {
		this.memory.timer = 0;
	}else{
		this.memory.timer++;
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