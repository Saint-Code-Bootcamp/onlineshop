'use strict'
const BaseController = require("./Base");
const Order = require("../models/Order");


module.exports = BaseController.extend({ 
	notification_secret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
	name: "Yandex",
	content: null,
	confirm: async function(req, res, next) {
		const id = req.body.label;
		const test = 
			`${req.body.notification_type}&${req.body.operation_id}&${req.body.amount}&${req.body.currency}` + 
			`&${req.body.datetime}&${req.body.sender}&${req.body.codepro}&${this.notification_secret}&${req.body.label}`;
		const crypto = require('crypto');
		const shasum = crypto.createHash('sha1');
		shasum.update(test);
		//проверка подленности запроса
		if (shasum.digest('hex') !== req.body.sha1_hash){
			return res.sendStatus(400);
		}
		const order = await Order.get(id);
		if (parseInt(order.sum) == parseInt(req.body.amount)){
			//на всякий случай проверили что сумма платежа равна сумме заказа
			Order.update({
				_id: id,
				status: 2
			});
		} else {
			return res.sendStatus(300);
		}
		 
        return res.sendStatus(200);
	},
});