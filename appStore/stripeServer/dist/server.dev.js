"use strict";

var express = require('express');

var cors = require('cors');

var bodyparser = require('body-parser');

var app = express();
app.use(express["static"]('public'));
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(bodyparser.json());
app.use(cors({
  origin: true,
  credentials: true
}));

var stripe = require('stripe')('sk_test_51P3EwSSFU85WlZUL7ndfSB9GT4h7PtOebz7RucYJlHR4G6Ive5dTsjR91whmSp8kh2CU2Q85kjnB3aJv8GADVBy700KXtyOsLy');

app.post('/checkout', function _callee(req, res, next) {
  var session;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
              allowed_countries: ['US', 'CA']
            },
            shipping_options: [{
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'usd'
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7
                  }
                }
              }
            }, {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd'
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1
                  }
                }
              }
            }],
            line_items: req.body.items.map(function (item) {
              return {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: item.name,
                    images: [item.product]
                  },
                  unit_amount: item.price * 100
                },
                quantity: item.quantity
              };
            }),
            mode: 'payment',
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html'
          }));

        case 3:
          session = _context.sent;
          res.status(200).json(session);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.listen(4242, function () {
  return console.log('app is running on 4242');
});