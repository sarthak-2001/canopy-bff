//----------------------------------------------
//IN client side make route methods to "POST"
//----------------------------------------------

const express = require("express")
const axios = require("axios")

const app = express()
const port = 3002

app.use(express.json())

app.post("/fee", async (req, res) => {
	let response = await axios.post("http://127.0.0.1:3000/fe", {
		uid: req.body.uid,
		pwd: req.body.pwd
	})

	// console.log(response.data.data);
	html = response.data.data
	let data = {
		Notices: []
	}
	data.Notices.push({ html: html })
	res.send(data)
})

app.post("/notice", async (req, res) => {
	let response = await axios.post("http://127.0.0.1:3000/notice", {
		uid: req.body.uid,
		pwd: req.body.pwd
	})
	console.log(response.data.length)

	let data = response.data
	let data_main = {
		Notices: []
	}

	for (let index = 1; index < data.length; index++) {
		data_main.Notices.push(response.data[index])
	}
	res.send(data_main)
})

app.post("/notice_data",async (req,res)=>{
    let response = await axios.post("http://127.0.0.1:3000/notice_data",{
        uid: req.body.uid,
        pwd: req.body.pwd,
        id:req.body.id
    })
    // console.log(response.data);
    let link = response.data.link
    let html = response.data.notice_data
    let data = {
		Notices: []
	}
	data.Notices.push({ link: link,notice_data:html })
	res.send(data)

    
})

app.listen(port, () => {
	console.log("listening on 3002")
})
