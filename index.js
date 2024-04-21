#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            message: "what do you want to select?",
            type: "list",
            choices: ["Add", "update", "view", "delete", "Exit"],
        }
    ]);
    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "add item in the list",
            validate: function (input) {
                if (input.trim() == "") {
                    return "please enter a non-empty item.";
                }
                return true;
            }
        });
        if (addTodo.todo.trim !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    if (ans.select === "update") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Update item in the list",
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add item in the list",
        });
        let newtodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newtodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "view") {
        console.log("******To-Do List******");
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "delete") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "select item to delete",
            choices: todos.map(item => item)
        });
        let newtodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newtodo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Exit") {
        console.log("Exiting Programme...");
        condition = false;
    }
}
