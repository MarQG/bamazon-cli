# Bamazon CLI

## Overview

Bamazon-CLI is a node command line interface that interacts with the Bamazon SQL Database. It allows the users to view and purchase items from the inventory. It allows Managers to edit and manage the products in the Bamazon database. Lastly it allows Supervisors to view departments  and sales data for reports.

## Views


Bamazon - CLI has a main menu that will take you to the three views based on the current user "Customer", "Manager", and "Supervisor". Each view is unique to each type of user and some are locked out from normal use view passwords.

![Main Menu](./screens/app-main.png?raw=true "Main Menu")

* Customer - In the Customer View you can Order items from the Bamazon Store.

* Manager - In the Manager View you can View the Current Inventory, Check Low Inventory Stock, Add Inventory Stock, or Add New Inventory.

* Supervisor - In the Supervisor View you can View Product Sales Reports and Department Information, or Add New Departments for Inventory Use.

* Exit - Allows you to exit the application.

## Customer

The Customer View is where customers order from Bamazon. It will ask which item they wish to purchase and how many they would like to buy. After that it will check the current inventory to see if the item is in stock and place the order for the user if it is.

![Customer View](./screens/cus-order.png?raw=true "Customer View")

![Customer Exit](./screens/cus-order-exit.png?raw=true "Customer Exit")

* Customer View - Lets the user scroll through available products to select one to purchase or e) to return to the main menu;

* Customer Order - Once user selects an item they will be prompted how many they would like to purchase and the app will check the current stock. If there is stock available their order will go through.

## Manager

The Manager Panel is where Managers can login via a password and manage the inventory. They have the ability to select the options to View All Inventory, View Low Inventory, Add Inventory, and Add New Product.

![Manager Panel](./screens/man-panel-login.png?raw=true "Manager Panel")

![Manager Low](./screens/man-panel-view-low.png?raw=true "Manager Low")

![Manager Add](./screens/man-panel-add-inv.png?raw=true "Mananger Add")

![Manager New](./screens/man-panel-add-new.png?raw=true "Manager New")

* Manager View Inventory - This allows the Manager to view a table of the current inventory.

* Manager View Low Inventory - This allows the Manager to view a table of all inventory items with low stock quantities.

* Manager Add Inventory - This allows the Manager to order move inventory for a particular item based on the item ID#.

* Manager Add New Inventory - This allows the Manager to add an entirely new product to the inventory.

## Supervisor

The Supervisor Panel is where Supervisors can login via a password and get detailed business reports about current Product Sales or add a new product department. They have the ability to select the options to View Product Sales by Department, and Add New Department.

![Supervisor Product](./screens/sup-panel-report.png?raw=true "Supervisor Product")

![Supervisor Dept](./screens/sup-panel-add-dept.png?raw=true "Supervisor Dept")

* Supervisor View Product Sales by Department - This allows the Supervisor to view a table of the current departments and their total profits based on their sales and over head.
* Supervisor Add New Department - This allows the Supervisor to add an entirely new department to be used in the inventory.


Copyright 2017 © Ferenc Gutierrez
