const express = require ('express');
const app = express();
const logger = require('morgan');
var cors = require('cors')
const fs = require('fs');
var jsonMerger = require("json-merger");
const updateJsonFile = require('update-json-file')
 
const filePath = "./shark_json/";
const resultData = "./generated/";
const promises = []


const testing_DataModel = require("./model/tokens");


// Merge json files into one
function mergeJSON(){

const timeOut = (t) => {
    return new Promise( async (resolve, reject) => {
      const id = t     
      let rawdata = fs.readFileSync(filePath + "#" + id + '.json');
      let student = JSON.parse(rawdata);
      //   console.log(student);
      resolve(student);
    })
}
for (let i = 0; i <= 11383; i++) {
    promises.push(timeOut(i)) 
}
Promise.all(promises)
.then(response => {
    console.log(response);
    const data = JSON.stringify(response)
    fs.writeFileSync(`./generated/metadata.json`, data);
})
.catch(err => console.log(err))

}


/*  ---------------------------------------------  */
/*                      Mongo DB                   */
/*  ---------------------------------------------  */
const DATABASE_URL="mongodb+srv://read_only:LZEcUw97CKaptPu2@cluster0.9clqq.mongodb.net/BearX?authSource=admin&replicaSet=atlas-4orje4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true"
const mongoose = require ('mongoose');
mongoose.connect(DATABASE_URL)
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => {
console.log('Connected Mongo')
})



/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */
app.use(logger('dev'));
app.use(cors())



/*  ---------------------------------------------  */
/*                      get data from mongo 1 by 1                      */
/*  ---------------------------------------------  */  
app.get("/:id.png", async (req, res) => {
    id =  parseInt(req.params.id)
    console.log(id);
    const token = await testing_DataModel.findOne({ Sno: id })
    .then((data) => {
        return res.json( data );
    }).catch( (err) => {
        return res.end()
    })
})


/*  ---------------------------------------------  */
/*                  READ SINGLE JSON ONLY                 */
/*  ---------------------------------------------  */  
app.get("/read-single-json", (req, res) => {
    
    let filename = "2"
    let rawdata = fs.readFileSync(filePath + filename + '.json');
    let data = JSON.parse(rawdata);
    return res.json(data)

})



// /*  ---------------------------------------------  */
// /*                  READ ALL JSON OF DIRECTORY                 */
// /*  ---------------------------------------------  */  
// app.get("/read-single-json", (req, res) => {
    
//     let filename = "2"
//     let rawdata = fs.readFileSync(filePath + filename + '.json');
//     let data = JSON.parse(rawdata);
//     return res.json(data)

//     // console.log(student);
//     for (let i = 1; i <= 1; i++) {
//         let rawdata = fs.readFileSync(filePath + i + '.json');
//         let student = JSON.parse(rawdata);
//         console.log(student);   
//     }

// })



/*  ---------------------------------------------  */
/*                  READ AND UPDATE JSON DATA                 */
/*  ---------------------------------------------  */  
app.get("/read-update-json", (req, res) => {
    
    // let rawdata = fs.readFileSync('./assets/' + i + '.json');
    // let student = JSON.parse(rawdata);
    // console.log(student);   

    const timeOut = (t) => {
        return new Promise( async (resolve, reject) => {
        const id = t
        
        let rawdata = fs.readFileSync('./assets/' + id + '.json');
        let student = JSON.parse(rawdata);
        //   console.log(student);

        resolve(student);
        })
    }

    for (let i = 1; i <= 5300; i++) {
        promises.push(timeOut(i)) 
    }

    Promise.all(promises)
    .then(response => {
        console.log(response);
        const data = JSON.stringify(response)
        fs.writeFileSync(`./assets/metadata.json`, data);
    })
    .catch(err => console.log(err))


})



/*  ---------------------------------------------  */
/*                  GENERATE INDIVISUAL JSON FILES                 */
/*  ---------------------------------------------  */  
app.get("/generate", (req, res) => {
    for (let i = 1; i <= 5300; i++) {
        const id = 10000000000000;
        const temp = {
            "Sno": id + i,
            "name": `MiniBearX # ${i}`,
            "image": "https://simpz.mypinata.cloud/ipfs/QmWedgJsc3kdWNk2ztTHmCakNynb5difrZ6QXNv87U5MjL",
            "edition": i,
        }
        var data = JSON.stringify(temp);
        fs.writeFileSync(`${filePath}${i}.json`, data);
    }
    
    file.forEach((element, i) => {
        var data = JSON.stringify(element);
        console.log(data);
        // fs.writeFileSync(`./assets/generate/${element.edition}.json`, data);
    });
})




/*  ---------------------------------------------  */
/*                  get from mongo and combine them                 */
/*  ---------------------------------------------  */  
app.get("/getall", async (req, res) => {
    start  =  req.query.start
    end    =  req.query.end

    const token = await testing_DataModel.find({ Sno: {$gte: 10000000000001, $lte: 10000000000005} })
    // const token = await testing_DataModel.find({ Sno: {$lte: 10000000000001} })
    // const token = await testing_DataModel.find({ Sno: {$gte: 10000000000001} })
    // const token = await testing_DataModel.find({})
    .then((data) => {
        return res.json( data );
    }).catch( (err) => {
        return res.end()
    })
})

/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */  
const port1 = 5500
app.listen(process.env.PORT || port1, async () => {
console.log('Prot is running at : ' + process.env.PORT || port1);
});