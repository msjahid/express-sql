const express = require('express');
const router = express.Router();
const connection = require('../models/student');


router.get('/student', (req, res) => {
  connection.query("SELECT * FROM info", (err, rows, fields) => {
    if(!err){
      res.send(rows);
    } else{
      return res.status(500).json(err);
    }
  });
});

router.post('/student', (req, res, next) => {
  let student = req.body;
  const query = "INSERT INTO `info` (id, name, cgpa, course) VALUES (?, ?, ?, ?)";
  connection.query(query, [student.id, student.name, student.cgpa, student.course], (err, results) => {
    if(!err){
      // return res.status(200).json({message: 'New student added successfully'});
      return res.send(req.body);
    } else{
      return res.status(500).json(err);
    }
  });
});

router.put('/student/:id', (req, res, next) => {
  // let student = req.body;
  // const rID = req.params.id;
  // let query = "UPDATE info SET id=?, name=?, cgpa=?, course=? WHERE id=?";
  const query = 'UPDATE `info` SET ? WHERE ?';
  // connection.query(query, [student.id, student.name, student.cgpa, student.course, rID], (err, results) => {
  connection.query(query, [req.body, req.params], (err, results) => {
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message: "Student id does not found"});
      }
      return res.status(200).json({message: "Student Information updated successfully"});
    } else{
      return res.status(500).json(err);
    }
  });
});

router.delete('/student/:id', (req, res, next) => {
  const query = 'DELETE FROM `info` WHERE id=?';
  connection.query(query, [req.params.id], (err, results) => {
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message: "Student id does not found"});
      }
      return res.status(200).json({message: "Student Information deleted successfully"});
    } else{
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
