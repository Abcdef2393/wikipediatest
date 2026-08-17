const express = require("express");
const app = express();

// extra
// app.use(express.placeholder());

// replace the path with anything, remove the path, because it can affect the link, make sure it is like: ("", (req, res) // => {, to remove the path

async function searchWikipedia(query) {
    const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    const data = await response.json();

    let res = data.extract;

    if (res === undefined) {
    res = 404;
    }

    return res;
}

/*
searchWikipedia("India").then(result => {
    console.log(result);
});
*/

app.get("", async (req, res) => {

    // use this as the input (what is being sent)

    const input = req.query.input;
    const result = await searchWikipedia(input);
    res.send(result);
});




app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});
