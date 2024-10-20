import { statement } from "./statement.js";

const plays = await fetch("./plays.json").then((res) => res.json());
const invoices = await fetch("./invoices.json").then((res) => res.json());

invoices.map((invoice) => document.write(statement(invoice, plays)));
