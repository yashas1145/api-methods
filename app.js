import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const token = "43491b81-e8ce-4300-b712-93c83486c2cd";
const apiurl = "https://secrets-api.appbrewery.com";

const axiosHeader = {
    headers: {
        authorization: `Bearer ${token}`
    }
}

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/get-secret", async (req, res) => {
    let secretId = req.body.id;

    try {
        const response = await axios.get(`${apiurl}/secrets/${secretId}`, axiosHeader);
        res.render("index.ejs", {"data": JSON.stringify(response.data.secret)});
    } catch (err) {
        console.log(err);
        res.render("index.ejs", {"data": err.response.data.error});
    }
});

app.post("/post-secret", async (req, res) => {
    let secretScore = req.body.emscore;
    let secretDesc = req.body.secret;

    const secretBody = {
        "score": secretScore,
        "secret": secretDesc
    }

    try {
        const response = await axios.post(`${apiurl}/secrets`, secretBody, axiosHeader);
        res.render("index.ejs", {"data": JSON.stringify(response.data)});
    } catch (err) {
        res.render("index.ejs", {"data": err.response.data.error});
    }
});

app.post("/put-secret", async (req, res) => {
    let secretScore = req.body.emscore;
    let secretDesc = req.body.secret;
    let secretId = req.body.id;

    const secretBody = {
        "score": secretScore,
        "secret": secretDesc
    }

    try {
        const response = await axios.put(`${apiurl}/secrets/${secretId}`, secretBody, axiosHeader);
        res.render("index.ejs", {"data": JSON.stringify(response.data)});
    } catch (err) {
        res.render("index.ejs", {"data": err.response.data.error});
    }
});

app.post("/patch-secret", async (req, res) => {
    let secretScore = req.body.emscore;
    let secretDesc = req.body.secret;
    let secretId = req.body.id;

    const secretBody = {
        "score": secretScore,
        "secret": secretDesc
    }

    try {
        const response = await axios.patch(`${apiurl}/secrets/${secretId}`, secretBody, axiosHeader);
        res.render("index.ejs", {"data": JSON.stringify(response.data)});
    } catch (err) {
        res.render("index.ejs", {"data": err.response.data.error});
    }
});

app.post("/delete-secret", async (req, res) => {
    let secretId = req.body.id;

    try {
        const response = await axios.delete(`${apiurl}/secrets/${secretId}`, axiosHeader);
        res.render("index.ejs", {"data": JSON.stringify(response.data.message)});
    } catch (err) {
        console.log(err);
        res.render("index.ejs", {"data": err.response.data.error});
    }
});

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server listening on port ${port}`);
})