'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");
const User = require("../models/User");


module.exports = BaseController.extend({ 
	name: "Account",
	content: null,
	index: async function(req, res, next) {
        const v = new View(res, 'account.html');
        if (!req.is_auth) {
            return res.redirect('/account/login');
        }
        const user = await User.get(req.session.user._id);
        v.render({
            req: req,
            user: user
        });
    },
    
    run_login: async function(req, user){
		//сохраним данные пользователья в сессии
		req.session.user = {
			_id: user._id,
			name: user.name,
			email: user.email,
			is_admin: user.is_admin,
			session_id: req.session.id
		};
		req.session.save();
		await User.update(req.session.user);        
    },    

    login: async function(req, res, next) {
        const v = new View(res, 'account_login.html');
        v.render({
            req: req
        });
    },

    register: async function(req, res, next) {
        const v = new View(res, 'account_register.html');
        v.render({
            req: req
        });
    },
   
	logout: function(req, res, next) {
		//выход
		this.do_logout(req);
		res.redirect('/')
	},

    do_register: async function(req, res, next) {
        //выход
        if ( !req.body ) return response.sendStatus(400); //если нету данные в POST
		const postData = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};
		let user = await User.getByEmail(req.body.email);
        if ( user ) {
            const v = new View(res, 'account_register.html');
            v.render({
                req: req,
                post: req.body,
                err: 1
            });
            return;    
        } 

        user = await User.create(postData);
        this.run_login(req, user);
        //если чтото есть в корзине обновим её
        const basket = require("./Basket");
        basket.run_update(req.session.id, String(user._id));
        //--

        
        if (req.query.ret && req.query.ret != '') return res.redirect(req.query.ret); //если установлена переменная возврата
        
        res.redirect('/account');
	},

    do_login: async function(req, res) {
		//произвести авторизацию
		if ( !req.body ) return response.sendStatus(400); //если нету данные в POST
		
		const postData = {
			email: req.body.email,
			password: req.body.password
		};

		const user = await User.check(postData);
        if ( !user ) { //нет совпадения емайл+пароль
            const v = new View(res, 'account_login.html');
            v.render({
                req: req,
                post: req.body,
                err: 1
            });
            return;    
        }

		//сохраним данные пользователья в сессии
		req.session.user = {
			_id: user._id,
			name: user.name,
			email: user.email,
			is_admin: user.is_admin,
			session_id: req.session.id
		};
		req.session.save();
        await User.update(req.session.user);

        //если чтото есть в корзине обновим её
        const basket = require("./Basket");
        basket.run_update(req.session.id, String(user._id));
        //--
        return res.redirect('/account');
    }

});