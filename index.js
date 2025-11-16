import express from "express";

const app = express();

app.set("view engine", "ejs");      //This line is used to enable Express to automatically handle the rendering of 
//EJS template files when I use res.render().

const port = process.env.port || 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let taskList = [];

app.listen(port, (req, res) => {
    console.log("Server started successfully.");
});

app.get("/", (req, res) => {
    res.render("list", { tasks: taskList });
});

app.post("/", (req, res) => {
    taskList.push(req.body.task);
    res.redirect("/");
});

app.post('/update-todo', (req, res) => {
    if(req.body.editTask && req.body.editIndex){
        taskList.splice(req.body.editIndex, 1, req.body.editTask);
    }
    res.redirect("/");
});

app.post('/delete-todo', (req, res) => {
    let delTask = req.body.deletedTask;
    const index = taskList.indexOf(delTask);
    if (index > -1) {
        taskList.splice(index, 1);
        res.status(200).json({
            message: "Task deleted successfully.",
            success: true
        });
    } else {
        res.status(404).json({ message: "Task not found" })
    }
});