var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/save", (req, res) => {
  items = req.body.items;
  var userId = req.body.userId;
  pool.query(
    "DELETE FROM AVAILABILITY WHERE sle_id=$1",
    [userId],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  for (var i = 0; i < items.length; i += 1) {
    pool.query(
      `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${userId}, ${
      items[i][0]
      }, ${items[i][1]})`,
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  }
  return res.json({ schedule: items });
});

router.post("/staticcalendar", function (req, res) {
  let shifts = req.body.items;
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    console.log("router.post staticcalendar");
    for (var i = 0; i < 168; i += 1) {
      for (var j = 0; j < result.rows.length; j += 1) {
        let currentRow = result.rows[j];
        let sameStartEndValid =
          shifts[i].day == currentRow.start_time.getDay() &&
          shifts[i].start >= currentRow.start_time.getHours() &&
          shifts[i].end <= currentRow.end_time.getHours();
        let diffStartEndValid =
          currentRow.start_time.getDay() != currentRow.end_time.getDay() &&
          ((shifts[i].day == currentRow.start_time.getDay() &&
            shifts[i].start >= currentRow.start_time.getHours()) ||
            (shifts[i].day == currentRow.end_time.getDay() &&
              shifts[i].end <= currentRow.end_time.getHours()));
        if (sameStartEndValid || diffStartEndValid) {
          shifts[i].id = currentRow.shift_id;
          if (currentRow.location == "Moffitt") {
            shifts[i].color = "#FFA1A1";
          } else if (currentRow.location == "Doe") {
            shifts[i].color = "#b0e9c2";
          }
        }
      }
    }
    return res.json({ shifts: shifts });
  });
});

router.post("/save", (req, res) => {
  items = req.body.items;
  return res.json({ schedule: items });
});

router.get("/shifts", function (req, res) {
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

router.post("/shifts/:userId", (req, res) => {
  console.log("userId: " + userId);
  var selected = [];
  console.log(selected);
  var curr_day = new Date();
  var curr_week_sunday = curr_day.getDate() - curr_day.getDay();
  pool.query(
    `SELECT start_time AS start, end_time AS end FROM SHIFTS 
     WHERE sle_id = $1`,
    [req.params.userId],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        for (var r = 0; r < result.rows.length; r++) {
          var diff = result.rows[r].end.getHours() - result.rows[r].start.getHours();
          console.log()
          console.log("diff: " + diff);
          //for (var c = 0; c < end_time; c++)
          var row = result.rows[r];
          var t = result.rows[r].t;
          var d = result.rows[r].d;
          selected.push(
            new Date(
              curr_day.getFullYear(),
              curr_day.getMonth(),
              d + curr_week_sunday,
              t,
              0,
              0,
              0
            )
          );
        }
      }
      return res.json({ schedule: selected });
    }
  );
});

router.get("/availability/:userId", (req, res) => {
  var selected = [];
  var curr_day = new Date();
  var curr_week_sunday = curr_day.getDate() - curr_day.getDay();
  pool.query(
    `SELECT start_time AS t, day_of_week AS d FROM AVAILABILITY 
     WHERE sle_id = $1`,
    [req.params.userId],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        for (var r = 0; r < result.rows.length; r++) {
          var row = result.rows[r];
          var t = result.rows[r].t;
          var d = result.rows[r].d;
          selected.push(
            new Date(
              curr_day.getFullYear(),
              curr_day.getMonth(),
              d + curr_week_sunday,
              t,
              0,
              0,
              0
            )
          );
        }
      }
      return res.json({ schedule: selected });
    }
  );
});



module.exports = router;
