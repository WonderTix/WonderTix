"use strict";
/**
 * Server
 * Responsable for routing correct server
 * execution on changes of url on front end
 *
 * @param app - instanciates express instnace
 * that is performs URI responce to client requests
 *
 *
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var path_1 = require("path");
var https_1 = require("https");
var fs_1 = require("fs");
require("reflect-metadata");
var accounts_router_1 = require("./api/accounts/accounts.router");
var contacts_router_1 = require("./api/contacts/contacts.router");
var donations_router_1 = require("./api/donations/donations.router");
var doorlist_router_1 = require("./api/doorlist/doorlist.router");
var event_router_1 = require("./api/events/event.router");
var newsletter_router_1 = require("./api/newsletter/newsletter.router");
var order_router_1 = require("./api/orders/order.router");
var saved_reports_router_1 = require("./api/saved_reports/saved_reports.router");
var subscription_router_1 = require("./api/subscriptions/subscription.router");
var tasks_router_1 = require("./api/tasks/tasks.router");
var task_notes_router_1 = require("./api/task_notes/task_notes.router");
var ticket_router_1 = require("./api/tickets/ticket.router");
var discounts_router_1 = require("./api/discounts/discounts.router");
var reporting_router_1 = require("./api/reporting/reporting.router");
var refunds_router_1 = require("./api/refunds/refunds.router");
var swagger_ui_express_1 = require("swagger-ui-express");
var yamljs_1 = require("yamljs");
var json_refs_1 = require("json-refs");
/**
 * Return JSON object. Source: https://github.com/chuve/swagger-multi-file-spec
 * @param {array | object} root
 * @return {Promise.<JSON>}
 */
var multiFileSwagger = function (root) {
    var options = {
        filter: ['relative', 'remote'],
        loaderOptions: {
            processContent: function (res, callback) {
                callback(null, yamljs_1["default"].parse(res.text));
            }
        }
    };
    return (0, json_refs_1.resolveRefs)(root, options).then(function (results) {
        console.log(results);
        return results.resolved;
    }, function (err) {
        console.log(err.stack);
    });
};
var createServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, swaggerDocument;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dotenv_1["default"].config({ path: path_1["default"].join(__dirname, '../../.env') });
                app = (0, express_1["default"])();
                // const stripeKey = process.env.PRIVATE_STRIPE_KEY ?
                //   process.env.PRIVATE_STRIPE_KEY : '';
                // const stripe = new Stripe(stripeKey, {
                //   apiVersion: '2020-08-27',
                // });
                /* Middleware */
                app.use(express_1["default"].json());
                app.use(express_1["default"].urlencoded({ extended: true }));
                app.use((0, morgan_1["default"])('dev'));
                app.use((0, helmet_1["default"])());
                app.use((0, cors_1["default"])({
                    origin: process.env.FRONTEND_URL,
                    credentials: true
                }));
                /* Connect Routers */
                app.use('/api/donations', donations_router_1.donationsRouter);
                app.use('/api/contacts', contacts_router_1.contactsRouter);
                app.use('/api/accounts', accounts_router_1.accountsRouter);
                app.use('/api/tasks', tasks_router_1.tasksRouter);
                app.use('/api/task_notes', task_notes_router_1.taskNotesRouter);
                app.use('/api/saved_reports', saved_reports_router_1.savedReportsRouter);
                app.use('/api/newsletter/', newsletter_router_1.newsletterRouter);
                app.use('/api/events', event_router_1.eventRouter);
                app.use('/api/email_subscriptions', subscription_router_1.subscriptionRouter);
                app.use('/api/tickets', ticket_router_1.ticketRouter);
                app.use('/api/doorlist', doorlist_router_1.doorlistRouter);
                app.use('/api/discounts', discounts_router_1.discountsRouter);
                app.use('/api/refunds', refunds_router_1.refundsRouter);
                app.use('/api/reporting', reporting_router_1.reportingRouter);
                app.use('/api/order', order_router_1.orderRouter);
                app.get('/', function (_req, res) { return res.send('Hello World.'); });
                return [4 /*yield*/, multiFileSwagger(yamljs_1["default"].load(path_1["default"].resolve(__dirname, './schema/test.yaml')))];
            case 1:
                swaggerDocument = _a.sent();
                console.log(swaggerDocument);
                app.use('/api/docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerDocument));
                return [2 /*return*/, https_1["default"]
                        .createServer({
                        key: fs_1["default"].readFileSync(path_1["default"].join(__dirname, '../localhost-key.pem')),
                        cert: fs_1["default"].readFileSync(path_1["default"].join(__dirname, '../localhost.pem'))
                    }, app)];
        }
    });
}); };
createServer().then(function (server) {
    var port = 8000;
    server.listen(port);
    console.log("Listening on port ".concat(port));
})["catch"](function (err) {
    console.log(err.stack);
});
